import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onConfirm: (details: DeliveryDetails) => void;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  notes: string;
}

export function CheckoutDialog({ isOpen, onClose, total, onConfirm }: CheckoutDialogProps) {
  const [details, setDetails] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(details);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name"
              required
              value={details.name}
              onChange={(e) => setDetails({...details, name: e.target.value})}
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input 
              id="phone"
              type="tel"
              required
              value={details.phone}
              onChange={(e) => setDetails({...details, phone: e.target.value})}
              placeholder="+91 98765 43210"
            />
          </div>
          
          <div>
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea 
              id="address"
              required
              value={details.address}
              onChange={(e) => setDetails({...details, address: e.target.value})}
              placeholder="Enter your complete address"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input 
              id="pincode"
              required
              value={details.pincode}
              onChange={(e) => setDetails({...details, pincode: e.target.value})}
              placeholder="Enter pincode"
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Delivery Notes (Optional)</Label>
            <Textarea 
              id="notes"
              value={details.notes}
              onChange={(e) => setDetails({...details, notes: e.target.value})}
              placeholder="Any special instructions"
              rows={2}
            />
          </div>
          
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500">Payment: Cash on Delivery</p>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
              Confirm Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
