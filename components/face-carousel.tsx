"use client"

import { useCallback, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const sampleFaces = [
  { id: 1, url: "/sample1.jpg", name: "Sample 1" },
  { id: 2, url: "/sample2.jpg", name: "Sample 2" },
  { id: 3, url: "/sample12.jpg", name: "Sample 3" },
  { id: 4, url: "/sample4.jpg", name: "Sample 4" },
  { id: 5, url: "/sample7.jpg", name: "Sample 5" },
  { id: 6, url: "/sample8.jpg", name: "Sample 6" },
  { id: 7, url: "/sample6.jpg", name: "Sample 7" },
  { id: 8, url: "/sample5.jpg", name: "Sample 8" },
  { id: 9, url: "/sample10.jpg", name: "Sample 9" },
  { id: 10, url: "/sample9.jpg", name: "Sample 10" },
  { id: 11, url: "/sample11.jpg", name: "Sample 11" },
  { id: 12, url: "/sample3.jpg", name: "Sample 12" },
]

export function FaceCarousel() {
  const router = useRouter()
  const autoplay = useRef(
    Autoplay(
      { delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }
    )
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplay.current]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const handleAnalyze = (faceUrl: string) => {
    sessionStorage.setItem("selectedFaceUrl", faceUrl)
    router.push("/analyze")
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-lg"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="overflow-hidden mx-12 py-4" ref={emblaRef}>
        <div className="flex mx-2">
          {sampleFaces.map((face) => (
            <Card
              key={face.id}
              className="flex-shrink-0 w-56 md:w-72 mx-2 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group py-0"
              onClick={() => handleAnalyze(face.url)}
            >
              <div className="relative aspect-square">
                <Image
                  src={face.url || "/placeholder.svg"}
                  alt={face.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 288px"
                  priority={face.id <= 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <Button className="cursor-pointer bg-primary hover:bg-primary/90">Analyze Face</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-lg"
        onClick={scrollNext}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
