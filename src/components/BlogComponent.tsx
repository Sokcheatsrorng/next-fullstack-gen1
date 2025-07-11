import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, User, Eye, Heart } from "lucide-react"

export interface BlogComponentProps {
  id: number
  userId: string
  title: string
  body: string
  make?: string
  model?: string
  year?: number
  price?: number
  mileage?: number
  fuelType?: string
  transmission?: string
  color?: string
  image?: string
}

export default function BlogComponent({
  id,
  userId,
  title,
  make = "Unknown Make",
  model = "Unknown Model",
  year = 2023,
  price = 0,
  mileage = 0,
  fuelType = "Gasoline",
  transmission = "Automatic",
  color = "Black",
  image = "/placeholder.svg?height=400&width=600",
}: BlogComponentProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-24" key={id}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{make}</Badge>
          <Badge variant="outline">{fuelType}</Badge>
          <Badge variant="outline">{transmission}</Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {title || `${year} ${make} ${model}`}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>By {userId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>1.2k views</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>24 likes</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-8">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${make} ${model}`}
          width={800}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          priority
        />
      </div>

      {/* Car Specifications */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Vehicle Specifications</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{year}</div>
              <div className="text-sm text-gray-600">Year</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${price.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Price</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{mileage.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Miles</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{color}</div>
              <div className="text-sm text-gray-600">Color</div>
            </div>
          </div>
        </CardContent>
      </Card>

   

    

   
    </article>
  )
}
