import { type NextRequest, NextResponse } from "next/server"
import { Mistral } from "@mistralai/mistralai"

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    let imageData: string
    let mediaType: string

    if (imageUrl.startsWith("data:")) {
      const matches = imageUrl.match(/^data:([^;]+);base64,(.+)$/)
      if (!matches) {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 })
      }
      mediaType = matches[1]
      imageData = matches[2]
    } else {
      const resolvedUrl = imageUrl.startsWith("/")
  ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${imageUrl}`
  : imageUrl

const response = await fetch(resolvedUrl)
      const buffer = await response.arrayBuffer()
      imageData = Buffer.from(buffer).toString("base64")
      mediaType = response.headers.get("content-type") || "image/jpeg"
    }

    const mistral = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY || "",
    })

    const response = await mistral.chat.complete({
      model: "pixtral-12b-2409",
      responseFormat: {
        type: "json_object",
      },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this facial image and provide a JSON response with this exact structure:
{
  "ancestry": [
    {"region": "Region Name", "percentage": number},
    ... (5 items total, percentages are separate for each item depending on the accuracy)
  ],
  "emotions": [
    {"emotion": "Emotion Name", "percentage": number},
    ... (5 items total, percentages are separate for each item depending on the accuracy)
  ],
  "description": string
}

For ancestry, identify the top 5 most likely country of origins based on facial features (e.g., "Malaysian", "Chinese", "Japanese", "German", "American").
For emotions, identify the top 5 emotions expressed (e.g., "Happy", "Neutral", "Surprised", "Thoughtful", "Confident").
For description, summarize the facial features to highlight the geographic, ethnic aspects and describe the facial features related to the emotion expressed in not less than 3 sentences.`,
            },
            {
              type: "image_url",
              imageUrl: `data:${mediaType};base64,${imageData}`,
            },
          ],
        },
      ],
    })

    const content = response.choices?.[0]?.message?.content || ""

    let analysisResult
    try {
      if (typeof content === "string") {
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0])
        } else {
          throw new Error("No JSON found in response")
        }
      } else {
        analysisResult = content
      }
    } catch (parseError) {
      console.error("Error parsing Mistral response:", parseError)
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          rawResponse: content,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error("Error analyzing face:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}
