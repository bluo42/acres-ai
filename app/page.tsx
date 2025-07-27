import PropertyList from '@/components/PropertyList'
import MapView from '@/components/MapView'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Real Estate Investment Analyzer</h1>
            <p className="text-gray-600">MLS Property Analysis & Automated Underwriting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-4 h-[calc(100vh-12rem)] overflow-y-auto">
            <PropertyList />
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 h-[calc(100vh-12rem)]">
            <MapView />
          </div>
        </div>
      </div>
    </div>
  )
} 