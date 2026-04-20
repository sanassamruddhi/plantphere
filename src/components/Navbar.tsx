import { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, User, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ activePage, setActivePage, cartCount, isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Explore', id: 'explore' },
    { name: 'Stores', id: 'stores' },
    { name: 'Community', id: 'community' },
    { name: 'Dashboard', id: 'dashboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActivePage('home')}>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20"
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">
              Plant<span className="text-gradient">Sphere</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                  activePage === item.id ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {item.name}
                {activePage === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center glass-card rounded-2xl px-4 py-2 border-white/5">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-24 focus:w-40 transition-all duration-500"
              />
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-xl hover:bg-primary/10 hover:text-primary"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-primary/10 hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-primary/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-xl hover:bg-primary/10 hover:text-primary">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger className="p-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                  <Menu className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent side="right" className="glass border-l border-white/10">
                  <div className="flex flex-col space-y-6 mt-12">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`text-xl font-bold text-left transition-colors ${
                          activePage === item.id ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                    <Button className="btn-primary w-full">Get Started</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
