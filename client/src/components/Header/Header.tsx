import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"
import Logout from "../Logout/Logout"

export default function Header() {
  const {isLoggedIn} = useAppContext()
  return (
    <header className="py-6 border-b-[1px] font-bold">
     <section className="container mx-auto flex justify-between">
     <span className="text-3xl tracking-wide">
        <Link to={'/'}>Bookings.com</Link>
      </span>
      <span className="flex gap-3 items-center">
        {isLoggedIn ? (
          <>
            <Button variant={'link'} asChild>
              <Link to={'/my-bookings'}>My Bookings</Link>
            </Button>
            <Button variant={'link'} asChild>
              <Link to={'/my-hotels'}>My Hotels</Link>
            </Button>
            <Logout />
          </>
        ): (
          <Button asChild className="w-20 rounded-[8px]">
          <Link to={'/login'}>Login</Link>
        </Button>
        )}
      </span>
     </section>
    </header>
  )
}