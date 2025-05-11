
// UI Imports
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";


const Filters = ({ filter, setFilter, sort, setSort }) => {
    return (
      <div className="flex justify-center gap-4 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-gray-800 text-white">{filter}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setFilter("All Sizes")}>All Sizes</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilter("Greater than 4 Yard")}>Greater than 4 Yard</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilter("Greater than 6 Yard")}> Greater than 6 Yard</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilter("Greater than 10 Yard")}> Greater than 10 Yard</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-gray-800 text-white">Sort by {sort}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSort("Price")}>Price</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSort("Size")}>Size</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  export default Filters;