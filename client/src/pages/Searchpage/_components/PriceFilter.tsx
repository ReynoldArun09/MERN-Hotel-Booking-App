import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PriceFilterType = {
  selectedPrice?: number;
  onChange: (value?:number) => void
}

export default function PriceFilter({selectedPrice, onChange}: PriceFilterType) {
  return (
    <section>
      <h4 className="text-md mb-2">Max Price</h4>
      <Select defaultValue={selectedPrice?.toString()} onValueChange={(value) => onChange(parseInt(value))}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Max Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[1200, 2500, 3000, 3200, 5000].map((price) => (
            <SelectItem key={price} value={price.toString()}>
              {price}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
      </Select>
    </section>
  )
}
