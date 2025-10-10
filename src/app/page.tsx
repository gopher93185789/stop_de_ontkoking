import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Search, Share2, BookOpen, Sparkles, Users, ArrowRight, Star, Clock, Heart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full items-center">
      {/* Hero Section - Sfeervol met ambient background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background bg-ambient w-full">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative py-24 md:py-32 lg:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Nieuw: Deel je recepten met de wereld!
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Stop de Ontkoking!
                <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Start je kookavontuur
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ontdek duizenden heerlijke recepten, deel je eigen creaties en
                word onderdeel van een groeiende community van kookliefhebbers
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href="/recepten">
                  <Search className="mr-2 h-5 w-5" />
                  Ontdek Recepten
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 h-14 border-2"
              >
                <Link href="/signup">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Gratis Aanmelden
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 w-full max-w-2xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  1000+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Recepten
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Gebruikers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  4.8
                </div>
                <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Sfeervoller */}
      <section className="py-20 md:py-32 bg-muted/30 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Waarom Stop de Ontkoking?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Alles wat je nodig hebt om je kookavontuur te beginnen en je
              culinaire vaardigheden te verbeteren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Zoek & Filter</CardTitle>
                  <CardDescription className="text-base">
                    Vind het perfecte recept op basis van ingrediënten, type
                    gerecht, bereidingstijd en meer
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Share2 className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">
                    Deel je Recepten
                  </CardTitle>
                  <CardDescription className="text-base">
                    Maak je eigen recepten aan en deel ze met de community. Word
                    een ster in de keuken!
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">
                    Gedetailleerde Instructies
                  </CardTitle>
                  <CardDescription className="text-base">
                    Stap-voor-stap bereidingswijze met ingrediëntenlijst en
                    handige tips voor succes
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Modern Design</CardTitle>
                  <CardDescription className="text-base">
                    Een frisse, intuïtieve interface met dark mode speciaal
                    ontworpen voor Gen Z
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Community</CardTitle>
                  <CardDescription className="text-base">
                    Ontdek recepten van andere kookliefhebbers en laat je
                    inspireren
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChefHat className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Jouw Kookboek</CardTitle>
                  <CardDescription className="text-base">
                    Beheer al je recepten op één plek en heb ze altijd bij de
                    hand
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 md:py-32 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Hoe werkt het?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              In 3 simpele stappen
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Begin binnen enkele minuten met koken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Maak een account</h3>
              <p className="text-muted-foreground">
                Registreer je gratis in 30 seconden en krijg direct toegang tot
                alle recepten
              </p>
            </div>

            <div className="relative text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Ontdek recepten</h3>
              <p className="text-muted-foreground">
                Zoek en filter door duizenden recepten en vind je perfecte
                gerecht
              </p>
            </div>

            <div className="relative text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Begin met koken!</h3>
              <p className="text-muted-foreground">
                Volg de stappen en creëer heerlijke gerechten. Deel je eigen
                recepten!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ambient */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background bg-ambient w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-16 lg:p-20 text-center shadow-2xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="pointer-events-none absolute -top-10 right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Heart className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  Gratis voor altijd
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Klaar om te beginnen met koken?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                Sluit je aan bij duizenden kookliefhebbers en begin vandaag nog
                met het delen en ontdekken van heerlijke recepten
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 h-14 shadow-xl"
                >
                  <Link href="/signup">
                    <ChefHat className="mr-2 h-5 w-5" />
                    Gratis aanmelden
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 h-14 backdrop-blur-sm"
                >
                  <Link href="/recepten">Recepten bekijken</Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-white text-white" />
                  <span>Geen creditcard nodig</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 fill-white text-white" />
                  <span>Altijd gratis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}