import { StartupData } from '../components/InputForm';

export interface RevenueModel {
  name: string;
  description: string;
}

export interface GeneratedPitch {
  elevatorPitch: string;
  tagline: string;
  valueProposition: string;
  slidePoints: string[];
  competitors: string[];
  revenueModels: RevenueModel[];
}

const industries = {
  tech: ['software', 'app', 'platform', 'digital', 'cloud', 'ai', 'ml', 'data'],
  health: ['health', 'medical', 'fitness', 'wellness', 'therapy', 'mental'],
  education: ['education', 'learning', 'student', 'course', 'teacher', 'school'],
  finance: ['finance', 'payment', 'money', 'banking', 'investment', 'crypto'],
  social: ['social', 'community', 'networking', 'connection', 'sharing'],
  ecommerce: ['shop', 'marketplace', 'commerce', 'retail', 'buying', 'selling'],
  sustainability: ['green', 'eco', 'sustainable', 'environment', 'carbon', 'renewable']
};

const competitorSuggestions = {
  tech: ['TechCorp Inc.', 'InnovateLabs', 'CloudSync Solutions', 'DataFlow Systems', 'NextGen Analytics'],
  health: ['HealthTech Pro', 'WellnessWorks', 'MedConnect', 'FitLife Solutions', 'CareLink Systems'],
  education: ['EduTech Solutions', 'LearnSmart', 'StudyBuddy Pro', 'ClassroomCloud', 'SkillBuilder'],
  finance: ['FinTech Forward', 'PayEasy Systems', 'MoneyMaster', 'InvestSmart', 'CryptoConnect'],
  social: ['SocialSphere', 'ConnectHub', 'CommunityLink', 'ShareSpace', 'NetworkNow'],
  ecommerce: ['ShopSmart', 'MarketPlace Pro', 'RetailRevolution', 'BuyNow Solutions', 'CommerceCloud'],
  sustainability: ['GreenTech Solutions', 'EcoInnovate', 'SustainableSystems', 'CarbonZero', 'CleanTech Pro']
};

const revenueModelTemplates = [
  { name: 'Freemium', description: 'Free basic features with premium paid upgrades' },
  { name: 'Subscription (SaaS)', description: 'Monthly/yearly recurring revenue model' },
  { name: 'Marketplace Commission', description: 'Take a percentage of transactions between users' },
  { name: 'Advertising', description: 'Revenue from targeted ads and sponsored content' },
  { name: 'Enterprise Licensing', description: 'Sell licenses to large organizations' },
  { name: 'Pay-per-Use', description: 'Charge based on usage or consumption' },
  { name: 'Hardware + Software', description: 'Combined product and service revenue' },
  { name: 'Consulting & Services', description: 'Professional services around your core product' },
  { name: 'White Label Licensing', description: 'License your technology to other companies' },
  { name: 'Data Monetization', description: 'Generate revenue from anonymized data insights' }
];

function detectIndustry(data: StartupData): string {
  const allText = [
    data.name,
    ...data.problem,
    ...data.solution,
    ...data.target,
    ...data.unique
  ].join(' ').toLowerCase();

  for (const [industry, keywords] of Object.entries(industries)) {
    if (keywords.some(keyword => allText.includes(keyword))) {
      return industry;
    }
  }
  return 'tech'; // default
}

function generateElevatorPitch(data: StartupData): string {
  const problems = data.problem.filter(p => p.trim()).join(', ');
  const solutions = data.solution.filter(s => s.trim()).join(' and ');
  const targets = data.target.filter(t => t.trim()).join(' and ');
  
  return `${data.name} addresses the critical challenge of ${problems} by ${solutions}. 

We're targeting ${targets} who are currently struggling with inefficient alternatives. Our unique approach delivers measurable results through ${data.unique.filter(u => u.trim()).slice(0, 2).join(' and ')}.

With a growing market opportunity and proven demand, ${data.name} is positioned to capture significant market share while solving real problems for our customers. We're seeking investment to scale our solution and expand our reach.`;
}

function generateTagline(data: StartupData): string {
  const action = ['Transform', 'Revolutionize', 'Simplify', 'Empower', 'Accelerate'][Math.floor(Math.random() * 5)];
  const domain = data.target.filter(t => t.trim())[0] || 'businesses';
  
  return `${action} ${domain} with ${data.name}`;
}

function generateValueProposition(data: StartupData): string {
  const mainBenefit = data.solution.filter(s => s.trim())[0] || 'innovative solutions';
  const uniqueValue = data.unique.filter(u => u.trim())[0] || 'cutting-edge technology';
  
  return `${data.name} delivers ${mainBenefit} through ${uniqueValue}, enabling our customers to achieve their goals faster and more efficiently than ever before. Unlike traditional alternatives, we provide a seamless experience that reduces costs while increasing productivity and satisfaction.`;
}

function generateSlidePoints(data: StartupData): string[] {
  return [
    `Problem: ${data.problem.filter(p => p.trim()).slice(0, 2).join(' and ')}`,
    `Solution: ${data.solution.filter(s => s.trim()).slice(0, 2).join(' and ')}`,
    `Market Opportunity: Large and growing target market of ${data.target.filter(t => t.trim()).join(' and ')}`,
    `Competitive Advantage: ${data.unique.filter(u => u.trim()).slice(0, 2).join(' and ')}`,
    'Business Model: Multiple revenue streams with scalable growth potential',
    'Traction: Early validation and growing customer interest',
    'Team: Experienced founders with domain expertise',
    'Funding: Seeking investment to accelerate growth and market expansion'
  ];
}

function getCompetitors(industry: string): string[] {
  const suggestions = competitorSuggestions[industry as keyof typeof competitorSuggestions] || competitorSuggestions.tech;
  return suggestions.slice(0, 4);
}

function getRevenueModels(data: StartupData): RevenueModel[] {
  const industry = detectIndustry(data);
  const allModels = [...revenueModelTemplates];
  
  // Shuffle and select relevant models
  const shuffled = allModels.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

export function generatePitch(data: StartupData): GeneratedPitch {
  const industry = detectIndustry(data);
  
  return {
    elevatorPitch: generateElevatorPitch(data),
    tagline: generateTagline(data),
    valueProposition: generateValueProposition(data),
    slidePoints: generateSlidePoints(data),
    competitors: getCompetitors(industry),
    revenueModels: getRevenueModels(data)
  };
}