import { Label } from "@/components/ui/label";


type StarRatingType = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StarRatingFilter({
  selectedStars,
  onChange,
}: StarRatingType) {
  return (
    <section className="border-b-2 pb-5">
      <h4 className="text-md pb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <Label key={star} className="flex items-center space-x-2 py-1">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </Label>
      ))}
    </section>
  );
}
