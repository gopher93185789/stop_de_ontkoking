import { recipeAPI } from "@/lib/api"

export default async function Liked() {
  const recipes = await recipeAPI.getLikedRecipes()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gelikte Recepten</h1>
      
      {recipes.length === 0 ? (
        <p className="text-gray-500">Je hebt nog geen recepten geliket.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => {
            const title = (recipe as any).title ?? (recipe as any).name ?? 'Onbekend recept';
            const description = (recipe as any).description ?? '';
            return (
              <div key={recipe.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 line-clamp-3">{description}</p>
                <a 
                  href={`/recipes/${recipe.id}`}
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Bekijk recept →
                </a>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}