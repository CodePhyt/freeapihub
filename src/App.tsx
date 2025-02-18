import { ProvidersOverview } from '@/components/ProvidersOverview';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center mb-8">Free Development Resources</h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore a curated list of free LLM providers and hosting platforms for your next project. 
              All services offer generous free tiers to help you get started.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden"
              onClick={() => window.open('https://github.com/CodePhyt', '_blank')}
            >
              <motion.div
                className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.6 }}
              />
              <span className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                <span className="relative">
                  <motion.span
                    className="inline-block"
                    whileHover={{ y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    Created by CodePhyt
                  </motion.span>
                  <motion.span
                    className="absolute left-0 top-0"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Visit GitHub
                  </motion.span>
                </span>
              </span>
            </Button>
          </motion.div>

          <ProvidersOverview />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;