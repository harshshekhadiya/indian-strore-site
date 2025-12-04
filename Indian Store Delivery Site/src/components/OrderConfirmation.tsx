import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export function OrderConfirmation({ isOpen, onClose, orderNumber }: OrderConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order Confirmed!</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <CheckCircle className="size-16 text-green-600 mx-auto mb-4" />
          <h3 className="mb-2">Thank You for Your Order!</h3>
          <p className="text-gray-600 mb-4">
            Your order has been successfully placed and will be delivered to your doorstep soon.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-orange-600">{orderNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            We will call you shortly to confirm your delivery time.
          </p>
          <Button 
            onClick={onClose} 
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
