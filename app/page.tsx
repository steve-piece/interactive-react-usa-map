import { DemoMap } from "@/components/demo-map"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 px-4 pt-4 pb-6 sm:px-6 md:px-8 md:pt-6 md:pb-8 md:mb-16 lg:px-12 lg:pt-8 lg:pb-12 xl:px-20 mr-2">
          <div className="space-y-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Interactive USA Map Demo</h1>
              <p className="text-sm text-slate-400 mt-1">
                Hover over states to see product and customer details. Select a state to highlight it within the map.
              </p>
            </div>
            <DemoMap />
          </div>
        </div>
      </main>
    </div>
  )
}
