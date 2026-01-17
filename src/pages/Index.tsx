import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Page = 'home' | 'catalog' | 'cart' | 'sellers' | 'orders' | 'profile';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartCount] = useState(3);

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Электроника',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Smart Watch Ultra',
      price: 24990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Гаджеты',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Designer Sneakers',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Обувь',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Premium Backpack',
      price: 5490,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      category: 'Аксессуары',
      rating: 4.6
    }
  ];

  const navItems = [
    { id: 'home' as Page, label: 'Главная', icon: 'Home' },
    { id: 'catalog' as Page, label: 'Каталог', icon: 'Grid3x3' },
    { id: 'cart' as Page, label: 'Корзина', icon: 'ShoppingCart' },
    { id: 'sellers' as Page, label: 'Продавцы', icon: 'Store' },
    { id: 'orders' as Page, label: 'Заказы', icon: 'Package' },
    { id: 'profile' as Page, label: 'Профиль', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-float">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-heading font-bold gradient-text">EasyLife</span>
            </div>

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
                  {item.id === 'cart' && cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 gradient-secondary">
                      {cartCount}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>

            <Button size="lg" className="hidden md:flex gradient-primary border-0 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Стать продавцом
            </Button>
          </div>
        </div>
      </header>

      {currentPage === 'home' && (
        <main>
          <section className="relative overflow-hidden py-20 md:py-32">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 gradient-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
                <Badge className="gradient-secondary border-0 text-white px-6 py-2 text-sm font-medium">
                  <Icon name="Rocket" size={16} className="mr-2" />
                  Новый уровень онлайн-шопинга
                </Badge>

                <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                  Покупай и продавай{' '}
                  <span className="gradient-text">легко и стильно</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Маркетплейс нового поколения с уникальной QR-системой отслеживания и молниеносной доставкой
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" className="gradient-primary border-0 shadow-2xl shadow-primary/40 hover:scale-105 transition-all text-lg px-8 py-6">
                    <Icon name="ShoppingBag" size={24} className="mr-2" />
                    Начать покупки
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 hover:gradient-primary hover:text-white hover:border-transparent transition-all text-lg px-8 py-6">
                    <Icon name="Play" size={24} className="mr-2" />
                    Как это работает
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
                  <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="text-4xl font-heading font-bold gradient-text">10K+</div>
                    <div className="text-sm text-muted-foreground mt-1">Товаров</div>
                  </div>
                  <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="text-4xl font-heading font-bold gradient-text">5K+</div>
                    <div className="text-sm text-muted-foreground mt-1">Продавцов</div>
                  </div>
                  <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <div className="text-4xl font-heading font-bold gradient-text">50K+</div>
                    <div className="text-sm text-muted-foreground mt-1">Покупателей</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  Популярные товары
                </h2>
                <p className="text-lg text-muted-foreground">
                  Самые горячие предложения этой недели
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
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

                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">(128)</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-heading font-bold gradient-text">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                          <Button size="icon" className="gradient-primary border-0 shadow-lg shadow-primary/30 hover:scale-110 transition-transform">
                            <Icon name="ShoppingCart" size={20} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="border-2 hover:gradient-primary hover:text-white hover:border-transparent transition-all">
                  Смотреть все товары
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: 'QrCode',
                    title: 'QR-отслеживание',
                    description: 'Каждый товар с уникальным QR-кодом для максимальной безопасности'
                  },
                  {
                    icon: 'Zap',
                    title: 'Быстрая доставка',
                    description: 'Точные сроки доставки и уведомления на каждом этапе'
                  },
                  {
                    icon: 'Shield',
                    title: 'Защита покупателя',
                    description: 'Гарантия возврата и проверка подлинности каждого товара'
                  }
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="text-center p-8 border-border/50 bg-card/50 backdrop-blur hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                      <Icon name={feature.icon} size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

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
              {item.id === 'cart' && cartCount > 0 && (
                <Badge className="absolute -top-1 right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] gradient-secondary border-0">
                  {cartCount}
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
