import { LifeEvent } from '../types';

export const commonLifeEvents: Omit<LifeEvent, 'id' | 'targetAge' | 'estimatedCost'>[] = [
  {
    name: 'House Purchase',
    priority: 'High' as const,
    category: 'Property' as const,
    isRecurring: false
  },
  {
    name: 'Child Education (School)',
    priority: 'High' as const,
    category: 'Education' as const,
    isRecurring: true,
    recurringYears: 12
  },
  {
    name: 'Child Higher Education',
    priority: 'High' as const,
    category: 'Education' as const,
    isRecurring: false
  },
  {
    name: 'Child Marriage',
    priority: 'High' as const,
    category: 'Family' as const,
    isRecurring: false
  },
  {
    name: 'Emergency Health Fund',
    priority: 'High' as const,
    category: 'Health' as const,
    isRecurring: false
  },
  {
    name: 'Car Purchase',
    priority: 'Medium' as const,
    category: 'Other' as const,
    isRecurring: false
  },
  {
    name: 'Vacation Fund',
    priority: 'Low' as const,
    category: 'Other' as const,
    isRecurring: true,
    recurringYears: 1
  },
  {
    name: 'Home Renovation',
    priority: 'Medium' as const,
    category: 'Property' as const,
    isRecurring: false
  },
  {
    name: 'Parent Care Fund',
    priority: 'High' as const,
    category: 'Family' as const,
    isRecurring: true,
    recurringYears: 10
  }
];

export const getEstimatedCostByCountry = (eventName: string, countryCode: string): number => {
  const costs: Record<string, Record<string, number>> = {
    'House Purchase': {
      'IN': 5000000,    // ₹50 Lakhs
      'US': 400000,     // $400K
      'GB': 300000,     // £300K
      'CA': 500000,     // C$500K
      'AU': 600000,     // A$600K
      'DE': 350000,     // €350K
      'SG': 800000,     // S$800K
      'AE': 1000000     // AED 1M
    },
    'Child Education (School)': {
      'IN': 50000,      // ₹50K per year
      'US': 15000,      // $15K per year
      'GB': 12000,      // £12K per year
      'CA': 18000,      // C$18K per year
      'AU': 20000,      // A$20K per year
      'DE': 8000,       // €8K per year
      'SG': 25000,      // S$25K per year
      'AE': 40000       // AED 40K per year
    },
    'Child Higher Education': {
      'IN': 1500000,    // ₹15 Lakhs
      'US': 200000,     // $200K
      'GB': 150000,     // £150K
      'CA': 180000,     // C$180K
      'AU': 200000,     // A$200K
      'DE': 50000,      // €50K
      'SG': 150000,     // S$150K
      'AE': 300000      // AED 300K
    },
    'Child Marriage': {
      'IN': 2000000,    // ₹20 Lakhs
      'US': 50000,      // $50K
      'GB': 40000,      // £40K
      'CA': 60000,      // C$60K
      'AU': 70000,      // A$70K
      'DE': 35000,      // €35K
      'SG': 80000,      // S$80K
      'AE': 150000      // AED 150K
    },
    'Emergency Health Fund': {
      'IN': 1000000,    // ₹10 Lakhs
      'US': 100000,     // $100K
      'GB': 80000,      // £80K
      'CA': 120000,     // C$120K
      'AU': 150000,     // A$150K
      'DE': 70000,      // €70K
      'SG': 100000,     // S$100K
      'AE': 200000      // AED 200K
    }
  };

  return costs[eventName]?.[countryCode] || 100000;
};