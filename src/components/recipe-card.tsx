import Link from "next/link"
import { Recipe } from "@/types/recipe"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
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

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.preparation_time + recipe.cooking_time

  return (
    <Link href={`/recepten/${recipe.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {recipe.name}
            </CardTitle>
            <Badge variant={mealTypeColors[recipe.meal_type]}>
              {mealTypeLabels[recipe.meal_type]}
            </Badge>
          </div>
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
        <CardFooter>
          <div className="flex flex-wrap gap-1">
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
        </CardFooter>
      </Card>
    </Link>
  )
}
