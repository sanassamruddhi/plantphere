import { Search, ArrowRight, Leaf, Star, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-110"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-green-leaves-of-a-plant-31487-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>

      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow delay-1000" />

      {/* Movable Motion Plant (Draggable) */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileHover={{ scale: 1.1, cursor: "grab" }}
        whileTap={{ scale: 0.9, cursor: "grabbing" }}
        className="absolute top-1/4 right-1/4 z-50 hidden lg:block"
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=200" 
            alt="Movable Plant"
            className="w-24 h-24 object-cover rounded-full border-2 border-primary/50 shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <Badge className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px]">Move Me!</Badge>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-8 px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
              ✨ The Future of Plant Care is Here
            </Badge>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.95] mb-8 tracking-tighter">
            Elevate Your <br />
            <span className="text-gradient">Green Space</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Experience the next generation of plant parenting. From AI-driven growth tracking to a global community of enthusiasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <Button className="btn-primary h-auto py-5 px-10 text-lg group">
              Start Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowVideo(true)}
              className="h-auto py-5 px-10 rounded-2xl border-white/10 glass hover:bg-white/5 text-lg font-semibold flex gap-3 group"
            >
              <div className="bg-primary/20 p-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                <Play className="w-4 h-4 fill-current" />
              </div>
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-10">
            {[
              { label: 'Plants Tracked', value: '250k+' },
              { label: 'Active Users', value: '85k+' },
              { label: 'Expert Tips', value: '1.2k' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1000"
              alt="Hero Plant"
              className="relative rounded-[3rem] shadow-2xl border border-white/10 z-10 w-full object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Interactive Cards */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 glass p-6 rounded-3xl border border-white/20 shadow-2xl z-20 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/30">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">Health Score</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="h-full bg-primary" 
                      />
                    </div>
                    <span className="text-xs font-bold text-primary">95%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-12 -left-12 glass p-6 rounded-3xl border border-white/20 shadow-2xl z-20 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-accent p-3 rounded-2xl shadow-lg shadow-accent/30">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">Rare Find</p>
                  <p className="text-xs text-muted-foreground">Monstera Albo</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -inset-10 border border-primary/10 rounded-[4rem] -z-10 animate-pulse-slow" />
          <div className="absolute -inset-20 border border-primary/5 rounded-[5rem] -z-10 animate-pulse-slow delay-500" />
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video glass rounded-3xl overflow-hidden shadow-2xl"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 glass rounded-full hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="PlantSphere Demo"
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
