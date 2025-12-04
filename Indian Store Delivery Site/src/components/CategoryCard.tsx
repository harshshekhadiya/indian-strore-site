import { Card } from "./ui/card";

interface CategoryCardProps {
  title: string;
  icon: string;
  itemCount: string;
  onClick: () => void;
}

export function CategoryCard({ title, icon, itemCount, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow text-center"
      onClick={onClick}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="mb-1">{title}</h3>
      <p className="text-gray-500">{itemCount}</p>
    </Card>
  );
}
