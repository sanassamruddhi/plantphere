import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plant } from '@/src/types';
import { motion } from 'motion/react';

interface PlantCardProps {
  plant: Plant;
  onViewDetails: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onViewDetails, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card rounded-[2.5rem] overflow-hidden group relative border border-white/5 hover:border-primary/20 transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered && plant.secondaryImage ? 0 : 1
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {plant.secondaryImage && (
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 1.1
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={plant.secondaryImage}
            alt={`${plant.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="ghost" className="glass rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
          <Button 
            className="flex-1 btn-primary py-6 rounded-2xl shadow-xl shadow-primary/20"
            onClick={() => onAddToCart(plant)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="glass py-6 px-8 rounded-2xl hover:bg-white/10"
            onClick={() => onViewDetails(plant)}
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none mb-2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {plant.category}
            </Badge>
            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{plant.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-primary">${plant.price}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-muted-foreground">4.8</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Difficulty:</span>
            <span className={`text-xs font-black uppercase ${
              plant.difficulty === 'Easy' ? 'text-green-500' : 
              plant.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {plant.difficulty}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantCard;
