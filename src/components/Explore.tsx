import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List as ListIcon, Leaf, Droplets, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PLANTS } from '@/src/constants';
import PlantCard from './PlantCard';
import { Plant } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';

interface ExploreProps {
  onViewDetails: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export default function Explore({ onViewDetails, onAddToCart }: ExploreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickFilters, setQuickFilters] = useState({
    lowLight: false,
    petFriendly: false,
    airPurifying: false
  });

  const categories = ['All', 'Indoor', 'Outdoor', 'Rare', 'Medicinal', 'Succulents'];

  const toggleQuickFilter = (filter: keyof typeof quickFilters) => {
    setQuickFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const filteredPlants = PLANTS.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || plant.category === activeCategory;
    const matchesLowLight = !quickFilters.lowLight || plant.isLowLight;
    const matchesPetFriendly = !quickFilters.petFriendly || plant.isPetFriendly;
    const matchesAirPurifying = !quickFilters.airPurifying || plant.isAirPurifying;
    
    return matchesSearch && matchesCategory && matchesLowLight && matchesPetFriendly && matchesAirPurifying;
  });

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1 rounded-full text-xs font-bold">
            Curated Collection
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Discover Your <br /><span className="text-gradient">Green Companion</span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass-card border-white/10 outline-none focus:border-primary/50 transition-all text-lg"
            />
          </div>
          <Button variant="ghost" size="icon" className="glass h-14 w-14 rounded-2xl hover:bg-primary hover:text-white transition-all">
            <SlidersHorizontal className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-10">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Categories
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all text-left flex items-center justify-between group ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'glass hover:bg-white/5 text-muted-foreground'
                  }`}
                >
                  {cat}
                  <Leaf className={`w-4 h-4 transition-transform group-hover:rotate-12 ${activeCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2rem] border-white/5">
            <h3 className="text-xl font-bold mb-6">Quick Filters</h3>
            <div className="space-y-6">
              {[
                { label: 'Low Light', icon: Sun, key: 'lowLight' },
                { label: 'Pet Friendly', icon: Sparkles, key: 'petFriendly' },
                { label: 'Air Purifying', icon: Droplets, key: 'airPurifying' },
              ].map((filter) => (
                <label key={filter.label} className="flex items-center gap-4 cursor-pointer group">
                  <div 
                    onClick={() => toggleQuickFilter(filter.key as keyof typeof quickFilters)}
                    className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                      quickFilters[filter.key as keyof typeof quickFilters] 
                        ? 'border-primary bg-primary shadow-lg shadow-primary/20' 
                        : 'border-white/10 group-hover:border-primary/50'
                    }`}
                  >
                    {quickFilters[filter.key as keyof typeof quickFilters] && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${
                    quickFilters[filter.key as keyof typeof quickFilters] ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {filter.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Plant Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <p className="text-muted-foreground font-medium">
              Showing <span className="text-foreground font-bold">{filteredPlants.length}</span> plants
            </p>
            <div className="flex glass p-1.5 rounded-xl border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className={`grid gap-10 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
            >
              {filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onViewDetails={onViewDetails}
                  onAddToCart={onAddToCart}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPlants.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 glass-card rounded-[3rem] border-dashed border-2 border-white/5"
            >
              <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No plants found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              <Button 
                variant="link" 
                className="mt-4 text-primary font-bold"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
