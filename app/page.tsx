import { FaceCarousel } from "@/components/face-carousel"
import { UploadSection } from "@/components/upload-section"
import { Globe, Smile, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">AI-Powered Facial Analysis</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Discover <span className="text-primary">Ancestry</span> &  Analyze Emotions
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 text-pretty max-w-2xl">
            Upload a photo and let our advanced AI analyze facial features to predict ancestry origins and emotional
            expressions with precision accuracy.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Try with Sample Faces</h2>
          <FaceCarousel />
        </div>

        <UploadSection />
      </section>
      
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ancestry Prediction</h3>
            <p className="text-muted-foreground text-sm">
              Analyze facial features to predict ethnic and geographic origins with detailed accuracy percentages
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Smile className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Emotion Detection</h3>
            <p className="text-muted-foreground text-sm">
              Identify emotional expressions from facial cues with confidence scores for each emotion
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Powered by Mistral AI</h3>
            <p className="text-muted-foreground text-sm">
              Leveraging cutting-edge vision AI technology for accurate and reliable analysis
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
