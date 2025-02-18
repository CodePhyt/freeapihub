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
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export const ProvidersOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('llm');

  const llmProviders = [
    {
      name: "Google AI Studio",
      url: "https://makersuite.google.com/",
      models: [
        "Gemini 2.0 Flash",
        "Gemini 2.0 Flash-Lite",
        "Gemini 1.5 Flash",
        "Gemini 1.5 Flash-8B",
      ],
      limits: "1,500 requests/day, 15-30 requests/minute",
      notes: "Data used for training outside UK/CH/EEA/EU",
      status: "stable"
    },
    {
      name: "Scaleway Generative APIs",
      url: "https://console.scaleway.com/",
      models: [
        "DeepSeek R1",
        "Llama 3.1/3.3 70B",
        "Mistral Nemo",
        "Pixtral 12B"
      ],
      limits: "100-300 requests/minute",
      notes: "Free Beta until March 2025",
      status: "beta"
    },
    {
      name: "OVH AI Endpoints",
      url: "https://www.ovhcloud.com/en/public-cloud/ai-endpoints/",
      models: [
        "Llama 3 8B/3.1 70B",
        "Mistral 7B/Nemo",
        "Mixtral 8x7B",
        "DeepSeek R1"
      ],
      limits: "12 requests/minute",
      notes: "Free Beta",
      status: "beta"
    },
    {
      name: "Cloudflare Workers AI",
      url: "https://developers.cloudflare.com/workers-ai/",
      models: [
        "Llama 3/3.1/3.2/3.3",
        "Mistral 7B",
        "Gemma 2B/7B",
        "OpenChat 3.5"
      ],
      limits: "10,000 tokens/day",
      notes: "Various model variants available",
      status: "stable"
    },
    {
      name: "Mistral (La Plateforme)",
      url: "https://console.mistral.ai/",
      models: ["Open and Proprietary Mistral models"],
      limits: "1 request/second, 500,000 tokens/minute",
      notes: "Free tier requires phone verification",
      status: "stable"
    }
  ];

  const hostingProviders = [
    {
      name: "GitHub Codespaces",
      url: "https://github.com/features/codespaces",
      limits: "120 core hours/month",
      features: [
        "Free for public repositories",
        "Integrated with GitHub",
        "Full development environment"
      ],
      status: "stable"
    },
    {
      name: "Cloudflare Workers",
      url: "https://workers.cloudflare.com/",
      limits: "100,000 requests/day",
      features: [
        "Global edge deployment",
        "Workers AI integration",
        "Unlimited scripts"
      ],
      status: "stable"
    },
    {
      name: "Google Cloud Run",
      url: "https://cloud.google.com/run",
      limits: "2 million requests/month",
      features: [
        "Serverless containers",
        "Auto-scaling",
        "Pay-per-use after free tier"
      ],
      status: "stable"
    },
    {
      name: "Vercel",
      url: "https://vercel.com/",
      limits: "100 GB bandwidth/month",
      features: [
        "Serverless functions",
        "Edge deployment",
        "Git integration"
      ],
      status: "stable"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const LinkButton = ({ url, text }: { url: string; text: string }) => (
    <Button 
      variant="outline" 
      size="sm"
      className="group relative overflow-hidden"
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
    >
      <motion.div
        className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10"
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.6 }}
      />
      <span className="flex items-center gap-1 relative z-10">
        {text} <ExternalLink size={16} />
      </span>
    </Button>
  );

  const StatusBadge = ({ status }: { status: string }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Badge 
        variant={status === 'stable' ? 'default' : 'secondary'}
        className="gap-1"
      >
        {status === 'stable' ? (
          <><CheckCircle2 size={14} /> Stable</>
        ) : (
          <><AlertCircle size={14} /> Beta</>
        )}
      </Badge>
    </motion.div>
  );

  const filterProviders = (providers: any[], term: string) => {
    return providers.filter(provider => 
      provider.name.toLowerCase().includes(term.toLowerCase()) ||
      (provider.models && provider.models.some((model: string) => 
        model.toLowerCase().includes(term.toLowerCase()))) ||
      (provider.features && provider.features.some((feature: string) => 
        feature.toLowerCase().includes(term.toLowerCase())))
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto space-y-6"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search providers, models, or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </motion.div>

      <Tabs 
        defaultValue="llm" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="llm" className="gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Cpu className="h-4 w-4" />
              LLM Providers
            </motion.div>
          </TabsTrigger>
          <TabsTrigger value="hosting" className="gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Cloud className="h-4 w-4" />
              Hosting Providers
            </motion.div>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="llm">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filterProviders(llmProviders, searchTerm).map((provider, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-bold">{provider.name}</CardTitle>
                        <StatusBadge status={provider.status} />
                      </CardHeader>
                      <CardContent>
                        <motion.div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Available Models:</h4>
                            <div className="flex flex-wrap gap-2">
                              {provider.models.map((model: string, idx: number) => (
                                <motion.div
                                  key={idx}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Badge variant="secondary">{model}</Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Limits:</h4>
                            <p className="text-sm">{provider.limits}</p>
                          </div>
                          {provider.notes && (
                            <p className="text-sm text-muted-foreground italic">{provider.notes}</p>
                          )}
                          <div className="pt-2">
                            <LinkButton url={provider.url} text="Get Started" />
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="hosting">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filterProviders(hostingProviders, searchTerm).map((provider, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-bold">{provider.name}</CardTitle>
                        <StatusBadge status={provider.status} />
                      </CardHeader>
                      <CardContent>
                        <motion.div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Free Tier Limits:</h4>
                            <p className="text-sm">{provider.limits}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {provider.features.map((feature: string, idx: number) => (
                                <motion.li
                                  key={idx}
                                  className="text-sm flex items-center gap-2"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <CheckCircle2 size={14} className="text-green-500" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-2">
                            <LinkButton url={provider.url} text="Get Started" />
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};