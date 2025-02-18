import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud, 
  CheckCircle2,
  Info,
  Linkedin,
  Github,
  Rocket
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { providers, providersWithTrialCredits, deploymentProviders } from '@/data/providers';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { MatrixBackground } from './MatrixBackground';
import '@/styles/cyber-theme.css';

export const ProvidersOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('providers');

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.models.some(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTrialProviders = providersWithTrialCredits.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeploymentProviders = deploymentProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cyber-theme min-h-screen">
      <MatrixBackground />
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center fade-in-up">
          <h1 className="text-4xl font-bold mb-2">Free AI Model Providers</h1>
          <p className="text-muted-foreground">
            Explore various AI model providers and their offerings
          </p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/osmankadir/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="inline-block" />
            </a>
            <a href="https://github.com/CodePhyt" target="_blank" rel="noopener noreferrer">
              <Github className="inline-block" />
            </a>
          </div>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search providers or models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto bg-black/50 border-matrix-green text-matrix-green"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="slide-in">
          <TabsList className="bg-black/50 border border-matrix-green">
            <TabsTrigger value="providers" className="data-[state=active]:bg-matrix-green/20">
              <Cloud className="w-4 h-4 mr-2" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="trials" className="data-[state=active]:bg-matrix-green/20">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Trial Credits
            </TabsTrigger>
            <TabsTrigger value="deployment" className="data-[state=active]:bg-matrix-green/20">
              <Rocket className="w-4 h-4 mr-2" />
              Deployment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredProviders.map((provider, idx) => (
                  <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Card className="cyber-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={provider.logo} 
                              alt={`${provider.name} logo`} 
                              className="w-6 h-6 rounded-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/24x24/matrix-green/black?text=' + provider.name[0];
                              }}
                            />
                            <a 
                              href={provider.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-cyber-blue transition-colors"
                            >
                              {provider.name}
                            </a>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {provider.limits.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">Provider Limits:</h4>
                              <ul className="space-y-1">
                                {provider.limits.map((limit, idx) => (
                                  <motion.li
                                    key={idx}
                                    className="text-sm flex items-center gap-2"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  >
                                    <Info className="h-4 w-4 text-cyber-blue" />
                                    {limit}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Available Models:</h4>
                            <ScrollArea className="h-[200px] bg-black/30 rounded p-2">
                              <Accordion type="single" collapsible>
                                {provider.models.map((model, idx) => (
                                  <AccordionItem key={idx} value={`model-${idx}`} className="border-matrix-green">
                                    <AccordionTrigger className="text-sm hover:text-cyber-blue">
                                      {model.name}
                                    </AccordionTrigger>
                                    {model.limits && (
                                      <AccordionContent>
                                        <ul className="space-y-1 pl-4">
                                          {model.limits.map((limit, limitIdx) => (
                                            <li key={limitIdx} className="text-sm text-muted-foreground">
                                              • {limit}
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    )}
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </ScrollArea>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="trials">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredTrialProviders.map((provider, idx) => (
                  <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Card className="cyber-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={provider.logo} 
                              alt={`${provider.name} logo`} 
                              className="w-6 h-6 rounded-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/24x24/matrix-green/black?text=' + provider.name[0];
                              }}
                            />
                            <a 
                              href={provider.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-cyber-blue transition-colors"
                            >
                              {provider.name}
                            </a>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Trial Credits:</h4>
                            <p className="text-sm">{provider.credits}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Available Models:</h4>
                            <ul className="space-y-1">
                              {provider.models.map((model, idx) => (
                                <motion.li
                                  key={idx}
                                  className="text-sm"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  • {model}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="deployment">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredDeploymentProviders.map((provider, idx) => (
                  <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Card className="cyber-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={provider.logo} 
                              alt={`${provider.name} logo`} 
                              className="w-6 h-6 rounded-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/24x24/matrix-green/black?text=' + provider.name[0];
                              }}
                            />
                            <a 
                              href={provider.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-cyber-blue transition-colors"
                            >
                              {provider.name}
                            </a>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {provider.features.map((feature, idx) => (
                                <motion.li
                                  key={idx}
                                  className="text-sm flex items-center gap-2"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Rocket className="h-4 w-4 text-cyber-blue" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};