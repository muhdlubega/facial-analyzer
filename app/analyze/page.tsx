"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { AnalysisResults } from "@/components/analysis-results"
import Image from "next/image"

export default function AnalyzePage() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const uploadedImage = sessionStorage.getItem("uploadedImage")
    const selectedFace = sessionStorage.getItem("selectedFaceUrl")

    if (uploadedImage) {
      setImageUrl(uploadedImage)
    } else if (selectedFace) {
      setImageUrl(selectedFace)
    } else {
      router.push("/")
    }
  }, [router])

  const handleAnalyze = async () => {
    if (!imageUrl) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError("Failed to analyze the image. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
      sessionStorage.removeItem("uploadedImage")
    }
  }

  const handleReset = () => {
    setResults(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Facial Recognition Analysis</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Selected Image</h2>
            {imageUrl && (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border-2 border-border">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Selected face"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={imageUrl?.startsWith("data:")}
                />
              </div>
            )}

            {!results && (
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full mt-6 bg-primary hover:bg-primary/90 h-12 text-base"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Face...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            )}

            {results && (
              <div className="flex gap-3 mt-6">
                <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                  Analyze Again
                </Button>
                <Button onClick={() => router.push("/")} variant="default" className="flex-1 bg-primary">
                  New Image
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm text-center">{error}</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  AI is analyzing facial features, ancestry markers, and emotional expressions...
                </p>
              </div>
            )}
          </Card>

          <div>{results && <AnalysisResults results={results} />}</div>
        </div>
      </div>
    </main>
  )
}
