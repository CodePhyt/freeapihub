interface Model {
  name: string;
  limits?: string[];
}

interface Provider {
  name: string;
  limits: string[];
  models: Model[];
  link: string;
  logo: string;
}

interface TrialProvider {
  name: string;
  credits: string;
  models: string[];
  link: string;
  logo: string;
}

interface DeploymentProvider {
  name: string;
  features: string[];
  link: string;
  logo: string;
}

export const providers: Provider[] = [
  {
    name: 'OpenRouter',
    limits: [
      'Free tier with $5 in credits',
      'Rate limits vary by model'
    ],
    models: [
      {
        name: 'GPT-3.5-Turbo',
        limits: ['3 requests per minute']
      },
      {
        name: 'Claude-2',
        limits: ['1 request per minute']
      }
    ],
    link: 'https://openrouter.ai',
    logo: 'https://openrouter.ai/favicon.ico'
  },
  {
    name: 'HuggingFace Serverless Inference',
    limits: [
      'Free tier available',
      'Usage-based pricing after free tier'
    ],
    models: [
      {
        name: 'Various open-source models',
        limits: ['Rate limits based on instance type']
      }
    ],
    link: 'https://huggingface.co/inference-endpoints',
    logo: 'https://huggingface.co/favicon.ico'
  },
  {
    name: 'GitHub Models',
    limits: [
      'Requires Copilot subscription',
      'Extremely restrictive input/output token limits'
    ],
    models: [
      {
        name: 'Copilot',
        limits: [
          'Rate limits dependent on subscription tier',
          'Free/Pro/Business/Enterprise tiers available'
        ]
      }
    ],
    link: 'https://github.com/features/copilot',
    logo: 'https://github.com/favicon.ico'
  },
  {
    name: 'OVH AI Endpoints',
    limits: [
      'Currently in Free Beta',
      'Limited model availability'
    ],
    models: [
      {
        name: 'Various AI models',
        limits: ['Beta access restrictions apply']
      }
    ],
    link: 'https://www.ovhcloud.com/en/public-cloud/ai-machine-learning/',
    logo: 'https://www.ovhcloud.com/favicon.ico'
  },
  {
    name: 'Groq',
    limits: [
      'Competitive pricing',
      'High-performance inference'
    ],
    models: [
      {
        name: 'LLaMA 2',
        limits: ['Usage-based pricing']
      },
      {
        name: 'Mixtral',
        limits: ['Usage-based pricing']
      }
    ],
    link: 'https://groq.com',
    logo: 'https://groq.com/favicon.ico'
  },
  {
    name: 'Mistral (La Plateforme)',
    limits: [
      'Free tier (Experiment plan)',
      'Requires phone number verification',
      'Data training opt-in required for free tier'
    ],
    models: [
      {
        name: 'Mistral-7B',
        limits: ['Rate limits apply to free tier']
      },
      {
        name: 'Mixtral-8x7B',
        limits: ['Rate limits apply to free tier']
      }
    ],
    link: 'https://mistral.ai',
    logo: 'https://mistral.ai/favicon.ico'
  },
  {
    name: 'Cerebras',
    limits: [
      'Free tier available',
      'Context limited to 8K in free tier'
    ],
    models: [
      {
        name: 'GPT models',
        limits: ['8K context limit on free tier']
      }
    ],
    link: 'https://www.cerebras.net',
    logo: 'https://www.cerebras.net/favicon.ico'
  },
  {
    name: 'Cloudflare Workers AI',
    limits: [
      '10,000 tokens/day',
      'Workers platform integration'
    ],
    models: [
      {
        name: 'Various AI models',
        limits: ['Daily token limit: 10,000']
      }
    ],
    link: 'https://workers.cloudflare.com/ai',
    logo: 'https://workers.cloudflare.com/favicon.ico'
  },
  {
    name: 'NVIDIA NIM',
    limits: [
      '1,000 API calls for 1 month',
      'Developer-focused platform'
    ],
    models: [
      {
        name: 'Various NVIDIA models',
        limits: ['1,000 API call limit']
      }
    ],
    link: 'https://www.nvidia.com/en-us/ai-data-science/generative-ai/',
    logo: 'https://www.nvidia.com/favicon.ico'
  },
  {
    name: 'Alibaba Cloud Model Studio',
    limits: [
      'Token/time-limited trials',
      'Per-model trial basis'
    ],
    models: [
      {
        name: 'Various AI models',
        limits: ['Trial limitations vary by model']
      }
    ],
    link: 'https://www.alibabacloud.com/product/machine-learning',
    logo: 'https://www.alibabacloud.com/favicon.ico'
  }
];

export const providersWithTrialCredits: TrialProvider[] = [
  {
    name: 'OpenRouter',
    credits: '$5 in free credits',
    models: ['GPT-3.5-Turbo', 'Claude-2', 'Palm-2'],
    link: 'https://openrouter.ai',
    logo: 'https://openrouter.ai/favicon.ico'
  },
  {
    name: 'OVH AI',
    credits: 'Free Beta access',
    models: ['Various AI models during beta period'],
    link: 'https://www.ovhcloud.com/en/public-cloud/ai-machine-learning/',
    logo: 'https://www.ovhcloud.com/favicon.ico'
  },
  {
    name: 'NVIDIA NIM',
    credits: '1,000 API calls',
    models: ['NVIDIA AI models'],
    link: 'https://www.nvidia.com/en-us/ai-data-science/generative-ai/',
    logo: 'https://www.nvidia.com/favicon.ico'
  }
];

export const deploymentProviders: DeploymentProvider[] = [
  {
    name: 'Vercel',
    features: [
      'Free tier with generous limits',
      'Automatic deployments',
      'Edge functions',
      'Analytics'
    ],
    link: 'https://vercel.com',
    logo: 'https://vercel.com/favicon.ico'
  },
  {
    name: 'Netlify',
    features: [
      'Free tier available',
      'Continuous deployment',
      'Edge functions',
      'Forms handling',
      'Analytics'
    ],
    link: 'https://www.netlify.com',
    logo: 'https://www.netlify.com/favicon.ico'
  },
  {
    name: 'Railway',
    features: [
      'Simple deployment process',
      'Free tier available',
      'Automatic scaling'
    ],
    link: 'https://railway.app',
    logo: 'https://railway.app/favicon.ico'
  },
  {
    name: 'Render',
    features: [
      'Free tier with limitations',
      'Automatic deployments',
      'Simple configuration'
    ],
    link: 'https://render.com',
    logo: 'https://render.com/favicon.ico'
  }
];
