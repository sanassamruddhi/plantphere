import { motion } from 'motion/react';
import { 
  Plus, 
  Droplets, 
  Sun, 
  Thermometer, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Leaf,
  Sparkles,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const myPlants = [
    { name: 'Monstera Deliciosa', health: 95, water: '2 days left', light: 'Indirect', status: 'Healthy', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200' },
    { name: 'Spider Plant', health: 88, water: '5 days left', light: 'Low', status: 'Needs Water', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=200' },
    { name: 'Fiddle Leaf Fig', health: 72, water: 'Today', light: 'Bright', status: 'Stressed', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200' },
  ];

  const stats = [
    { label: 'Total Plants', value: '12', icon: Leaf, color: 'text-primary' },
    { label: 'Health Score', value: '92%', icon: Activity, color: 'text-accent' },
    { label: 'Care Streak', value: '15 Days', icon: Sparkles, color: 'text-yellow-500' },
  ];

  const growthImages = [
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1512428813833-df4d23730014?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1515519373345-853f6389a7ad?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1 rounded-full text-xs font-bold">
            Personal Oasis
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Your Green <br /><span className="text-gradient">Dashboard</span>
          </h1>
        </motion.div>
        <Button className="btn-primary h-auto py-5 px-10 text-lg group">
          <Plus className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform" />
          Add New Plant
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
            <stat.icon className={`w-10 h-10 ${stat.color} mb-6`} />
            <p className="text-muted-foreground font-medium mb-1">{stat.label}</p>
            <p className="text-4xl font-black tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* My Plants List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">My Collection</h2>
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10">View All</Button>
          </div>
          
          <div className="grid gap-6">
            {myPlants.map((plant, i) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-[2rem] flex flex-col sm:flex-row items-center gap-8 group hover:border-primary/20 transition-all"
              >
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center ${
                    plant.status === 'Healthy' ? 'bg-green-500' : plant.status === 'Needs Water' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {plant.status === 'Healthy' ? <CheckCircle2 className="w-3 h-3 text-white" /> : <AlertCircle className="w-3 h-3 text-white" />}
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{plant.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{plant.status}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="glass rounded-xl h-10 w-10">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-muted-foreground">Overall Health</span>
                      <span className="text-primary">{plant.health}%</span>
                    </div>
                    <Progress value={plant.health} className="h-2 bg-white/5" />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl border-white/5">
                      <Droplets className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold">{plant.water}</span>
                    </div>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl border-white/5">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-bold">{plant.light}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Care Schedule, Tips & Growth Gallery */}
        <div className="space-y-12">
          <div className="glass-card p-10 rounded-[2.5rem] border-primary/10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              Today's Care
            </h3>
            <div className="space-y-6">
              {[
                { time: '08:00 AM', task: 'Water Fiddle Leaf Fig', done: false },
                { time: '10:30 AM', task: 'Mist Monstera', done: true },
                { time: '04:00 PM', task: 'Check Soil Moisture', done: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${item.done ? 'bg-primary/5 opacity-50' : 'glass'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground'}`}>
                    {item.done ? <CheckCircle2 className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${item.done ? 'line-through' : ''}`}>{item.task}</p>
                    <p className="text-xs text-muted-foreground font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full btn-primary mt-10">Complete All Tasks</Button>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] bg-accent/5 border-accent/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -mr-12 -mt-12" />
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-accent" />
              Expert Tip
            </h3>
            <p className="text-muted-foreground leading-relaxed italic">
              "During winter, reduce watering frequency by half as most indoor plants enter a dormant phase."
            </p>
            <Button variant="link" className="text-accent font-bold p-0 mt-4">Read More Tips</Button>
          </div>

          {/* Growth Gallery */}
          <div className="glass-card p-10 rounded-[2.5rem] border-white/5">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Growth Gallery
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {growthImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10"
                >
                  <img src={img} alt="Growth" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-xl border-white/10">View Timeline</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
