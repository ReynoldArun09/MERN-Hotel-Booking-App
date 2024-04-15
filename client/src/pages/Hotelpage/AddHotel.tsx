import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "./_form/ManageHotelForm/ManageHotelForm";
import { CreateHotel } from "./_api/HotelApi";



export default function AddHotel() {
  const { mutate, isPending } = useMutation({
    mutationFn: CreateHotel,
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
}
