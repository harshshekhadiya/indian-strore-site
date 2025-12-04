import { ShoppingCart, Search, Menu, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="bg-orange-600 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="size-4" />
            <span>Order Hotline: +91 123456789</span>
          </div>
          <span>Free Delivery on Orders Above ₹500</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
            <h1 className="text-orange-600">🛒 IndianBazar</h1>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input 
                placeholder="Search for products..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="relative gap-2"
            onClick={onCartClick}
          >
            <ShoppingCart className="size-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 bg-orange-600">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
        
        <div className="flex md:hidden mt-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search for products..." 
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
}