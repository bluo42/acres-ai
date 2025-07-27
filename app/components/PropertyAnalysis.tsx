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

interface FinancialMetrics {
  grossRent: number
  effectiveRent: number
  totalExpenses: number
  noi: number
  debtService: number
  cashFlow: number
  capRate: number
  cocReturn: number
  dscr: number
  cashNeeded: number
}

export default function PropertyAnalysis({ property }: { property: Property }) {
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    grossRent: 12500,
    effectiveRent: 11875,
    totalExpenses: -4334,
    noi: 7541,
    debtService: -6555.14,
    cashFlow: 985.86,
    capRate: 7.24,
    cocReturn: 3.79,
    dscr: 1.15,
    cashNeeded: 350000
  })

  return (
    <div className="p-4">
      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Cash Flow Analysis</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gross Rent</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      value={metrics.grossRent}
                      onChange={(e) => setMetrics({...metrics, grossRent: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Expenses</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      value={Math.abs(metrics.totalExpenses)}
                      onChange={(e) => setMetrics({...metrics, totalExpenses: -Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Debt Service</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      value={Math.abs(metrics.debtService)}
                      onChange={(e) => setMetrics({...metrics, debtService: -Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cash Needed</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      value={metrics.cashNeeded}
                      onChange={(e) => setMetrics({...metrics, cashNeeded: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Cash Flow Analysis</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Rent:</span>
                  <span className="font-medium">${metrics.grossRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Effective Rent:</span>
                  <span className="font-medium">${metrics.effectiveRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Expenses:</span>
                  <span className="font-medium text-red-600">${metrics.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NOI:</span>
                  <span className="font-medium">${metrics.noi.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Debt Service:</span>
                  <span className="font-medium text-red-600">${metrics.debtService.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cash Flow:</span>
                  <span className="font-medium text-green-600">${metrics.cashFlow.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cap Rate:</span>
                  <span className="font-medium">{metrics.capRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CoC Return:</span>
                  <span className="font-medium">{metrics.cocReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DSCR:</span>
                  <span className="font-medium">{metrics.dscr}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cash Needed:</span>
                  <span className="font-medium">${metrics.cashNeeded.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 