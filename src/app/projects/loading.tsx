import { Card } from '../_components/card';

export default function ProjectsLoading() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
        {/* Featured project skeleton */}
        <Card>
          <div className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="h-4 bg-gray-700 rounded w-24"></div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </Card>

        {/* Secondary projects skeleton */}
        <div className="flex flex-col w-full gap-8">
          {[1, 2].map((i) => (
            <Card key={i}>
              <div className="p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="h-3 bg-gray-700 rounded w-20"></div>
                  <div className="h-3 bg-gray-700 rounded w-12"></div>
                </div>
                <div className="h-6 bg-gray-700 rounded w-2/3 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="hidden my-6 w-full h-px md:block bg-zinc-800" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
        {[1, 2, 3].map((col) => (
          <div key={col} className="grid grid-cols-1 gap-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <div className="p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="h-3 bg-gray-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-700 rounded w-10"></div>
                  </div>
                  <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}