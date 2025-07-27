"use client"

import { useState } from 'react'
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
}

interface IncomeInputs {
  annualRent: number
  operatingExpenses: number
  vacancyRate: number
  capRate: number
  appreciationRate: number
  holdingPeriod: number
}

export default function IncomeApproach({ property }: { property: Property }) {
  const [inputs, setInputs] = useState<IncomeInputs>({
    annualRent: property.sqft * 2, // Estimate $2/sqft monthly rent
    operatingExpenses: property.price * 0.4, // 40% expense ratio
    vacancyRate: 5,
    capRate: 5,
    appreciationRate: 3,
    holdingPeriod: 5
  })

  // Calculate key metrics
  const effectiveGrossIncome = inputs.annualRent * (1 - inputs.vacancyRate / 100)
  const netOperatingIncome = effectiveGrossIncome - inputs.operatingExpenses
  const marketValue = netOperatingIncome / (inputs.capRate / 100)

  // Generate cash flow projection
  const years = Array.from({ length: inputs.holdingPeriod }, (_, i) => i + 1)
  const projectedNOI = years.map(year => 
    netOperatingIncome * Math.pow(1 + inputs.appreciationRate / 100, year)
  )

  const chartData = {
    labels: years.map(year => `Year ${year}`),
    datasets: [
      {
        label: 'Projected NOI',
        data: projectedNOI,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Income Approach Inputs</h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Annual Rent
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={inputs.annualRent}
                onChange={(e) => setInputs({ ...inputs, annualRent: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Operating Expenses
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={inputs.operatingExpenses}
                onChange={(e) => setInputs({ ...inputs, operatingExpenses: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cap Rate (%)
            </label>
            <input
              type="number"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={inputs.capRate}
              onChange={(e) => setInputs({ ...inputs, capRate: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Valuation Results</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Effective Gross Income</label>
              <div className="text-lg font-medium">${effectiveGrossIncome.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Net Operating Income</label>
              <div className="text-lg font-medium">${netOperatingIncome.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Market Value</label>
              <div className="text-lg font-medium">${marketValue.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Price Difference</label>
              <div className={`text-lg font-medium ${marketValue > property.price ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(marketValue - property.price).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64">
        <h3 className="text-lg font-semibold mb-4">NOI Projection</h3>
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  )
} 