import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  onAuthSuccess: (user: { name: string; role: 'buyer' | 'seller' }) => void;
}

const Auth = ({ onAuthSuccess }: AuthProps) => {
  const { toast } = useToast();
  const [buyerForm, setBuyerForm] = useState({ firstName: '', lastName: '' });
  const [sellerForm, setSellerForm] = useState({ firstName: '', lastName: '', code: '' });

  const handleBuyerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerForm.firstName || !buyerForm.lastName) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }
    
    onAuthSuccess({ 
      name: `${buyerForm.firstName} ${buyerForm.lastName}`, 
      role: 'buyer' 
    });
    toast({
      title: 'Добро пожаловать! 🎉',
      description: 'Вы успешно зарегистрировались как покупатель'
    });
  };

  const handleSellerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerForm.firstName || !sellerForm.lastName || !sellerForm.code) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    if (sellerForm.code !== 'EasyLife') {
      toast({
        title: 'Неверный код',
        description: 'Проверьте правильность введенного кода доступа',
        variant: 'destructive'
      });
      return;
    }

    onAuthSuccess({ 
      name: `${sellerForm.firstName} ${sellerForm.lastName}`, 
      role: 'seller' 
    });
    toast({
      title: 'Поздравляем! 🚀',
      description: 'Вы получили доступ к инструментам продавца'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 gradient-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 gradient-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/80 backdrop-blur animate-scale-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Icon name="Zap" className="text-white" size={28} />
            </div>
            <span className="text-3xl font-heading font-bold gradient-text">EasyLife</span>
          </div>
          <CardTitle className="text-2xl font-heading">Регистрация</CardTitle>
          <CardDescription>
            Создайте аккаунт для покупок или станьте продавцом
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="buyer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="buyer" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                Покупатель
              </TabsTrigger>
              <TabsTrigger value="seller" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
                <Icon name="Store" size={18} className="mr-2" />
                Продавец
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buyer">
              <form onSubmit={handleBuyerRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-firstname">Имя</Label>
                  <Input
                    id="buyer-firstname"
                    placeholder="Введите ваше имя"
                    value={buyerForm.firstName}
                    onChange={(e) => setBuyerForm({ ...buyerForm, firstName: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-lastname">Фамилия</Label>
                  <Input
                    id="buyer-lastname"
                    placeholder="Введите вашу фамилию"
                    value={buyerForm.lastName}
                    onChange={(e) => setBuyerForm({ ...buyerForm, lastName: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary border-0 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Зарегистрироваться
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="seller">
              <form onSubmit={handleSellerRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seller-firstname">Имя</Label>
                  <Input
                    id="seller-firstname"
                    placeholder="Введите ваше имя"
                    value={sellerForm.firstName}
                    onChange={(e) => setSellerForm({ ...sellerForm, firstName: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seller-lastname">Фамилия</Label>
                  <Input
                    id="seller-lastname"
                    placeholder="Введите вашу фамилию"
                    value={sellerForm.lastName}
                    onChange={(e) => setSellerForm({ ...sellerForm, lastName: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seller-code">Код доступа продавца</Label>
                  <Input
                    id="seller-code"
                    type="password"
                    placeholder="Введите код EasyLife"
                    value={sellerForm.code}
                    onChange={(e) => setSellerForm({ ...sellerForm, code: e.target.value })}
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Для получения доступа введите специальный код
                  </p>
                </div>

                <Button type="submit" className="w-full gradient-secondary border-0 shadow-lg shadow-secondary/30 hover:scale-105 transition-transform">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Стать продавцом
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
