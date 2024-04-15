import { Label } from "@/components/ui/label";
import { hotelFacilities } from "@/utils/hotelsOptions";

type FacilitesTypes = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function FacilitiesFilter({selectedFacilities, onChange}: FacilitesTypes) {
  return (
    <section className="border-b-2 pb-5">
      <h4 className="text-md pb-2">Facilites</h4>
      {hotelFacilities.map((facility: string) => (
        <Label className="flex items-center space-x-2 py-1" key={facility}>
          <input
            type="checkbox"
            className="mr-2"
            name="facilities"
            value={facility}
            onChange={onChange}
            checked={selectedFacilities.includes(facility)}
          />
          <span>{facility}</span>
        </Label>
      ))}
    </section>
  )
}
