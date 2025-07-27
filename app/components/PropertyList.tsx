"use client"

import { useState } from 'react'

interface Property {
  address: string
  city: string
  state: string
  zip: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  yearBuilt: number
  acres: number
  pricePerSqft: number
}

interface PropertyListProps {
  onSelectProperty: (property: Property) => void
}

export default function PropertyList({ onSelectProperty }: PropertyListProps) {
  const [properties] = useState<Property[]>([
    {
      address: "123 Broadway",
      city: "New York",
      state: "NY",
      zip: "10001",
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
      address: "456 Sunset Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90028",
      price: 875000,
      sqft: 1850,
      bedrooms: 3,
      bathrooms: 2.5,
      propertyType: "Single Family",
      yearBuilt: 1978,
      acres: 0.17,
      pricePerSqft: 473
    },
    {
      address: "789 Lake Shore Dr",
      city: "Chicago",
      state: "IL",
      zip: "60611",
      price: 650000,
      sqft: 1600,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: "Condo",
      yearBuilt: 2005,
      acres: 0,
      pricePerSqft: 406
    }
  ])

  return (
    <div className="divide-y">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{properties.length} Properties</h2>
      </div>
      
      {properties.map((property, index) => (
        <div 
          key={index}
          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => onSelectProperty(property)}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{property.address}</h3>
              <div className="text-sm text-gray-500">{property.city}, {property.state} {property.zip}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-blue-600">${property.price.toLocaleString()}</div>
              <div className="text-sm text-gray-500">${property.pricePerSqft}/sqft</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span>{property.bedrooms}bd</span> • <span>{property.bathrooms}ba</span>
            </div>
            <div className="text-right">{property.sqft.toLocaleString()} sqft</div>
            <div>{property.propertyType}</div>
            <div className="text-right">{property.acres} acres</div>
          </div>
        </div>
      ))}
    </div>
  )
} 