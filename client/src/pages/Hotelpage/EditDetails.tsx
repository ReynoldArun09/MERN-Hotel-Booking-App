import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ManageHotelForm from "./_form/ManageHotelForm/ManageHotelForm";
import { fetchMyHotelById, UpdateMyHotelById } from "./_api/HotelApi";
import { toast } from "sonner";

export default function EditDetails() {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { data: hotel } = useQuery({
    queryFn: () => fetchMyHotelById(hotelId || ""),
    queryKey: ["fetchMyHotels", hotelId],
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateMyHotelById,
    onSuccess: () => {
      toast.success("Hotel Edited");
      navigate("/hotels");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  return (
    <ManageHotelForm hotel={hotel} isLoading={isPending} onSave={handleSave} />
  );
}
