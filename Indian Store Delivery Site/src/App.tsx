import { useState } from "react";
import { Header } from "./components/Header";
import { CategoryCard } from "./components/CategoryCard";
import { ProductCard, Product } from "./components/ProductCard";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutDialog, DeliveryDetails } from "./components/CheckoutDialog";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Truck, Shield, Clock, HeadphonesIcon } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Basmati Rice",
    category: "Grains & Rice",
    price: 180,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNtYXRpJTIwcmljZXxlbnwxfHx8fDE3NjQ1OTg0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "2",
    name: "Turmeric Powder",
    category: "Spices",
    price: 120,
    unit: "200g",
    image: "https://images.unsplash.com/photo-1698556735172-1b5b3cd9d2ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHNwaWNlfGVufDF8fHx8MTc2NDU5MzI2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "3",
    name: "Garam Masala",
    category: "Spices",
    price: 95,
    unit: "100g",
    image: "https://images.unsplash.com/photo-1723155182094-af2f63472d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY0NTcwNTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "4",
    name: "Samosa Pack",
    category: "Snacks",
    price: 60,
    unit: "6 pieces",
    image: "https://images.unsplash.com/photo-1589301773859-bb024d3ad558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3N8ZW58MXx8fHwxNzY0NjYxMjg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "5",
    name: "Chana Dal",
    category: "Grains & Rice",
    price: 140,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1763368403529-0b8d9108cf9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwaW5ncmVkaWVudHN8ZW58MXx8fHwxNzY0NjYxMjg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "6",
    name: "Red Chili Powder",
    category: "Spices",
    price: 85,
    unit: "200g",
    image: "https://images.unsplash.com/photo-1723155182094-af2f63472d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY0NTcwNTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "7",
    name: "Whole Wheat Flour",
    category: "Grains & Rice",
    price: 55,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNtYXRpJTIwcmljZXxlbnwxfHx8fDE3NjQ1OTg0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "8",
    name: "Cumin Seeds",
    category: "Spices",
    price: 110,
    unit: "100g",
    image: "https://images.unsplash.com/photo-1723155182094-af2f63472d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY0NTcwNTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: false,
  },
  {
    id: "9",
    name: "Ghee",
    category: "Dairy",
    price: 550,
    unit: "500ml",
    image: "https://images.unsplash.com/photo-1739066598279-1297113f5c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY0NjYxMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "10",
    name: "Paneer",
    category: "Dairy",
    price: 90,
    unit: "200g",
    image: "https://images.unsplash.com/photo-1739066598279-1297113f5c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY0NjYxMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "11",
    name: "Papad",
    category: "Snacks",
    price: 45,
    unit: "200g",
    image: "https://images.unsplash.com/photo-1589301773859-bb024d3ad558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3N8ZW58MXx8fHwxNzY0NjYxMjg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
  {
    id: "12",
    name: "Pickle Mixed",
    category: "Condiments",
    price: 150,
    unit: "400g",
    image: "https://images.unsplash.com/photo-1739066598279-1297113f5c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY0NjYxMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
];

const CATEGORIES = [
  { title: "Grains & Rice", icon: "🌾", itemCount: "25+ items" },
  { title: "Spices", icon: "🌶️", itemCount: "40+ items" },
  { title: "Snacks", icon: "🥟", itemCount: "30+ items" },
  { title: "Dairy", icon: "🥛", itemCount: "15+ items" },
  { title: "Condiments", icon: "🍯", itemCount: "20+ items" },
  { title: "Beverages", icon: "☕", itemCount: "25+ items" },
];

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const updateCart = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: quantity });
    }
  };

  const cartItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  
  const cartItems = Object.entries(cart).map(([productId, quantity]) => ({
    product: PRODUCTS.find(p => p.id === productId)!,
    quantity,
  }));

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = total >= 500 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (details: DeliveryDetails) => {
    const orderNum = `ORD${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setIsCheckoutOpen(false);
    setIsOrderConfirmed(true);
    setCart({});
  };

  const handleOrderConfirmClose = () => {
    setIsOrderConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="mb-4">Fresh Indian Groceries Delivered to Your Home</h1>
              <p className="mb-6">
                Authentic spices, grains, snacks and more. Order now and get free delivery on orders above ₹500!
              </p>
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
              </Button>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1739066598279-1297113f5c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY0NjYxMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Indian Grocery Store"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Truck className="size-12 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Same day delivery available</p>
            </div>
            <div className="text-center">
              <Shield className="size-12 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-1">Quality Assured</h3>
              <p className="text-sm text-gray-600">100% authentic products</p>
            </div>
            <div className="text-center">
              <Clock className="size-12 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-1">24/7 Service</h3>
              <p className="text-sm text-gray-600">Order anytime</p>
            </div>
            <div className="text-center">
              <HeadphonesIcon className="size-12 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-1">Customer Support</h3>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
              onClick={() => {
                setSelectedCategory(category.title);
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2>Products</h2>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="hidden md:flex">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Grains & Rice">Grains</TabsTrigger>
                <TabsTrigger value="Spices">Spices</TabsTrigger>
                <TabsTrigger value="Snacks">Snacks</TabsTrigger>
                <TabsTrigger value="Dairy">Dairy</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] || 0}
                  onAdd={() => updateCart(product.id, (cart[product.id] || 0) + 1)}
                  onRemove={() => updateCart(product.id, (cart[product.id] || 0) - 1)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">🛒 IndianBazar</h3>
              <p className="text-gray-400">
                Your trusted source for authentic Indian groceries delivered fresh to your home.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Spices</a></li>
                <li><a href="#" className="hover:text-white">Grains & Rice</a></li>
                <li><a href="#" className="hover:text-white">Snacks</a></li>
                <li><a href="#" className="hover:text-white">Dairy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+91 98765 43210</li>
                <li>info@indianbazar.com</li>
                <li>Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IndianBazar. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCart}
        onCheckout={handleCheckout}
      />

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={finalTotal}
        onConfirm={handleConfirmOrder}
      />

      <OrderConfirmation
        isOpen={isOrderConfirmed}
        onClose={handleOrderConfirmClose}
        orderNumber={orderNumber}
      />
    </div>
  );
}
