export interface Model {
  name: string;
  limits?: string[];
}

export interface Provider {
  name: string;
  limits: string[];
  models: Model[];
  trialCredits?: string;
  requirements?: string;
}

export const providers: Provider[] = [
  {
    name: "OpenRouter",
    limits: [
      "20 requests/minute",
      "200 requests/day"
    ],
    models: [
      { name: "DeepSeek R1" },
      { name: "DeepSeek R1 Distill Llama 70B" },
      { name: "DeepSeek V3" },
      { name: "Dolphin 3.0 Mistral 24B" },
      { name: "Dolphin 3.0 R1 Mistral 24B" },
      { name: "Gemini 2.0 Flash Lite Preview 02-05" },
      { name: "Gemma 2 9B Instruct" },
      { name: "Llama 3 8B Instruct" },
      { name: "Llama 3.1 Nemotron 70B Instruct" },
      { name: "Llama 3.2 11B Vision Instruct" },
      { name: "Llama 3.3 70B Instruct" },
      { name: "Mistral 7B Instruct" },
      { name: "Mistral Nemo" },
      { name: "Mistral Small 24B Instruct 2501" },
      { name: "Mythomax L2 13B" },
      { name: "OpenChat 7B" },
      { name: "Phi-3 Medium 128k Instruct" },
      { name: "Phi-3 Mini 128k Instruct" },
      { name: "Qwen VL Plus" },
      { name: "Qwen2.5 VL 72B Instruct" },
      { name: "Rogue Rose 103B v0.2" },
      { name: "Toppy M 7B" },
      { name: "Zephyr 7B Beta" }
    ]
  },
  {
    name: "Google AI Studio",
    limits: ["Data is used for training (when used outside of the UK/CH/EEA/EU)."],
    models: [
      { 
        name: "Gemini 2.0 Flash",
        limits: [
          "1,000,000 tokens/minute",
          "1,500 requests/day",
          "15 requests/minute"
        ]
      },
      {
        name: "Gemini 2.0 Flash-Lite",
        limits: [
          "1,000,000 tokens/minute",
          "1,500 requests/day",
          "30 requests/minute"
        ]
      }
    ]
  }
];

export const providersWithTrialCredits = [
  {
    name: "Together",
    credits: "$1 when you add a payment method",
    models: ["Various open models"]
  },
  {
    name: "Fireworks",
    credits: "$1",
    models: ["Various open models"]
  },
  {
    name: "Unify",
    credits: "$5 when you add a payment method",
    models: ["Routes to other providers, various open models and proprietary models (OpenAI, Gemini, Anthropic, Mistral, Perplexity, etc)"]
  },
  {
    name: "NVIDIA NIM",
    credits: "1,000 API calls for 1 month",
    models: ["Various open models"]
  },
  {
    name: "Baseten",
    credits: "$30",
    models: ["Any supported model - pay by compute time"]
  }
];
