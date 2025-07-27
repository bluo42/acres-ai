"use client"

import PropertyList from '@/components/PropertyList'
import MapView from '@/components/MapView'
import PropertyAnalysis from '@/components/PropertyAnalysis'
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

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Real Estate Investment Analyzer</h1>
        <p className="text-gray-600">MLS Property Analysis & Automated Underwriting</p>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-0">
        {/* Left sidebar with property list */}
        <div className="col-span-3 border-r bg-white overflow-y-auto">
          <PropertyList onSelectProperty={setSelectedProperty} />
        </div>

        {/* Main content area with map and analysis */}
        <div className="col-span-9 flex flex-col">
          <div className="h-[45vh]">
            <MapView />
          </div>
          
          {selectedProperty ? (
            <div className="flex-1 bg-gray-50 p-4">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">{selectedProperty.address}</h2>
                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <span>{selectedProperty.propertyType}</span>
                    <span>{selectedProperty.bedrooms}bd/{selectedProperty.bathrooms}ba</span>
                    <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
                <PropertyAnalysis property={selectedProperty} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">Select a property to view analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 