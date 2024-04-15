import { useQuery } from "@tanstack/react-query"
import { FetchAllHotels } from "./_api/HomeApi"
import LatestDestinationCard from "./_components/LatestDestinationCard"


export default function Homepage() {
  const {data: hotels} = useQuery({
    queryKey: ['fetchAllHotels'],
    queryFn: () => FetchAllHotels()
  })

 
  const topRowHotels = hotels?.slice(0, 2) || []
  const bottomRowHotels = hotels?.slice(2) || []

  return (
    <div className="space-y-3">
    <h2 className="text-3xl font-bold">Latest Destinations</h2>
    <p>Most recent desinations added by our hosts</p>
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {topRowHotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} key={hotel._id}/>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {bottomRowHotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} key={hotel._id}/>
        ))}
      </div>
    </div>
  </div>
  )
}
