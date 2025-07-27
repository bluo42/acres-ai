"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Property {
  address: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  yearBuilt: number
  acres: number
  pricePerSqft: number
}

interface ValuationMethod {
  id: string
  name: string
  component: React.ComponentType<{ property: Property }>
}

interface ValuationTabsProps {
  property: Property
  methods: ValuationMethod[]
}

export default function ValuationTabs({ property, methods }: ValuationTabsProps) {
  const [activeMethod, setActiveMethod] = useState(methods[0]?.id)

  return (
    <div className="p-4">
      <Tabs value={activeMethod} onValueChange={setActiveMethod} className="w-full">
        <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${methods.length}, 1fr)` }}>
          {methods.map(method => (
            <TabsTrigger key={method.id} value={method.id}>
              {method.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {methods.map(method => (
          <TabsContent key={method.id} value={method.id}>
            {/* @ts-ignore - Dynamic component */}
            <method.component property={property} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 