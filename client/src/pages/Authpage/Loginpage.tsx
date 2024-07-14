import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import LoginForm from "./_components/LoginForm";


export default function Loginpage() {
  return (
    <section className="h-screen flex">
      <Card className="m-auto w-[450px] rounded-xl">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent> 
          <LoginForm />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="space-x-2">
            <span className="text-muted-foreground text-sm">Don't have an account?</span>
            <Link to={'/register'} className="hover:underline hover:underline-offset-4" aria-label="sign up">Sign up</Link>
          </div>
          <Link to={'/reset-password'} className="hover:underline hover:underline-offset-4 text-sm text-foreground" aria-label="reset password">Reset password</Link>
        </CardFooter>
      </Card>
    </section>
  )
}
