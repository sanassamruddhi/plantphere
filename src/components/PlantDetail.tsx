import { 
  Droplets, 
  Sun, 
  Thermometer, 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  CheckCircle2,
  Info,
  ShieldCheck,
  Truck,
  RotateCcw,
  Leaf,
  Activity,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { Plant } from '@/src/types';

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
  onAddToCart: (plant: Plant) => void;
}

export default function PlantDetail({ plant, onBack, onAddToCart }: PlantDetailProps) {
  if (!plant) return null;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-bold group"
      >
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary/10">
          <ArrowLeft className="w-5 h-5" />
        </div>
        Back to Explore
      </motion.button>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square rounded-[3rem] overflow-hidden glass-card p-4 group"
        >
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-10 right-10 flex flex-col gap-4">
            <Button variant="ghost" size="icon" className="glass rounded-2xl h-14 w-14 hover:bg-red-500/10 hover:text-red-500">
              <Heart className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="glass rounded-2xl h-14 w-14 hover:bg-primary/10 hover:text-primary">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>

        {/* Right: Info Section */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full text-xs font-bold">
                {plant.category}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                <Sun className="w-4 h-4 fill-current" />
                Best Seller
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
              {plant.name}
            </h1>
            <p className="text-2xl font-bold text-primary mb-6">${plant.price}</p>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              {plant.description || "Transform your living space with this stunning architectural plant. Known for its iconic leaves and air-purifying qualities, it's the perfect addition to any modern home."}
            </p>
          </motion.div>

          {/* Care Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Watering', value: plant.water || 'Every 1-2 weeks', icon: Droplets, color: 'text-primary' },
              { label: 'Sunlight', value: plant.sunlight || 'Bright indirect', icon: Sun, color: 'text-yellow-500' },
              { label: 'Temperature', value: '18°C - 24°C', icon: Thermometer, color: 'text-orange-500' },
              { label: 'Difficulty', value: `${plant.difficulty}/5` || 'Beginner', icon: Activity, color: 'text-accent' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 rounded-[2rem] border-white/5"
              >
                <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-bold text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: ShieldCheck, text: 'Guaranteed healthy arrival' },
              { icon: Truck, text: 'Free shipping on orders over $50' },
              { icon: RotateCcw, text: '30-day easy return policy' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <feature.icon className="w-5 h-5 text-primary" />
                {feature.text}
              </div>
            ))}
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <Button 
              onClick={() => onAddToCart(plant)}
              className="flex-1 btn-primary h-auto py-6 px-10 text-lg rounded-[1.5rem]"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              Add to Cart
            </Button>
            <Button variant="ghost" className="glass h-auto py-6 px-10 text-lg rounded-[1.5rem] font-bold">
              Care Guide
            </Button>
          </motion.div>
        </div>
      </div>

      {/* More Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 grid md:grid-cols-3 gap-12"
      >
        <div className="glass-card p-10 rounded-[3rem] border-primary/10">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Eco-Friendly</h3>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Sourced from sustainable nurseries that prioritize environmental health and biodiversity.
          </p>
        </div>
        <div className="glass-card p-10 rounded-[3rem] border-accent/10">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Each plant is hand-selected and inspected by our expert botanists before shipping.
          </p>
        </div>
        <div className="glass-card p-10 rounded-[3rem] border-yellow-500/10">
          <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Air Purifying</h3>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Natural air filters that remove toxins and increase oxygen levels in your home.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
