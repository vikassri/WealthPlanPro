export interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  inflationRate: number;
  averageReturns: {
    equity: number;
    debt: number;
    realEstate: number;
    gold: number;
  };
  taxRates: {
    income: number;
    capitalGains: number;
  };
}

export interface LifeEvent {
  id: string;
  name: string;
  targetAge: number;
  estimatedCost: number;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Property' | 'Education' | 'Family' | 'Health' | 'Other';
  isRecurring: boolean;
  recurringYears?: number;
}

export interface FinancialData {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  country: string;
  
  // Current Financial Status
  monthlyIncome: number;
  monthlyExpenses: number;
  currentSavings: number;
  
  // Growth Assumptions
  salaryIncrementRate: number;
  expenseIncrementRate: number;
  expectedInflation: number;
  expectedReturns: number;
  desiredRetirementIncome: number;
  
  // Life Events
  lifeEvents: LifeEvent[];
}

export interface InvestmentOption {
  name: string;
  allocation: number;
  expectedReturn: number;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
  taxImplications: string;
}