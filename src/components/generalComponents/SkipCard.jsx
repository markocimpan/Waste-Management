// UI Imports
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const SkipCard = ({ skip, isSelected, onSelect }) => {
  return (
    <Card
      className={`bg-gray-800 text-white shadow-xl cursor-pointer ${
        isSelected ? "border-2 border-primary" : "border-2 border-transparent"
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex flex-col justify-between h-full relative">
        <div className="absolute top-9 right-8">
          <div className="flex justify-between items-center mb-2">
            <Badge variant={skip.allowed_on_road ? "default" : "destructive"}>
              {skip.allowed_on_road
                ? `${skip.size} Yards Skip`
                : "Not Allowed On The Road"}
            </Badge>
          </div>
        </div>
        <img
          src={skip.image}
          alt={skip.size}
          className="w-full h-40 object-cover rounded-lg"
        />

        <h2 className="text-lg font-semibold mt-6">{skip.size} Yards Skip</h2>
        <p className="text-sm text-gray-400">
          {skip.hire_period_days} day hire period
        </p>

        <div
          className={`flex w-full justify-between mt-10 px-2 py-2 rounded-lg ${
            isSelected ? "bg-primary" : "bg-neutral-700"
          }`}
        >
          <span className="text-lg text-primary-foreground">
            £{skip.price_before_vat}
          </span>
          <span
            className="text-lg"
            style={{
              color: isSelected
                ? "var(--primary-foreground)"
                : "var(--primary)",
            }}
          >
            {isSelected ? "Selected" : "Select Skip"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkipCard;
