// UI Imports
import { Button } from "../ui/button";

const BottomBar = ({ selectedSkip }) => {
  const { size, price_before_vat, days } = selectedSkip;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#222] px-4 py-4 sm:px-8 ">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between z-50 max-w-[1360px] mx-auto">
        <div className="flex items-baseline text-white text-base font-medium w-full xxs:justify-between sm:justify-start sm:gap-4 ">
          <span>{size} Skip</span>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold text-xl sm:text-2xl">
              £{price_before_vat}
            </span>
            <span className="text-gray-300 text-sm font-normal">
              {days} days
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="w-1/2 sm:w-auto">
            Back
          </Button>
          <Button className="flex items-center gap-2 w-1/2 sm:w-auto">
            Continue{" "}
            <span aria-hidden className="xxs:hidden sm:block">
              →
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
