import { Recipe, RecipeSearchParams } from "@/types/recipe"
import { UserResponse, LoginInput, UserCreateInput } from "@/types/user"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string>
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string>
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  })

  const data: ApiResponse<T> = await response.json()

  if (!response.ok || !data.success) {
    throw new ApiError(
      response.status,
      data.message || "Er is iets misgegaan",
      data.errors
    )
  }

  return data.data as T
}

// Auth API
export const authAPI = {
  async login(credentials: LoginInput): Promise<{ user: UserResponse }> {
    return fetchAPI("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  async signup(userData: UserCreateInput): Promise<{ user: UserResponse }> {
    return fetchAPI("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  async logout(): Promise<void> {
    return fetchAPI("/api/auth/logout", {
      method: "POST",
    })
  },

  async me(): Promise<{ user: UserResponse }> {
    return fetchAPI("/api/auth/me")
  },

  async refresh(): Promise<{ user: UserResponse }> {
    return fetchAPI("/api/auth/refresh", {
      method: "POST",
    })
  },
}

// Recipe API
export const recipeAPI = {
  async search(params: RecipeSearchParams): Promise<{
    recipes: Recipe[]
    total: number
    page: number
    limit: number
  }> {
    const searchParams = new URLSearchParams()
    if (params.ingredients) searchParams.set("ingredients", params.ingredients)
    if (params.meal_type) searchParams.set("meal_type", params.meal_type)
    if (params.page) searchParams.set("page", params.page.toString())
    if (params.limit) searchParams.set("limit", params.limit.toString())

    return fetchAPI(`/api/recipes/search?${searchParams.toString()}`)
  },

  async getById(id: string): Promise<Recipe> {
    return fetchAPI(`/api/recipes/${id}`)
  },

  async create(recipe: Partial<Recipe>): Promise<Recipe> {
    return fetchAPI("/api/recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
    })
  },

  async update(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    return fetchAPI(`/api/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(recipe),
    })
  },

  async delete(id: string): Promise<void> {
    return fetchAPI(`/api/recipes/${id}`, {
      method: "DELETE",
    })
  },
}

// User/Admin API
export const userAPI = {
  async getAllUsers(): Promise<UserResponse[]> {
    return fetchAPI("/api/admin/users")
  },

  async updateUser(id: number, data: Partial<UserResponse>): Promise<UserResponse> {
    return fetchAPI(`/api/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  async deleteUser(id: number): Promise<void> {
    return fetchAPI(`/api/admin/users/${id}`, {
      method: "DELETE",
    })
  },
}

export { ApiError }
