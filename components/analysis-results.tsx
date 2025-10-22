"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { EllipsisIcon, Globe, Smile } from "lucide-react"

interface AncestryPrediction {
  region: string
  percentage: number
}

interface OriginPrediction {
  country: string
  percentage: number
}

interface EmotionPrediction {
  emotion: string
  percentage: number
}

interface AnalysisResultsProps {
  results: {
    ancestry: AncestryPrediction[]
    origin: OriginPrediction[]
    emotions: EmotionPrediction[]
    description: string
  }
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const sortedAncestry = [...results.ancestry].sort((a, b) => b.percentage - a.percentage)
  const sortedOrigin = [...results.origin].sort((a, b) => b.percentage - a.percentage)
  const sortedEmotions = [...results.emotions].sort((a, b) => b.percentage - a.percentage)

  const getEmotionColor = (emotion: string) => {
    const emotionLower = emotion.toLowerCase()
    if (emotionLower.includes("happy") || emotionLower.includes("joy")) return "text-yellow-600"
    if (emotionLower.includes("sad")) return "text-blue-600"
    if (emotionLower.includes("angry") || emotionLower.includes("anger")) return "text-red-600"
    return "text-foreground"
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Ancestry Predictions</h2>
            <p className="text-sm text-muted-foreground">Discover ancestral roots through analysis of defining facial traits linked to diverse heritages</p>
          </div>
        </div>

        <div className="space-y-5">
          {sortedAncestry.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant={index === 0 ? "default" : "secondary"} className="font-medium">
                    #{index + 1}
                  </Badge>
                  <span className="font-medium">{item.region}</span>
                </div>
                <span className="text-lg font-semibold text-primary">{item.percentage.toFixed(1)}%</span>
              </div>
              <Progress value={item.percentage} className="h-3" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Top Match:</strong> {sortedAncestry[0]?.region} with{" "}
            {sortedAncestry[0]?.percentage.toFixed(1)}% confidence
          </p>
        </div>
      </Card>

      <Card className="p-6 border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Country of Origin Predictions</h2>
            <p className="text-sm text-muted-foreground">Uncover likely regions of origin by identifying subtle patterns and similarities in facial features</p>
          </div>
        </div>

        <div className="space-y-5">
          {sortedOrigin.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant={index === 0 ? "default" : "secondary"} className="font-medium">
                    #{index + 1}
                  </Badge>
                  <span className="font-medium">{item.country}</span>
                </div>
                <span className="text-lg font-semibold text-primary">{item.percentage.toFixed(1)}%</span>
              </div>
              <Progress value={item.percentage} className="h-3" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Top Match:</strong> {sortedOrigin[0]?.country} with{" "}
            {sortedOrigin[0]?.percentage.toFixed(1)}% confidence
          </p>
        </div>
      </Card>

      <Card className="p-6 border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Smile className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Emotion Detection</h2>
            <p className="text-sm text-muted-foreground">Understand real-time emotions through precise facial expression interpretation</p>
          </div>
        </div>

        <div className="space-y-5">
          {sortedEmotions.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant={index === 0 ? "default" : "secondary"} className="font-medium">
                    #{index + 1}
                  </Badge>
                  <span className={`font-medium capitalize ${getEmotionColor(item.emotion)}`}>{item.emotion}</span>
                </div>
                <span className="text-lg font-semibold text-primary">{item.percentage.toFixed(1)}%</span>
              </div>
              <Progress value={item.percentage} className="h-3" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Dominant Emotion:</strong> {sortedEmotions[0]?.emotion} with{" "}
            {sortedEmotions[0]?.percentage.toFixed(1)}% confidence
          </p>
        </div>
      </Card>

      
      <Card className="p-6 border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <EllipsisIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-sm text-muted-foreground">Summary of analysis</p>
          </div>
        </div>

        <div className="space-y-5">
          {results.description}
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <p className="text-xs text-muted-foreground text-center">
          Analysis powered by Mistral AI Vision • Results are AI-generated predictions and should be interpreted as
          estimates
        </p>
      </Card>
    </div>
  )
}
