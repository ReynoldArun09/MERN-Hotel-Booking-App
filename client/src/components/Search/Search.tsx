import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchContext } from "@/context/SearchContext";

import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function Search() {

  const search = useSearchContext()

  const [destination, setDestination] = useState(search.destination)
  const [checkIn, setCheckIn] = useState(search.checkIn)
  const [checkOut, setCheckOut] = useState(search.checkOut)
  const [adultCount, setAdultCount] = useState(search.adultCount)
  const [childCount, setChildCount] = useState(search.childCount)
  const navigate = useNavigate()

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault()
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount)
    navigate('/search')
  }


  const clearSubmit = (event:FormEvent) => {
    event.preventDefault()
    setDestination('')
    setAdultCount(0)
    setChildCount(0)
    setCheckIn(new Date())
    setCheckOut(new Date())
    
  }

  return (
    <form className="p-5 rounded shadow-lg border-[2px] grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex rounded-[4px] flex-row items-center flex-1 bg-white">
        <Input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where are you going?"
          className="text-md bg-inherit w-full focus:outline-none text-black"
        />
      </div>

      <div className="flex bg-white px-1 border-2 w-fit rounded-[4px] gap-1">
        <Label className="items-center text-black flex">
          Adults:
          <Input
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            className="w-full px-1 bg-inherit border-none focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
          />
        </Label>
        <Label className="items-center text-sm text-black flex">
          Children:
          <Input
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            className="w-full px-1 bg-inherit border-none font-bold focus:outline-none"
            type="number"
            min={0}
            max={20}
          />
        </Label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full border-2 text-black p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full border-2 text-black p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <Button className="w-2/3 h-full p-3 font-bold text-white rounded-[4px]" type="submit" onClick={handleSubmit}>Search</Button>
        <Button className="w-1/3 h-full p-3 font-bold text-white rounded-[4px]" type="submit" onClick={clearSubmit}>Clear</Button>
      </div>
    </form>
  );
}
