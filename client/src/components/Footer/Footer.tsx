

export default function Footer() {
  return (
    <footer className="border-t-[1px] font-bold py-6">
    <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
      <span className="text-3xl tracking-tight">
        Bookings.com
      </span>
      <span className="tracking-tight flex gap-4">
        <p className="cursor-pointer">Privacy Policy</p>
        <p className="cursor-pointer">Terms of Service</p>
      </span>
    </div>
  </footer>
  )
}
