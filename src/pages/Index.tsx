import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Auth from './Auth';
import Catalog from '@/components/Catalog';
import Cart from '@/components/Cart';

type Page = 'home' | 'catalog' | 'cart' | 'sellers' | 'orders' | 'profile';

interface User {
  name: string;
  role: 'buyer' | 'seller';
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const navItems = [
    { id: 'home' as Page, label: 'Главная', icon: 'Home' },
    { id: 'catalog' as Page, label: 'Каталог', icon: 'Grid3x3' },
    { id: 'cart' as Page, label: 'Корзина', icon: 'ShoppingCart' },
    { id: 'sellers' as Page, label: 'Продавцы', icon: 'Store' },
    { id: 'orders' as Page, label: 'Заказы', icon: 'Package' },
    { id: 'profile' as Page, label: 'Профиль', icon: 'User' }
  ];

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setCart([]);
    setCurrentPage('orders');
  };

  if (!user) {
    return <Auth onAuthSuccess={setUser} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-float">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-heading font-bold gradient-text">EasyLife</span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'gradient-primary text-white shadow-lg shadow-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'cart' && cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 gradient-secondary">
                      {cart.length}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {user.role === 'seller' ? 'Продавец' : 'Покупатель'}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setUser(null)}
                className="rounded-full"
              >
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'catalog' && <Catalog onAddToCart={handleAddToCart} />}
        
        {currentPage === 'cart' && (
          <Cart
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        )}

        {currentPage === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="text-center py-12">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                Добро пожаловать, <span className="gradient-text">{user.name.split(' ')[0]}</span>!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {user.role === 'seller' 
                  ? 'Управляйте своими товарами и заказами'
                  : 'Начните покупки в нашем каталоге'}
              </p>
              <Button
                size="lg"
                onClick={() => setCurrentPage(user.role === 'seller' ? 'orders' : 'catalog')}
                className="gradient-primary border-0 shadow-2xl shadow-primary/40 hover:scale-105 transition-all text-lg px-8 py-6"
              >
                <Icon name={user.role === 'seller' ? 'Package' : 'ShoppingBag'} size={24} className="mr-2" />
                {user.role === 'seller' ? 'Мои заказы' : 'Начать покупки'}
              </Button>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center space-y-3 hover:shadow-xl hover:shadow-primary/10 transition-all animate-scale-in">
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center">
                  <Icon name="QrCode" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold">QR-отслеживание</h3>
                <p className="text-muted-foreground">Уникальный код для каждого товара</p>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center space-y-3 hover:shadow-xl hover:shadow-primary/10 transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-secondary flex items-center justify-center">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold">Быстрая доставка</h3>
                <p className="text-muted-foreground">Точные сроки на каждом этапе</p>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center space-y-3 hover:shadow-xl hover:shadow-primary/10 transition-all animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center">
                  <Icon name="Shield" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold">Защита покупателя</h3>
                <p className="text-muted-foreground">Гарантия возврата 14 дней</p>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'orders' && (
          <div className="text-center py-12 animate-fade-in">
            <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-3xl font-heading font-bold mb-4">Заказы</h2>
            <p className="text-muted-foreground mb-6">
              {user.role === 'seller' 
                ? 'Здесь будут отображаться заказы от покупателей'
                : 'У вас пока нет оформленных заказов'}
            </p>
          </div>
        )}

        {currentPage === 'sellers' && (
          <div className="text-center py-12 animate-fade-in">
            <Icon name="Store" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-3xl font-heading font-bold mb-4">Продавцы</h2>
            <p className="text-muted-foreground">Список проверенных продавцов маркетплейса</p>
          </div>
        )}

        {currentPage === 'profile' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                  <Icon name="User" size={48} className="text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{user.name}</h2>
                <Badge className={user.role === 'seller' ? 'gradient-secondary' : 'gradient-primary'}>
                  {user.role === 'seller' ? 'Продавец' : 'Покупатель'}
                </Badge>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-background/50">
                  <span className="text-muted-foreground">Заказов оформлено</span>
                  <span className="font-heading font-bold">0</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-background/50">
                  <span className="text-muted-foreground">В корзине</span>
                  <span className="font-heading font-bold">{cart.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-card/90 border-t border-border/50">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                currentPage === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={24} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.id === 'cart' && cart.length > 0 && (
                <Badge className="absolute -top-1 right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] gradient-secondary border-0">
                  {cart.length}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Index;
