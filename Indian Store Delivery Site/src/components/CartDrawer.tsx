import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Product } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity,
  onCheckout 
}: CartDrawerProps) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = total >= 500 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cartItems.length} items)</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <Button onClick={onClose} variant="outline">Continue Shopping</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b pb-4">
                    <ImageWithFallback 
                      src={item.product.image}
                      alt={item.product.name}
                      className="size-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="mb-1">{item.product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{item.product.unit}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-orange-600">₹{item.product.price}</p>
                        <div className="flex items-center gap-2">
                          <Button 
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} 
                            size="icon" 
                            variant="outline" 
                            className="size-7"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="size-3" />
                            ) : (
                              <Minus className="size-3" />
                            )}
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} 
                            size="icon" 
                            className="size-7 bg-orange-600 hover:bg-orange-700"
                          >
                            <Plus className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {total < 500 && (
                <p className="text-sm text-gray-500">
                  Add ₹{(500 - total).toFixed(2)} more for free delivery
                </p>
              )}
              <div className="flex justify-between pt-3 border-t">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
              <Button 
                onClick={onCheckout} 
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
