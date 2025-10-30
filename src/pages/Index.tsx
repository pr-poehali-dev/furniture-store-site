import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  color: string;
  size: string;
  image: string;
  style: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Диван Модерн',
    category: 'Гостиная',
    price: 89990,
    material: 'Ткань',
    color: 'Фиолетовый',
    size: '220x90x80',
    image: 'https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/048f1eb2-f99a-4358-ad57-674cd84809b2.jpg',
    style: 'Современный'
  },
  {
    id: 2,
    name: 'Стол Лофт',
    category: 'Кухня',
    price: 45990,
    material: 'Дерево',
    color: 'Оранжевый',
    size: '180x90x75',
    image: 'https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/91796d78-fc4a-4d17-9a3e-ed1cd44f0c48.jpg',
    style: 'Лофт'
  },
  {
    id: 3,
    name: 'Шкаф Люкс',
    category: 'Спальня',
    price: 125990,
    material: 'МДФ',
    color: 'Фиолетовый',
    size: '200x60x220',
    image: 'https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/9108f2f3-effd-4d54-ab50-a82469e8673b.jpg',
    style: 'Современный'
  },
  {
    id: 4,
    name: 'Кресло Комфорт',
    category: 'Гостиная',
    price: 34990,
    material: 'Кожа',
    color: 'Оранжевый',
    size: '80x85x95',
    image: 'https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/048f1eb2-f99a-4358-ad57-674cd84809b2.jpg',
    style: 'Скандинавский'
  },
  {
    id: 5,
    name: 'Стеллаж Индастриал',
    category: 'Офис',
    price: 29990,
    material: 'Металл',
    color: 'Серый',
    size: '150x40x180',
    image: 'https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/91796d78-fc4a-4d17-9a3e-ed1cd44f0c48.jpg',
    style: 'Лофт'
  },
  {
    id: 6,
    name: 'Комод Минимал',
    category: 'Спальня',
    price: 52990,
    material: 'Дерево',
    color: 'Белый',
    size: '120x45x85',
    image: 'https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/9108f2f3-effd-4d54-ab50-a82469e8673b.jpg',
    style: 'Скандинавский'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
  };

  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const getCartProducts = () => {
    const productCounts = new Map<number, number>();
    cartItems.forEach(id => {
      productCounts.set(id, (productCounts.get(id) || 0) + 1);
    });
    return Array.from(productCounts.entries()).map(([id, count]) => ({
      product: products.find(p => p.id === id)!,
      count
    }));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, id) => {
      const product = products.find(p => p.id === id);
      return sum + (product?.price || 0);
    }, 0);
  };

  const materials = ['Дерево', 'Ткань', 'Кожа', 'МДФ', 'Металл'];
  const colors = ['Фиолетовый', 'Оранжевый', 'Серый', 'Белый', 'Черный'];
  const styles = ['Современный', 'Лофт', 'Скандинавский', 'Классический'];

  const filteredProducts = products.filter((product) => {
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(product.style);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const searchMatch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return materialMatch && colorMatch && styleMatch && priceMatch && searchMatch;
  });

  const handleCheckboxChange = (value: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 animate-fade-in">
              <Icon name="Sofa" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-primary">МебельДом</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {['home', 'catalog', 'about', 'delivery', 'portfolio', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О нас'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hidden md:flex"
                onClick={() => setIsCartOpen(true)}
              >
                <Icon name="ShoppingCart" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {cartItems.length}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col gap-3">
                {['home', 'catalog', 'about', 'delivery', 'portfolio', 'reviews', 'contacts'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left px-4 py-2 rounded-lg transition-colors hover:bg-muted ${
                      activeSection === section ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    {section === 'home' && 'Главная'}
                    {section === 'catalog' && 'Каталог'}
                    {section === 'about' && 'О нас'}
                    {section === 'delivery' && 'Доставка'}
                    {section === 'portfolio' && 'Портфолио'}
                    {section === 'reviews' && 'Отзывы'}
                    {section === 'contacts' && 'Контакты'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <Badge className="bg-secondary text-secondary-foreground">Новая коллекция 2024</Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Мебель вашей <span className="text-primary">мечты</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Создаем уникальные интерьеры с современной мебелью премиум класса. Качество, стиль и комфорт в каждом изделии.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection('catalog')} className="gap-2">
                  Смотреть каталог <Icon name="ArrowRight" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')}>
                  Связаться с нами
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/048f1eb2-f99a-4358-ad57-674cd84809b2.jpg"
                alt="Hero"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Каталог мебели</h2>
            <p className="text-muted-foreground text-lg">Подберите идеальную мебель с удобными фильтрами</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Sliders" size={20} className="text-primary" />
                      Фильтры
                    </h3>
                    <Separator className="mb-4" />
                  </div>

                  <Accordion type="single" collapsible defaultValue="material" className="w-full">
                    <AccordionItem value="material">
                      <AccordionTrigger className="text-sm font-medium">Материал</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {materials.map((material) => (
                            <div key={material} className="flex items-center gap-2">
                              <Checkbox
                                id={material}
                                checked={selectedMaterials.includes(material)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(material, selectedMaterials, setSelectedMaterials)
                                }
                              />
                              <label htmlFor={material} className="text-sm cursor-pointer">
                                {material}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="color">
                      <AccordionTrigger className="text-sm font-medium">Цвет</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {colors.map((color) => (
                            <div key={color} className="flex items-center gap-2">
                              <Checkbox
                                id={color}
                                checked={selectedColors.includes(color)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(color, selectedColors, setSelectedColors)
                                }
                              />
                              <label htmlFor={color} className="text-sm cursor-pointer">
                                {color}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="style">
                      <AccordionTrigger className="text-sm font-medium">Стиль</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {styles.map((style) => (
                            <div key={style} className="flex items-center gap-2">
                              <Checkbox
                                id={style}
                                checked={selectedStyles.includes(style)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(style, selectedStyles, setSelectedStyles)
                                }
                              />
                              <label htmlFor={style} className="text-sm cursor-pointer">
                                {style}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price">
                      <AccordionTrigger className="text-sm font-medium">Цена</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <Slider
                            min={0}
                            max={150000}
                            step={5000}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{priceRange[0].toLocaleString()} ₽</span>
                            <span>{priceRange[1].toLocaleString()} ₽</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedMaterials([]);
                      setSelectedColors([]);
                      setSelectedStyles([]);
                      setPriceRange([0, 150000]);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск по названию товара..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
                  {searchQuery && (
                    <p className="text-sm text-primary">Поиск: "{searchQuery}"</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 animate-scale-in overflow-hidden cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                        {product.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{product.style}</Badge>
                        <Badge variant="outline" className="text-xs">{product.material}</Badge>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <Button size="sm" className="gap-2" onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}>
                          <Icon name="ShoppingCart" size={16} />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">О нашей компании</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  МебельДом — ведущий производитель современной мебели с более чем 15-летним опытом на рынке. 
                  Мы создаем интерьерные решения, которые сочетают стиль, комфорт и функциональность.
                </p>
                <p>
                  Наша миссия — делать качественную дизайнерскую мебель доступной для каждого. 
                  Мы работаем только с проверенными материалами и используем современные технологии производства.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm">лет на рынке</div>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-2">5000+</div>
                    <div className="text-sm">довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/6d3554ca-aa9d-4a18-9770-3499eab06fb8/files/91796d78-fc4a-4d17-9a3e-ed1cd44f0c48.jpg"
                alt="О нас"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Доставка и оплата</h2>
            <p className="text-muted-foreground text-lg">Быстро, удобно и надежно</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'Truck',
                title: 'Быстрая доставка',
                desc: 'Доставим мебель по Москве за 1-2 дня. По России — 5-7 дней.',
              },
              {
                icon: 'Shield',
                title: 'Гарантия качества',
                desc: 'На всю мебель предоставляем гарантию 2 года.',
              },
              {
                icon: 'CreditCard',
                title: 'Удобная оплата',
                desc: 'Наличные, карта, безналичный расчет или рассрочка.',
              },
            ].map((item, index) => (
              <Card
                key={item.title}
                className="text-center hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={item.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши проекты</h2>
            <p className="text-muted-foreground text-lg">Реализованные интерьеры наших клиентов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              products[0].image,
              products[1].image,
              products[2].image,
            ].map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={image}
                  alt={`Проект ${index + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-semibold text-xl mb-2">Проект {index + 1}</h3>
                    <p className="text-sm">Современный интерьер</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">Что говорят о нас наши клиенты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Анна Петрова',
                text: 'Заказывали диван и кресла для гостиной. Качество превосходное! Доставка точно в срок. Очень довольны.',
                rating: 5,
              },
              {
                name: 'Дмитрий Соколов',
                text: 'Отличный выбор мебели и приятные цены. Консультанты помогли подобрать идеальный вариант для нашей квартиры.',
                rating: 5,
              },
              {
                name: 'Елена Краснова',
                text: 'Купили комплект для спальни. Мебель красивая, качественная. Сборка быстрая. Рекомендую!',
                rating: 5,
              },
            ].map((review, index) => (
              <Card
                key={review.name}
                className="hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">{review.text}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">Покупатель</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-muted-foreground text-lg">Свяжитесь с нами удобным способом</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="animate-fade-in">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">info@mebeldom.ru</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Вс: 10:00 - 20:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Напишите нам</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input
                      type="email"
                      placeholder="ivan@example.com"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Ваше сообщение..."
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Icon name="Send" size={18} />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sofa" size={28} className="text-primary" />
                <span className="text-xl font-bold">МебельДом</span>
              </div>
              <p className="text-sm opacity-80">
                Создаем мебель вашей мечты с 2009 года
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Гостиная</li>
                <li>Спальня</li>
                <li>Кухня</li>
                <li>Офис</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Гарантия</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+7 (495) 123-45-67</li>
                <li>info@mebeldom.ru</li>
                <li>Москва, ул. Примерная, 123</li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8 opacity-20" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© 2024 МебельДом. Все права защищены.</p>
            <div className="flex gap-4">
              <button className="hover:text-primary transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-primary transition-colors">Пользовательское соглашение</button>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
                <DialogDescription>Подробная информация о товаре</DialogDescription>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      {selectedProduct.category}
                    </Badge>
                    <Badge variant="outline">{selectedProduct.style}</Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {selectedProduct.price.toLocaleString()} ₽
                    </div>
                    <p className="text-muted-foreground">
                      Цена указана за единицу товара
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Характеристики</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Материал</p>
                        <p className="font-medium">{selectedProduct.material}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Цвет</p>
                        <p className="font-medium">{selectedProduct.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Размеры (ДxШxВ)</p>
                        <p className="font-medium">{selectedProduct.size} см</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Стиль</p>
                        <p className="font-medium">{selectedProduct.style}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Описание</h3>
                    <p className="text-muted-foreground">
                      Высококачественная мебель от ведущего производителя. 
                      Изделие изготовлено из натуральных материалов с применением 
                      современных технологий. Гарантия 2 года.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Truck" size={18} className="text-primary" />
                      <span>Бесплатная доставка по Москве</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Shield" size={18} className="text-primary" />
                      <span>Гарантия 2 года</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Wrench" size={18} className="text-primary" />
                      <span>Бесплатная сборка</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 gap-2" 
                      size="lg"
                      onClick={() => {
                        addToCart(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                    >
                      <Icon name="ShoppingCart" size={20} />
                      В корзину
                    </Button>
                    <Button variant="outline" size="lg">
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Icon name="ShoppingCart" size={28} className="text-primary" />
              Корзина
            </DialogTitle>
            <DialogDescription>
              {cartItems.length === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cartItems.length}`}
            </DialogDescription>
          </DialogHeader>

          {cartItems.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Добавьте товары из каталога</p>
              <Button onClick={() => {
                setIsCartOpen(false);
                scrollToSection('catalog');
              }}>
                Перейти в каталог
              </Button>
            </div>
          ) : (
            <div className="space-y-6 mt-4">
              <div className="space-y-4">
                {getCartProducts().map(({ product, count }, idx) => (
                  <Card key={`${product.id}-${idx}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const index = cartItems.indexOf(product.id);
                                if (index !== -1) removeFromCart(index);
                              }}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  const index = cartItems.indexOf(product.id);
                                  if (index !== -1) removeFromCart(index);
                                }}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="font-medium w-8 text-center">{count}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => addToCart(product.id)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-primary">
                                {(product.price * count).toLocaleString()} ₽
                              </p>
                              {count > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  {product.price.toLocaleString()} ₽ × {count}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Количество товаров:</span>
                  <span className="font-semibold">{cartItems.length} шт.</span>
                </div>
                <div className="flex justify-between text-2xl font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{getTotalPrice().toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full gap-2" size="lg">
                  <Icon name="CreditCard" size={20} />
                  Оформить заказ
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  Продолжить покупки
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;