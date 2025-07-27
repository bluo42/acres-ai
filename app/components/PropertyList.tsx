"use client"

import { useState } from 'react'

interface Property {
  address: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  yearBuilt: number
  acres: number
  pricePerSqft: number
}

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([
    {
      address: "123 Broadway, New York, NY 10001",
      price: 1250000,
      sqft: 2100,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: "Condo",
      yearBuilt: 1995,
      acres: 0,
      pricePerSqft: 595
    },
    {
      address: "456 Sunset Blvd, Los Angeles, CA 90028",
      price: 875000,
      sqft: 1850,
      bedrooms: 3,
      bathrooms: 2.5,
      propertyType: "Single Family",
      yearBuilt: 1978,
      acres: 0.17,
      pricePerSqft: 473
    }
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{properties.length} Properties</h2>
      <div className="space-y-4">
        {properties.map((property, index) => (
          <div 
            key={index}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{property.address}</h3>
                <div className="text-sm text-gray-500">{property.propertyType}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-lg">${property.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">${property.pricePerSqft}/sqft</div>
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">{property.bedrooms}bd</span> • <span className="font-medium">{property.bathrooms}ba</span>
              </div>
              <div className="text-right">{property.sqft.toLocaleString()} sqft</div>
              <div>Built {property.yearBuilt}</div>
              <div className="text-right">{property.acres} acres</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 