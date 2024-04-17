import { Button } from "@/components/ui/button";
import { LogoutUserapi } from "@/pages/Authpage/_api/AuthApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Logout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["Logout"],
    mutationFn: LogoutUserapi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ValidateToken"] });
      toast.success("Logging out");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <Button
      className="w-20 rounded-[8px] font-bold"
      onClick={handleLogout}
      disabled={isPending}
    >
      Logout
    </Button>
  );
}
