"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

export default function PropertyAnalysis({ property }: { property: Property }) {
  const [selectedMethod, setSelectedMethod] = useState('income')

  const cashFlowData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Projected Cash Flow',
        data: [25000, 26250, 27562, 28940, 30387],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="p-6">
      <Tabs defaultValue="income" className="w-full">
        <TabsList>
          <TabsTrigger value="income">Income Approach</TabsTrigger>
          <TabsTrigger value="market">Market Approach</TabsTrigger>
          <TabsTrigger value="cost">Cost Approach</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-4">
          <h3 className="text-xl font-semibold">Income Approach Valuation</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Annual Rental Income</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                placeholder="Enter annual rent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cap Rate (%)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                placeholder="Enter cap rate"
              />
            </div>
          </div>
          <div className="h-64">
            <Line data={cashFlowData} options={{ maintainAspectRatio: false }} />
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <h3 className="text-xl font-semibold">Market Approach Valuation</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <div className="font-medium">Comparable 1</div>
                <div className="text-sm text-gray-600">123 Nearby St</div>
                <div className="text-lg font-semibold">$950,000</div>
              </div>
              <div className="p-4 border rounded">
                <div className="font-medium">Comparable 2</div>
                <div className="text-sm text-gray-600">456 Similar Ave</div>
                <div className="text-lg font-semibold">$925,000</div>
              </div>
              <div className="p-4 border rounded">
                <div className="font-medium">Comparable 3</div>
                <div className="text-sm text-gray-600">789 Market St</div>
                <div className="text-lg font-semibold">$975,000</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cost" className="space-y-4">
          <h3 className="text-xl font-semibold">Cost Approach Valuation</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Land Value</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  placeholder="Enter land value"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Construction Cost (per sqft)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  placeholder="Enter construction cost"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 