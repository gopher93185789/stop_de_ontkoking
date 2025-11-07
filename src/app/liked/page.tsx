"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { recipeAPI } from "@/lib/api"
import { Recipe } from "@/types/recipe"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeGridSkeleton } from "@/components/loading-skeletons"
import { EmptyState } from "@/components/empty-state"
import { useToast } from "@/hooks/use-toast"
import { Heart } from "lucide-react"

export default function LikedPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set())

  // Redirect to signup if user is not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om je gelikte recepten te bekijken.",
      })
      router.push("/signup")
    }
  }, [user, authLoading, router, toast])

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      if (!user) return

      setLoading(true)
      try {
        const likedRecipes = await recipeAPI.getLikedRecipes()
        setRecipes(likedRecipes)
        // All these recipes are liked by definition
        setLikedRecipes(new Set(likedRecipes.map(r => r.id)))
      } catch (error) {
        console.error("Error fetching liked recipes:", error)
        toast({
          variant: "destructive",
          title: "Fout bij laden",
          description: "Gelikte recepten konden niet worden geladen.",
        })
      } finally {
        setLoading(false)
      }
    }

    if (user && !authLoading) {
      fetchLikedRecipes()
    }
  }, [user, authLoading, toast])

  const handleLikeToggle = (recipeId: string, isLiked: boolean) => {
    if (!isLiked) {
      // Remove from the list when unliked
      setRecipes(prev => prev.filter(r => r.id !== recipeId))
      setLikedRecipes(prev => {
        const newSet = new Set(prev)
        newSet.delete(recipeId)
        return newSet
      })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gelikede Recepten</h1>
        <RecipeGridSkeleton />
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Heart className="h-10 w-10 fill-red-500 text-red-500" />
          <h1 className="text-4xl font-bold">Gelikede Recepten</h1>
        </div>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isLiked={likedRecipes.has(recipe.id)}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nog geen gelikte recepten"
            description="Je hebt nog geen recepten geliked. Ontdek recepten en like ze om ze hier terug te vinden!"
            action={{
              label: "Ontdek Recepten",
              href: "/recepten",
            }}
            icon="heart"
          />
        )}
      </div>
    </div>
  )
}