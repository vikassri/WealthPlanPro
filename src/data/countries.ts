import { Country } from '../types';

export const countries: Country[] = [
  {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    symbol: '₹',
    inflationRate: 6.0,
    averageReturns: {
      equity: 14,
      debt: 8,
      realEstate: 10,
      gold: 8
    },
    taxRates: {
      income: 30,
      capitalGains: 20
    }
  },
  {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    inflationRate: 3.0,
    averageReturns: {
      equity: 10,
      debt: 5,
      realEstate: 8,
      gold: 6
    },
    taxRates: {
      income: 25,
      capitalGains: 15
    }
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    inflationRate: 2.5,
    averageReturns: {
      equity: 9,
      debt: 4,
      realEstate: 7,
      gold: 5
    },
    taxRates: {
      income: 20,
      capitalGains: 10
    }
  },
  {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    symbol: 'C$',
    inflationRate: 2.8,
    averageReturns: {
      equity: 9.5,
      debt: 4.5,
      realEstate: 7.5,
      gold: 5.5
    },
    taxRates: {
      income: 26,
      capitalGains: 13
    }
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    symbol: 'A$',
    inflationRate: 3.2,
    averageReturns: {
      equity: 10.5,
      debt: 5.5,
      realEstate: 8.5,
      gold: 6.5
    },
    taxRates: {
      income: 30,
      capitalGains: 15
    }
  },
  {
    code: 'DE',
    name: 'Germany',
    currency: 'EUR',
    symbol: '€',
    inflationRate: 2.2,
    averageReturns: {
      equity: 8.5,
      debt: 3.5,
      realEstate: 6.5,
      gold: 4.5
    },
    taxRates: {
      income: 42,
      capitalGains: 26
    }
  },
  {
    code: 'SG',
    name: 'Singapore',
    currency: 'SGD',
    symbol: 'S$',
    inflationRate: 2.0,
    averageReturns: {
      equity: 9,
      debt: 4,
      realEstate: 7,
      gold: 5
    },
    taxRates: {
      income: 17,
      capitalGains: 0
    }
  },
  {
    code: 'AE',
    name: 'UAE',
    currency: 'AED',
    symbol: 'د.إ',
    inflationRate: 2.5,
    averageReturns: {
      equity: 8,
      debt: 5,
      realEstate: 9,
      gold: 6
    },
    taxRates: {
      income: 0,
      capitalGains: 0
    }
  }
];

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(country => country.code === code);
};