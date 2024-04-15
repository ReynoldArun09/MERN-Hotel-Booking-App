
import { Label } from "@/components/ui/label";
import { hotelTypes } from "@/utils/hotelsOptions";

type HotelTypes = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HotelTypesFilter({selectedHotelTypes, onChange}:HotelTypes) {
  return (
    <section className="border-b-2 pb-5">
    <h4 className="text-md pb-2">Hotel Type</h4>
    {hotelTypes.map((Hoteltype: string) => (
      <Label className="flex items-center space-x-2 py-1" key={Hoteltype}>
        <input
          type="checkbox"
          className="mr-2"
          name="facilities"
          value={Hoteltype}
          onChange={onChange}
          checked={selectedHotelTypes.includes(Hoteltype)}
        />
        <span>{Hoteltype}</span>
      </Label>
    ))}
  </section>
  )
}
