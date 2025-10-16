import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

/**
 * GET handler for /api/recipes/[id] endpoint
 * Get a single recipe by ID with owner information
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;

    // Query the recipe with owner info
    const query = `
      SELECT r.*, 
        array_agg(DISTINCT ri.ingredient) FILTER (WHERE ri.ingredient IS NOT NULL) as ingredients,
        u.raw_user_meta_data->>'name' as owner_name,
        u.raw_user_meta_data->>'avatar_url' as owner_avatar
      FROM recipes r
      LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      LEFT JOIN auth.users u ON r.owner_id = u.id
      WHERE r.id = $1
      GROUP BY r.id, u.raw_user_meta_data
    `;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found",
        },
        { status: 404 }
      );
    }

    const row = result.rows[0];
    const recipe = {
      id: row.id,
      owner_id: row.owner_id,
      name: row.name,
      description: row.description,
      ingredients: row.ingredients || [],
      meal_type: row.meal_type,
      preparation_time: row.preparation_time,
      cooking_time: row.cooking_time,
      servings: row.servings,
      instructions: row.instructions,
      image_url: row.image_url,
      created_at: row.created_at,
      updated_at: row.updated_at,
      owner_name: row.owner_name,
      owner_avatar: row.owner_avatar,
    };

    return NextResponse.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error("Recipe fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the recipe",
      },
      { status: 500 }
    );
  }
}
