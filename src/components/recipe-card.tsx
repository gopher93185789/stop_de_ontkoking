"use client"

import Link from "next/link"
import Image from "next/image"
import { Recipe } from "@/types/recipe"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, ChefHat, Heart } from "lucide-react"
import { formatTime } from "@/lib/utils"
import { recipeAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface RecipeCardProps {
  recipe: Recipe
  isLiked?: boolean
  onLikeToggle?: (recipeId: string, isLiked: boolean) => void
}

const mealTypeLabels: Record<Recipe["meal_type"], string> = {
  breakfast: "Ontbijt",
  lunch: "Lunch",
  dinner: "Diner",
  snack: "Snack",
  dessert: "Dessert",
  drink: "Drankje",
}

const mealTypeColors: Record<Recipe["meal_type"], "default" | "secondary" | "destructive" | "outline"> = {
  breakfast: "default",
  lunch: "secondary",
  dinner: "default",
  snack: "outline",
  dessert: "secondary",
  drink: "outline",
}

export function RecipeCard({ recipe, isLiked = false, onLikeToggle }: RecipeCardProps) {
  const totalTime = recipe.preparation_time + recipe.cooking_time
  const ownerInitial = recipe.owner_name?.charAt(0).toUpperCase() || "?"
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Inloggen vereist",
        description: "Je moet ingelogd zijn om recepten te liken!",
      })
      router.push("/signup")
      return
    }

    try {
      const { isLiked: newIsLiked } = await recipeAPI.toggleLike(recipe.id)
      
      if (onLikeToggle) {
        onLikeToggle(recipe.id, newIsLiked)
      }

      toast({
        title: newIsLiked ? "Recept geliked!" : "Like verwijderd",
        description: newIsLiked
          ? "Je kunt dit recept terugvinden bij je gelikete recepten."
          : "Het recept is verwijderd uit je likes.",
      })
    } catch (error) {
      console.error("Error toggling like:", error)
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er ging iets mis bij het liken van dit recept.",
      })
    }
  }

  return (
    <Link href={`/recepten/${recipe.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
        {/* Recipe Image */}
        {recipe.image_url && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={recipe.image_url}
              alt={recipe.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {recipe.name}
            </CardTitle>
            <Badge variant={mealTypeColors[recipe.meal_type]}>
              {mealTypeLabels[recipe.meal_type]}
            </Badge>
          </div>
          {/* Owner Info */}
          {recipe.owner_name && (
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                {recipe.owner_avatar && (
                  <AvatarImage src={recipe.owner_avatar} alt={recipe.owner_name} />
                )}
                <AvatarFallback className="text-xs">
                  {ownerInitial}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {recipe.owner_name}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {recipe.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(totalTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} {recipe.servings === 1 ? 'persoon' : 'personen'}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.ingredients.length} ingrediënten</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1 flex-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.ingredients.length - 3}
              </Badge>
            )}
          </div>
          <button
            onClick={handleToggleLike}
            className="ml-2 transition-all hover:scale-110"
            aria-label={isLiked ? "Unlike recept" : "Like recept"}
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "hover:fill-red-500 hover:text-red-500 text-muted-foreground"
              }`}
            />
          </button>
        </CardFooter>
      </Card>
    </Link>
  )
}
