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
import { RegisterFormType, RegisterSchema} from "../_schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import { RegisterUserApi } from "../_api/AuthApi";

export default function RegisterForm() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const form = useForm<RegisterFormType>({resolver: zodResolver(RegisterSchema), defaultValues:{
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  }});
  const {mutate, isPending} = useMutation({
    mutationKey: ['registeruser'],
    mutationFn: RegisterUserApi,
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: ["ValidateToken"]});
      navigate(location.state?.from?.pathname || "/");
    }
  })


  const onSubmit = async(formData:RegisterFormType) => {
      mutate(formData)
  }


  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doee"
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
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="*********"
                  className="rounded-[8px]"
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
          {isPending ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}