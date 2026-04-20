import { 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation,
  Search,
  Filter,
  BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { STORES } from '@/src/constants';

export default function Stores() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4 px-4 py-1 rounded-full text-xs font-bold">
            Local Partners
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Nearby <br /><span className="text-gradient-accent">Plant Stores</span>
          </h1>
        </motion.div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search by area..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass-card border-white/10 outline-none focus:border-accent/50 transition-all"
            />
          </div>
          <Button variant="ghost" className="glass rounded-2xl h-auto py-4 px-6">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Stores List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid gap-8">
            {STORES.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-[2.5rem] flex flex-col sm:flex-row gap-8 group hover:border-accent/20 transition-all duration-500"
              >
                <div className="relative w-full sm:w-64 h-48 flex-shrink-0 overflow-hidden rounded-[1.5rem]">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="glass-accent text-white border-none px-3 py-1 rounded-full text-[10px] font-bold">
                      {store.distance}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{store.name}</h3>
                        <BadgeCheck className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {store.address}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        {store.rating}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Verified Store</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['Organic', 'Rare Plants', 'Indoor'].map(tag => (
                      <Badge key={tag} variant="ghost" className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      9:00 AM - 7:00 PM
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      Contact
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button className="flex-1 btn-accent rounded-xl">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                    <Button variant="ghost" className="glass rounded-xl px-4">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Map */}
        <div className="space-y-8">
          <div className="sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-4 rounded-[2.5rem] h-[600px] relative overflow-hidden border-accent/10"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d50000!2d-73.98!3d40.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1splant%20nursery!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                className="rounded-[2rem]"
              ></iframe>
              <div className="absolute top-8 left-8 glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Live Map View
              </div>
            </motion.div>

            <div className="glass-card p-10 rounded-[2.5rem] bg-accent/5 border-accent/10 mt-8">
              <h3 className="text-xl font-bold mb-4">Partner with Us</h3>
              <p className="text-sm text-muted-foreground mb-6 font-medium">
                Are you a local nursery owner? Join our network and reach thousands of plant parents.
              </p>
              <Button variant="link" className="text-accent font-bold p-0">Learn More →</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
