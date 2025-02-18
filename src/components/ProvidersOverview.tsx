import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Cpu, 
  Cloud, 
  Search,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { providers, providersWithTrialCredits } from '@/data/providers';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

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

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Free AI Model Providers</h1>
        <p className="text-muted-foreground">
          Explore various AI model providers and their offerings
        </p>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search providers or models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="providers">
            <Cloud className="w-4 h-4 mr-2" />
            Providers
          </TabsTrigger>
          <TabsTrigger value="trials">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Trial Credits
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {provider.name}
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
                                  <Info className="h-4 w-4 text-blue-500" />
                                  {limit}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Available Models:</h4>
                          <ScrollArea className="h-[200px]">
                            <Accordion type="single" collapsible>
                              {provider.models.map((model, idx) => (
                                <AccordionItem key={idx} value={`model-${idx}`}>
                                  <AccordionTrigger className="text-sm">
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {provider.name}
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
      </Tabs>
    </div>
  );
};