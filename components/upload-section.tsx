"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function UploadSection() {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const blobUrl = URL.createObjectURL(file)
      setPreview(blobUrl)
      setSelectedFile(file)
    }
  }

  const handleAnalyze = () => {
    if (preview && selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        try {
          sessionStorage.setItem("uploadedImage", base64String)
          router.push("/analyze")
        } catch (e) {
          console.error("Storage quota exceeded, using alternative method")
          sessionStorage.setItem("useUploadedFile", "true")
          router.push("/analyze")
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Or Upload Your Own Photo</h2>

      <Card className="p-8">
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleChange} />

          {preview ? (
            <div className="space-y-4">
              <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="256px"
                  unoptimized
                />
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (preview) URL.revokeObjectURL(preview)
                    setPreview(null)
                    setSelectedFile(null)
                    sessionStorage.removeItem("uploadedImage")
                  }}
                  className="cursor-pointer"
                >
                  Remove
                </Button>
                <Button onClick={handleAnalyze} className="cursor-pointer bg-primary hover:bg-primary/90">
                  Analyze This Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium mb-2">
                  Drop your image here, or{" "}
                  <button onClick={() => fileInputRef.current?.click()} className="cursor-pointer text-primary hover:underline">
                    browse
                  </button>
                </p>
                <p className="text-sm text-muted-foreground">Supports: JPG, PNG, WEBP (Max 10MB)</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
