
import BlogComponent from "@/components/BlogComponent"
import type { Metadata, ResolvingMetadata } from "next"

// Define type
type Props = {
  params: Promise<{ id: string }>
}
const hello = "hello";
console.log(hello);

const BASE_URL = "https://car-nextjs-api.cheatdev.online/cars"

// Fetch car data
async function fetchCarData(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch car data")
    }

    const carData = await res.json()
    return carData
  } catch (error) {
    console.error("Error fetching car data:", error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = await params

  // Fetch car data
  const car = await fetchCarData(id)

  if (!car) {
    return {
      title: "Car Not Found",
      description: "The requested car could not be found.",
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const carTitle = `${car.year || "Used"} ${car.make || "Car"} ${car.model || "for Sale"}`
  const carDescription = `Discover this amazing ${car.make} ${car.model}. ${car.description || "A great vehicle with excellent features and performance."}`

  return {
    title: carTitle,
    description: carDescription,
    openGraph: {
      title: carTitle,
      description: carDescription,
      images: [car.image || "/placeholder.svg?height=400&width=600", ...previousImages],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: carTitle,
      description: carDescription,
      images: [car.image || "/placeholder.svg?height=400&width=600"],
    },
  }
}

export default async function CarBlogPage({ params }: Props) {
  const { id } = await params
  const car = await fetchCarData(id)

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py- text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Not Found</h1>
        <p className="text-gray-600">The car you are looking for could not be found.</p>
      </div>
    )
  }

  return (
    <BlogComponent
      key={car.id}
      id={car.id}
      userId={car.dealer || car.seller || "Car Dealer"}
      title={car.title || `${car.year} ${car.make} ${car.model}`}
      body={car.description || car.body}
      make={car.make}
      model={car.model}
      year={car.year}
      price={car.price}
      mileage={car.mileage}
      fuelType={car.fuelType || car.fuel_type}
      transmission={car.transmission}
      color={car.color}
      image={car.image || car.image_url}
    />
  )
}
