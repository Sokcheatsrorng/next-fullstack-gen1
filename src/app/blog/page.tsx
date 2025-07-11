import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogComponentProps } from "@/components/BlogComponent"


const BASE_URL = "https://car-nextjs-api.cheatdev.online/cars?skip=0&limit=12"

async function fetchCars() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch cars")
    }

    const data = await res.json();

    console.log("data",data)
    return data.cars || data || []
  } catch (error) {
    console.error("Error fetching cars:", error)
    return []
  }
}

export default async function CarsPage() {
  const cars = await fetchCars();
  console.log("Car Data: ", cars)

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Blog</h1>
        <p className="text-gray-600 text-lg">Discover amazing cars with detailed reviews and specifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car: BlogComponentProps) => (
          <Link key={car.id} href={`/blog/${car.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={car?.image ||  "/placeholder.svg?height=200&width=300"}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary">{car.make}</Badge>
                  <Badge variant="outline">{car.year}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{car.title || `${car.year} ${car.make} ${car.model}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-green-600">${car.price?.toLocaleString() || "N/A"}</span>
                  <span className="text-sm text-gray-600">{car.mileage?.toLocaleString() || "N/A"} miles</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {car.body || `Beautiful ${car.make} ${car.model} in excellent condition.`}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
