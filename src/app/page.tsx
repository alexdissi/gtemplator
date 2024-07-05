import Image from "next/image"
import {Button} from "@/components/ui/button"
import ToggleTheme from "@/components/ui/toggleTheme"

export default function Home() {
  return (
    <div class="body flex flex-col items-center justify-center min-h-screen">
      <header class="w-full flex justify-between items-center p-6">
        <div class="text-xl font-bold">GTemplator</div>
        <nav class="space-x-6">
          <a class="hover:underline" href="#">
            A propos de nous
          </a>
          <a class="hover:underline" href="#">
            Modèles
          </a>
          <a class="hover:underline" href="#">
            Fonctionnalités
          </a>
          <a class="hover:underline" href="#">
            Documentation
          </a>
        </nav>
        <div class="space-x-4">
          <i class="fas fa-question-circle"></i>
          <i class="fas fa-comments"></i>
          <i class="fas fa-twitter"></i>
          <i class="fas fa-user-circle"></i>
        </div>
      </header>
      <main class="text-center mt-20">
        <h1 class="text-4xl gradient-text font-bold">
          Créez des sites web professionnels en un clin d'œil
        </h1>
        <h2 class="text-6xl font-bold mt-4">AI websites</h2>
        <p class="text-lg mt-6 max-w-2xl mx-auto">
          GTemplator simplifie la création de sites web en vous offrant des
          modèles prédéfinis et la possibilité d'importer vos designs depuis
          Figma, Sketch ou Adobe XD. Plus besoin de compétences avancées en
          développement web !
        </p>
        <div class="mt-8 space-x-4">
          <a class="button-outline" href="#">
            Commencer maintenant
          </a>
          <a class="button-outline" href="#">
            Découvrir les modèles
          </a>
        </div>
      </main>
      <div class="mt-20">
        <img
          src="https://i.ibb.co/1QBMRHK/Capture-d-e-cran-2024-07-04-a-11-20-09.png"
          // src="https://i.ibb.co/Lz0VYfS/Looper-BG.png"
          alt="Illustration of two robots working together with an infinity symbol"
          width="10000"
        />
      </div>
    </div>
  )
}
