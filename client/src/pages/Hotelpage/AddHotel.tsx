import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "./_form/ManageHotelForm/ManageHotelForm";
import { CreateHotel } from "./_api/HotelApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function AddHotel() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateHotel,
    onSuccess: () => {
      toast.success("Hotel created");
      navigate("/hotels");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
    
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
}
