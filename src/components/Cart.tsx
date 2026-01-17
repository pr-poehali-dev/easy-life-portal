import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: (deliveryInfo: DeliveryInfo) => void;
}

interface DeliveryInfo {
  address: string;
  phone: string;
  comment: string;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const { toast } = useToast();
  const [isCheckout, setIsCheckout] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: '',
    phone: '',
    comment: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = total > 0 ? 300 : 0;
  const finalTotal = total + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryInfo.address || !deliveryInfo.phone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните адрес доставки и телефон',
        variant: 'destructive'
      });
      return;
    }

    onCheckout(deliveryInfo);
    toast({
      title: 'Заказ оформлен! 🎉',
      description: 'Продавец получил ваш заказ и скоро свяжется с вами'
    });
    setIsCheckout(false);
    setDeliveryInfo({ address: '', phone: '', comment: '' });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-24 h-24 rounded-full gradient-primary/10 flex items-center justify-center mb-6">
          <Icon name="ShoppingCart" size={48} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
        <Button className="gradient-primary border-0">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          К покупкам
        </Button>
      </div>
    );
  }

  if (isCheckout) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Button
          variant="ghost"
          onClick={() => setIsCheckout(false)}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к корзине
        </Button>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-2">Оформление заказа</h2>
              <p className="text-muted-foreground">Заполните данные для доставки</p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input
                  id="address"
                  placeholder="Улица, дом, квартира"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Input
                  id="comment"
                  placeholder="Пожелания по доставке"
                  value={deliveryInfo.comment}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, comment: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({items.length})</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{deliveryFee.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-heading font-bold">
                  <span>Итого</span>
                  <span className="gradient-text">{finalTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <Button type="submit" className="w-full gradient-primary border-0 shadow-lg shadow-primary/30 text-lg py-6">
                <Icon name="Check" size={24} className="mr-2" />
                Подтвердить заказ
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Корзина</h2>
        <span className="text-muted-foreground">{items.length} товаров</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden border-border/50 bg-card/50 backdrop-blur animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-heading font-semibold text-lg">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={20} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8"
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-heading font-bold gradient-text">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-heading font-bold">Итого</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{deliveryFee.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-heading font-bold">
                  <span>Всего</span>
                  <span className="gradient-text">{finalTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <Button
                onClick={() => setIsCheckout(true)}
                className="w-full gradient-primary border-0 shadow-lg shadow-primary/30 text-lg py-6"
              >
                <Icon name="CreditCard" size={24} className="mr-2" />
                Оформить заказ
              </Button>

              <div className="space-y-2 pt-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="QrCode" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Каждый товар имеет уникальный QR-код для отслеживания</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="Shield" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Гарантия возврата в течение 14 дней</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
