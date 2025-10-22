"use client"

import { useRef, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"

interface WebcamCaptureProps {
  open: boolean
  onClose: () => void
  onCapture: (imageData: string) => void
}

export function WebcamCapture({ open, onClose, onCapture }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [open])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setError(null)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Unable to access camera. Please check your permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.9)
        onCapture(imageData)
        stopCamera()
      }
    }
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Take a Photo</DialogTitle>
          <DialogDescription>Position your face in the frame and click capture</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center">{error}</div>
          ) : (
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleClose} className="gap-2 bg-transparent">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={capturePhoto}
              disabled={!!error || !stream}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Camera className="w-4 h-4" />
              Capture Photo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}