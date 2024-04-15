import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import ResetForm from "./_components/ResetForm";

export default function Resetpage() {
  return (
    <section className="h-screen flex">
    <Card className="m-auto w-[450px] rounded-xl">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter your email address and we will send you a verification code</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetForm />
      </CardContent>
    </Card>
  </section>
  )
}
