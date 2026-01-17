import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

const Catalog = ({ onAddToCart }: CatalogProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Электроника',
      rating: 4.8,
      description: 'Премиальные беспроводные наушники с активным шумоподавлением'
    },
    {
      id: 2,
      name: 'Smart Watch Ultra',
      price: 24990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Гаджеты',
      rating: 4.9,
      description: 'Умные часы с множеством функций для здоровья и фитнеса'
    },
    {
      id: 3,
      name: 'Designer Sneakers',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Обувь',
      rating: 4.7,
      description: 'Стильные дизайнерские кроссовки для повседневной носки'
    },
    {
      id: 4,
      name: 'Premium Backpack',
      price: 5490,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      category: 'Аксессуары',
      rating: 4.6,
      description: 'Вместительный рюкзак из качественных материалов'
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      price: 6990,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      category: 'Электроника',
      rating: 4.5,
      description: 'Портативная колонка с мощным звуком и долгой работой'
    },
    {
      id: 6,
      name: 'Laptop Stand',
      price: 3490,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      category: 'Аксессуары',
      rating: 4.4,
      description: 'Эргономичная подставка для ноутбука'
    },
    {
      id: 7,
      name: 'Fitness Tracker',
      price: 4990,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
      category: 'Гаджеты',
      rating: 4.3,
      description: 'Фитнес-браслет для отслеживания активности'
    },
    {
      id: 8,
      name: 'Sunglasses Classic',
      price: 2990,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
      category: 'Аксессуары',
      rating: 4.2,
      description: 'Классические солнцезащитные очки'
    }
  ];

  const categories = ['Все', ...Array.from(new Set(allProducts.map(p => p.category)))];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: 'Добавлено в корзину! 🛒',
      description: product.name
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border/50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'gradient-primary border-0' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <Card
            key={product.id}
            className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="gradient-secondary border-0 text-white">
                    {product.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="rounded-full gradient-primary border-0 shadow-lg">
                    <Icon name="Heart" size={20} />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-heading font-semibold text-lg line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">(128)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-heading font-bold gradient-text">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </div>
                  <Button 
                    size="icon" 
                    onClick={() => handleAddToCart(product)}
                    className="gradient-primary border-0 shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
                  >
                    <Icon name="ShoppingCart" size={20} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-heading font-semibold mb-2">Товары не найдены</h3>
          <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
