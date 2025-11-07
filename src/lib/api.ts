import { Recipe, RecipeSearchParams,} from "@/types/recipe";
import { supabase } from "./supabase";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Recipe API met Supabase
export const recipeAPI = {
  async search(params: RecipeSearchParams): Promise<{
    recipes: Recipe[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase!
      .from("recipes")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    // Filter op ingrediënten
    if (params.ingredients) {
      query = query.contains("ingredients", [params.ingredients]);
    }

    // Filter op meal type
    if (params.meal_type) {
      query = query.eq("meal_type", params.meal_type);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new ApiError(500, error.message);
    }

    // Owner info should already be in the recipes table
    const recipes = (data || []).map((item: any) => ({
      ...item,
    }));

    return {
      recipes,
      total: count || 0,
      page,
      limit,
    };
  },

  async getById(id: string): Promise<Recipe> {
    const response = await fetch(`/api/recipes/${id}`);
    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new ApiError(
        response.status,
        json.message || "Recept niet gevonden"
      );
    }

    return json.data as Recipe;
  },

  async create(recipe: Partial<Recipe>): Promise<Recipe> {
    const {
      data: { user },
    } = await supabase!.auth.getUser();

    if (!user) {
      throw new ApiError(401, "Je moet ingelogd zijn");
    }

    const { data, error } = await supabase!
      .from("recipes")
      .insert({
        ...recipe,
        owner_id: user.id,
        owner_name: user.user_metadata?.name,
        owner_avatar: user.user_metadata?.avatar_url,
      })
      .select()
      .single();

    if (error) {
      throw new ApiError(500, error.message);
    }

    return data as Recipe;
  },

  async update(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    const { data, error } = await supabase!
      .from("recipes")
      .update(recipe)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new ApiError(500, error.message);
    }

    return data as Recipe;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase!.from("recipes").delete().eq("id", id);

    if (error) {
      throw new ApiError(500, error.message);
    }
  },

  async toggleLike(recipeId: string): Promise<{ isLiked: boolean }> {
    const {
      data: { user },
    } = await supabase!.auth.getUser();

    if (!user) {
      throw new ApiError(401, "Je moet ingelogd zijn");
    }

    // Check if already liked
    const { data: existing } = await supabase!
      .from("users_liked_recipes")
      .select("*")
      .eq("user_id", user.id)
      .eq("recipe_id", recipeId)
      .single();

    if (existing) {
      // Unlike
      const { error } = await supabase!
        .from("users_liked_recipes")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_id", recipeId);

      if (error) {
        throw new ApiError(500, error.message);
      }

      return { isLiked: false };
    } else {
      // Like
      const { error } = await supabase!
        .from("users_liked_recipes")
        .insert({
          user_id: user.id,
          recipe_id: recipeId,
        });

      if (error) {
        throw new ApiError(500, error.message);
      }

      return { isLiked: true };
    }
  },

  async getLikedRecipes(): Promise<Recipe[]> {
    const {
      data: { user },
    } = await supabase!.auth.getUser();

    if (!user) {
      throw new ApiError(401, "Je moet ingelogd zijn");
    }

    const { data, error } = await supabase!
      .from("users_liked_recipes")
      .select("recipe_id")
      .eq("user_id", user.id);

    if (error) {
      throw new ApiError(500, error.message);
    }

    if (!data || data.length === 0) {
      return [];
    }

    const recipeIds = data.map((item) => item.recipe_id);

    const { data: recipes, error: recipesError } = await supabase!
      .from("recipes")
      .select("*")
      .in("id", recipeIds);

    if (recipesError) {
      throw new ApiError(500, recipesError.message);
    }

    return recipes as Recipe[];
  },

  async checkIfLiked(recipeIds: string[]): Promise<Set<string>> {
    const {
      data: { user },
    } = await supabase!.auth.getUser();

    if (!user || recipeIds.length === 0) {
      return new Set();
    }

    const { data, error } = await supabase!
      .from("users_liked_recipes")
      .select("recipe_id")
      .eq("user_id", user.id)
      .in("recipe_id", recipeIds);

    if (error) {
      console.error("Error checking likes:", error);
      return new Set();
    }

    return new Set((data || []).map((item) => item.recipe_id));
  },
}

export { ApiError };
