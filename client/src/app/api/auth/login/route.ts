import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import db from "@/lib/db";
import { type LoginInput, type AuthResponse } from "@/types/user";
import { generateJwtToken, generateRefreshToken } from "@/lib/auth";
import { rateLimiter } from "@/lib/rate-limiter";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Apply rate limiting - 5 attempts per minute
    const rateLimit = rateLimiter(req, {
      limit: 5,
      windowMs: 60 * 1000, // 1 minute
      message: "Too many login attempts. Please try again in a minute.",
    });

    if (rateLimit) {
      return rateLimit;
    }

    // Parse request body
    const body = (await req.json()) as LoginInput;

    // Validate request body
    const errors: Record<string, string> = {};
    if (!body.email) errors.email = "Email is required";
    if (!body.password) errors.password = "Password is required";

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Find user by email
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      body.email,
    ]);

    // Check if user exists
    if (!userResult.rowCount || userResult.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    // Verify password
    const isPasswordValid = await argon2.verify(
      user.password_hash,
      body.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateJwtToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Create response with token in HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
        },
      } as AuthResponse,
      { status: 200 }
    );

    // Set the cookie with appropriate options
    const cookieMaxAge = Number(process.env.COOKIE_MAX_AGE) || 7 * 24 * 60 * 60; // 7 days in seconds

    // If rememberMe is true, use the full expiration time, otherwise use a session cookie (expires when browser closes)
    const maxAge = body.rememberMe ? cookieMaxAge : undefined;

    // Set the access token cookie
    response.cookies.set(process.env.COOKIE_NAME || "auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge,
      path: "/",
    });

    // If rememberMe is true, also set a refresh token
    if (body.rememberMe) {
      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      response.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/api/auth/refresh", // Only sent to refresh endpoint
      });
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 }
    );
  }
}
