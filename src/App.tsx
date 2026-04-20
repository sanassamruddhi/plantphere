import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Explore from './components/Explore';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import Stores from './components/Stores';
import PlantDetail from './components/PlantDetail';
import PlantQuiz from './components/PlantQuiz';
import Preloader from './components/Preloader';
import { Plant } from './types';
import { PLANTS } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ArrowRight, Instagram, Twitter, Facebook, Mail, CheckCircle2, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [cart, setCart] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const handleViewDetails = (plant: Plant) => {
    setSelectedPlant(plant);
    setActivePage('detail');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (plant: Plant) => {
    setCart((prev) => [...prev, plant]);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="space-y-32 pb-20">
            <Hero />
            
            {/* How it Works Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1 rounded-full text-xs font-bold">
                  Simple & Effective
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">How PlantSphere Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We've simplified plant care so you can focus on enjoying your green space.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Discover', desc: 'Browse our curated collection of rare and common plants.', icon: Leaf },
                  { title: 'Track', desc: 'Use our smart dashboard to monitor health and watering.', icon: CheckCircle2 },
                  { title: 'Grow', desc: 'Join the community and watch your urban jungle thrive.', icon: Star },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="glass-card p-10 rounded-[2.5rem] text-center group"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-card p-12 md:p-20 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
                    alt="Categories Background"
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Explore Our <br /><span className="text-gradient">Diverse Categories</span></h2>
                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                      Whether you're looking for low-maintenance indoor plants or exotic rare species, we have something for every plant parent.
                    </p>
                    <Button className="btn-primary" onClick={() => setActivePage('explore')}>
                      Browse All Categories
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Indoor', 'Outdoor', 'Rare', 'Medicinal'].map((cat, i) => (
                      <motion.div
                        key={cat}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="glass p-8 rounded-3xl text-center cursor-pointer group hover:border-primary/30 transition-all"
                        onClick={() => setActivePage('explore')}
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                          <Leaf className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">{cat}</h3>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Plants */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1 rounded-full text-xs font-bold">
                    Top Picks
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold">Featured Collection</h2>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-primary hover:bg-primary/10 flex gap-2 text-lg font-bold"
                  onClick={() => setActivePage('explore')}
                >
                  View Full Catalog <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {PLANTS.slice(0, 3).map((plant) => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    onViewDetails={handleViewDetails}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* Plant Quiz Section */}
            <PlantQuiz onSelectPlant={handleViewDetails} />

            {/* Testimonials Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Plant Parents</h2>
                <p className="text-muted-foreground">Join thousands of happy users who transformed their homes.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: 'Alex Rivera', text: 'PlantSphere changed the way I care for my monstera. The tracking is so intuitive!', role: 'Indoor Gardener' },
                  { name: 'Sarah Chen', text: 'The community is amazing. I learned so much about rare succulents here.', role: 'Rare Plant Collector' },
                  { name: 'Marcus Thorne', text: 'Finally, an app that actually helps me keep my plants alive. Highly recommend!', role: 'Beginner' },
                ].map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 rounded-[2rem] relative"
                  >
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                    </div>
                    <p className="text-lg mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full" />
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-primary to-accent p-12 md:p-24 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to Start Your <br />Urban Jungle?</h2>
                  <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
                    Join PlantSphere today and get 20% off your first rare plant purchase.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-white text-primary hover:bg-white/90 h-auto py-5 px-12 rounded-2xl text-xl font-bold shadow-xl">
                      Join the Community
                    </Button>
                    <Button variant="outline" className="border-white/30 hover:bg-white/10 h-auto py-5 px-12 rounded-2xl text-xl font-bold backdrop-blur-md">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        );
      case 'explore':
        return <Explore onViewDetails={handleViewDetails} onAddToCart={handleAddToCart} />;
      case 'detail':
        return selectedPlant ? (
          <PlantDetail
            plant={selectedPlant}
            onBack={() => setActivePage('explore')}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      case 'dashboard':
        return <Dashboard />;
      case 'community':
        return <Community />;
      case 'stores':
        return <Stores />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Preloader isLoading={isLoading} />
      
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setSelectedPlant(null);
          window.scrollTo(0, 0);
        }}
        cartCount={cart.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage + (selectedPlant?.id || '')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="glass border-t border-white/10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold tracking-tighter">PlantSphere</span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Empowering plant parents with technology and community. Transform your living space into a thriving urban jungle.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                    <Icon className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8">Platform</h4>
              <ul className="space-y-4 text-muted-foreground">
                {['Home', 'Explore', 'Stores', 'Community', 'Dashboard'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => setActivePage(item.toLowerCase())}
                      className="hover:text-primary transition-colors text-lg"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8">Resources</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><button className="hover:text-primary transition-colors text-lg">Care Guides</button></li>
                <li><button className="hover:text-primary transition-colors text-lg">Plant Database</button></li>
                <li><button className="hover:text-primary transition-colors text-lg">Expert Advice</button></li>
                <li><button className="hover:text-primary transition-colors text-lg">Success Stories</button></li>
                <li><button className="hover:text-primary transition-colors text-lg">Newsletter</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8">Stay Updated</h4>
              <p className="text-muted-foreground mb-6 text-lg">Join our newsletter for weekly plant care tips and exclusive drops.</p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full px-6 py-4 rounded-2xl glass-card border-white/10 outline-none focus:border-primary/50 text-lg"
                />
                <Button className="btn-primary w-full py-4 text-lg">Subscribe Now</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
            <p className="text-lg">© 2026 PlantSphere. All rights reserved.</p>
            <div className="flex gap-8 text-sm">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import PlantCard from './components/PlantCard';
import { Badge } from '@/components/ui/badge';
