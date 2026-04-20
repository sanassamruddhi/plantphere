import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PLANTS } from '@/src/constants';
import { Plant } from '@/src/types';
import { Sparkles, Sun, Maximize, Heart, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

interface QuizQuestion {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    icon: React.ElementType;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'light',
    text: 'How much natural light does your space get?',
    options: [
      { label: 'Low Light', value: 'Low', icon: Sun },
      { label: 'Medium Light', value: 'Medium', icon: Sun },
      { label: 'Bright Light', value: 'High', icon: Sun },
    ],
  },
  {
    id: 'space',
    text: 'What kind of space are you looking to fill?',
    options: [
      { label: 'Small (Desk/Shelf)', value: 'Small', icon: Maximize },
      { label: 'Medium (Floor/Stand)', value: 'Medium', icon: Maximize },
      { label: 'Large (Corner/Outdoor)', value: 'Large', icon: Maximize },
    ],
  },
  {
    id: 'care',
    text: 'How would you describe your care style?',
    options: [
      { label: 'Beginner (Forgetful)', value: 'Beginner', icon: Heart },
      { label: 'Intermediate (Regular)', value: 'Intermediate', icon: Heart },
      { label: 'Expert (Plant Parent)', value: 'Expert', icon: Heart },
    ],
  },
];

export default function PlantQuiz({ onSelectPlant }: { onSelectPlant: (plant: Plant) => void }) {
  const [step, setStep] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Plant[]>([]);

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    const filtered = PLANTS.filter((plant) => {
      // Light match
      const lightMatch = plant.sunlight === finalAnswers.light;
      
      // Care match
      let careMatch = false;
      if (finalAnswers.care === 'Beginner') careMatch = plant.difficulty <= 2;
      else if (finalAnswers.care === 'Intermediate') careMatch = plant.difficulty === 3;
      else if (finalAnswers.care === 'Expert') careMatch = plant.difficulty >= 4;

      // For space, we'll just use it as a soft filter or ignore if not enough matches
      return lightMatch && careMatch;
    });

    setRecommendations(filtered.slice(0, 3));
    setStep('results');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="glass-card p-12 md:p-20 rounded-[3rem] relative overflow-hidden border-primary/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center relative z-10"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-6 py-2 rounded-full text-sm font-bold">
                Personalized Recommendations
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                Find Your <span className="text-gradient">Perfect Plant</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Answer a few quick questions about your space and lifestyle, and we'll match you with the ideal green companion.
              </p>
              <Button 
                onClick={handleStart}
                className="btn-primary h-auto py-6 px-12 text-xl group"
              >
                Start Quiz
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="relative z-10"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-sm font-bold text-primary uppercase tracking-widest">
                  Question {currentQuestion + 1} of {QUESTIONS.length}
                </span>
                <div className="flex gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i <= currentQuestion ? 'w-8 bg-primary' : 'w-4 bg-white/10'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">
                {QUESTIONS[currentQuestion].text}
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {QUESTIONS[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="glass-card p-10 rounded-[2rem] text-center group hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <option.icon className="w-8 h-8" />
                    </div>
                    <span className="text-xl font-bold">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center relative z-10"
            >
              <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Perfect Matches</h2>
              <p className="text-muted-foreground mb-16 max-w-xl mx-auto">
                Based on your environment and care style, we recommend these plants for you.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {recommendations.length > 0 ? (
                  recommendations.map((plant) => (
                    <motion.div
                      key={plant.id}
                      whileHover={{ y: -10 }}
                      className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 group"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={plant.image} 
                          alt={plant.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="glass text-white border-none px-3 py-1 rounded-full text-[10px] font-bold">
                            {plant.difficulty <= 2 ? 'Easy Care' : 'Expert'}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-8">
                        <h4 className="text-xl font-bold mb-2">{plant.name}</h4>
                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{plant.description}</p>
                        <Button 
                          variant="outline" 
                          className="w-full rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white font-bold"
                          onClick={() => onSelectPlant(plant)}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 py-12 glass-card rounded-[2rem] border-dashed border-2 border-white/5">
                    <p className="text-muted-foreground">No exact matches found, but check out our full catalog!</p>
                  </div>
                )}
              </div>

              <Button 
                variant="ghost" 
                onClick={handleStart}
                className="text-muted-foreground hover:text-primary font-bold flex gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                Retake Quiz
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
