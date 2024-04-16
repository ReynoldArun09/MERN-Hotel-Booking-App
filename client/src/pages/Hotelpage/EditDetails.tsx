
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ManageHotelForm from "./_form/ManageHotelForm/ManageHotelForm";
import { fetchMyHotelById, UpdateMyHotelById } from "./_api/HotelApi";


export default function EditDetails() {
  const {hotelId} = useParams()
  const {data:hotel} = useQuery({
    queryFn: () => fetchMyHotelById(hotelId || ""),
    queryKey: ['fetchMyHotels', hotelId],
    enabled: !!hotelId
  })



  const {mutate, isPending} = useMutation({
    mutationFn: UpdateMyHotelById,
    onSuccess: () => {},
    onError: () => {}
  })

  const handleSave = (formData: FormData) => {
    mutate(formData)
  }

  return (
    <ManageHotelForm hotel={hotel} isLoading={isPending} onSave={handleSave}/>
  )
}