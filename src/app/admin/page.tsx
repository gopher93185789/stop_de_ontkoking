"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { userAPI, recipeAPI } from "@/lib/api"
import { UserResponse } from "@/types/user"
import { Recipe } from "@/types/recipe"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, BookOpen, Shield, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: authLoading, isAdmin } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<UserResponse[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteUserDialog, setDeleteUserDialog] = useState<{ open: boolean; user: UserResponse | null }>({
    open: false,
    user: null,
  })
  const [deleteRecipeDialog, setDeleteRecipeDialog] = useState<{ open: boolean; recipe: Recipe | null }>({
    open: false,
    recipe: null,
  })
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isAdmin, authLoading, router])

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return

      try {
        const [usersData, recipesData] = await Promise.all([
          userAPI.getAllUsers(),
          recipeAPI.search({ limit: 100 }),
        ])
        setUsers(usersData)
        setRecipes(recipesData.recipes)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Fout bij laden",
          description: "Data kon niet worden geladen.",
        })
      } finally {
        setLoading(false)
      }
    }

    if (isAdmin && !authLoading) {
      fetchData()
    }
  }, [isAdmin, authLoading])

  const handleDeleteUser = async () => {
    if (!deleteUserDialog.user) return

    setIsDeleting(true)
    try {
      await userAPI.deleteUser(deleteUserDialog.user.id)
      setUsers(users.filter((u) => u.id !== deleteUserDialog.user!.id))
      toast({
        title: "Gebruiker verwijderd",
        description: "De gebruiker is succesvol verwijderd.",
      })
      setDeleteUserDialog({ open: false, user: null })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fout bij verwijderen",
        description: "De gebruiker kon niet worden verwijderd.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteRecipe = async () => {
    if (!deleteRecipeDialog.recipe) return

    setIsDeleting(true)
    try {
      await recipeAPI.delete(deleteRecipeDialog.recipe.id)
      setRecipes(recipes.filter((r) => r.id !== deleteRecipeDialog.recipe!.id))
      toast({
        title: "Recept verwijderd",
        description: "Het recept is succesvol verwijderd.",
      })
      setDeleteRecipeDialog({ open: false, recipe: null })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fout bij verwijderen",
        description: "Het recept kon niet worden verwijderd.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Laden...</div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Beheer gebruikers en recepten
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Gebruikers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Recepten</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recipes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.role === "admin").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gebruikers Beheer</CardTitle>
            <CardDescription>Bekijk en beheer alle gebruikers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {u.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {u.email} • @{u.username}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Lid sinds {formatDate(u.created_at)}
                      </div>
                    </div>
                    <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                      {u.role}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDeleteUserDialog({ open: true, user: u })}
                    disabled={u.id === user.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recipes Management */}
        <Card>
          <CardHeader>
            <CardTitle>Recepten Beheer</CardTitle>
            <CardDescription>Bekijk en beheer alle recepten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recipes.slice(0, 10).map((recipe) => (
                <div key={recipe.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <Link
                      href={`/recepten/${recipe.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {recipe.name}
                    </Link>
                    <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {recipe.description}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Toegevoegd op {formatDate(recipe.created_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recepten/${recipe.id}/bewerken`}>Bewerken</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteRecipeDialog({ open: true, recipe })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {recipes.length > 10 && (
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/recepten">Bekijk alle recepten</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete User Dialog */}
      <Dialog
        open={deleteUserDialog.open}
        onOpenChange={(open) => setDeleteUserDialog({ open, user: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gebruiker verwijderen?</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je {deleteUserDialog.user?.name} wilt verwijderen? Deze actie kan
              niet ongedaan worden gemaakt.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteUserDialog({ open: false, user: null })}
            >
              Annuleren
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={isDeleting}>
              {isDeleting ? "Bezig met verwijderen..." : "Verwijderen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Recipe Dialog */}
      <Dialog
        open={deleteRecipeDialog.open}
        onOpenChange={(open) => setDeleteRecipeDialog({ open, recipe: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recept verwijderen?</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je {deleteRecipeDialog.recipe?.name} wilt verwijderen? Deze actie
              kan niet ongedaan worden gemaakt.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteRecipeDialog({ open: false, recipe: null })}
            >
              Annuleren
            </Button>
            <Button variant="destructive" onClick={handleDeleteRecipe} disabled={isDeleting}>
              {isDeleting ? "Bezig met verwijderen..." : "Verwijderen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
