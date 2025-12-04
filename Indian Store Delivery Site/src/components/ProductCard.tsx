import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative bg-gray-100">
        <ImageWithFallback 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white px-4 py-2 bg-red-600 rounded">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600">₹{product.price}</p>
            <p className="text-sm text-gray-500">{product.unit}</p>
          </div>
          {product.inStock && (
            <div>
              {quantity === 0 ? (
                <Button onClick={onAdd} size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <ShoppingCart className="size-4 mr-1" />
                  Add
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button onClick={onRemove} size="icon" variant="outline" className="size-8">
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button onClick={onAdd} size="icon" className="size-8 bg-orange-600 hover:bg-orange-700">
                    <Plus className="size-3" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
