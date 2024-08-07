import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LoginFormType, LoginSchema} from "../_schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginUserApi } from "../_api/AuthApi";
import { toast } from "sonner";


export default function LoginForm() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
   const form = useForm<LoginFormType>({resolver: zodResolver(LoginSchema), defaultValues:{
    email: 'testing@gmail.com',
    password: '123456'
  }});

  const {mutate, isPending} = useMutation({
    mutationKey: ['loginuser'],
    mutationFn: LoginUserApi,
    onSuccess: async(success) => {
      await queryClient.invalidateQueries({queryKey: ["ValidateToken"]});
      toast.success(success.message)
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  const onSubmit = async(formData:LoginFormType) => {
      mutate(formData)
  }


  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="sample@gmail.com"
                  className="rounded-[8px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="rounded-[8px]"
                  placeholder="*********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full rounded-[8px] text-background font-bold"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
