import React, { useState } from 'react';
import { TrendingUp, Shield, Zap, BarChart, PieChart, Calculator } from 'lucide-react';
import { FinancialData, InvestmentOption } from '../types';
import { getCountryByCode } from '../data/countries';

interface Props {
  financialData: FinancialData;
}

const InvestmentStrategies: React.FC<Props> = ({ financialData }) => {
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');

  const selectedCountry = getCountryByCode(financialData.country);
  const currencySymbol = selectedCountry?.symbol || '₹';

  const yearsToRetirement = financialData.retirementAge - financialData.currentAge;
  const monthlySavings = financialData.monthlyIncome - financialData.monthlyExpenses;
  
  // Get country-specific investment options
  const getInvestmentOptions = (strategy: string): InvestmentOption[] => {
    const countryReturns = selectedCountry?.averageReturns || {
      equity: 14,
      debt: 8,
      realEstate: 10,
      gold: 8
    };

    const baseOptions = {
      aggressive: [
        { name: 'Large Cap Equity Funds', allocation: 40, expectedReturn: countryReturns.equity, risk: 'Medium' as const, description: 'Stable large companies with growth potential', taxImplications: 'Long-term capital gains tax applicable' },
        { name: 'Mid & Small Cap Funds', allocation: 30, expectedReturn: countryReturns.equity + 2, risk: 'High' as const, description: 'Higher growth potential with increased volatility', taxImplications: 'Higher tax on short-term gains' },
        { name: 'International Equity', allocation: 20, expectedReturn: countryReturns.equity - 2, risk: 'Medium' as const, description: 'Global diversification and currency hedge', taxImplications: 'Foreign tax credit may apply' },
        { name: 'Debt Funds', allocation: 10, expectedReturn: countryReturns.debt, risk: 'Low' as const, description: 'Stability and capital preservation', taxImplications: 'Taxed as per income slab' }
      ],
      balanced: [
        { name: 'Large Cap Equity Funds', allocation: 50, expectedReturn: countryReturns.equity, risk: 'Medium' as const, description: 'Core equity allocation for steady growth', taxImplications: 'Long-term capital gains tax applicable' },
        { name: 'Mid Cap Funds', allocation: 20, expectedReturn: countryReturns.equity + 1, risk: 'High' as const, description: 'Enhanced growth with moderate risk', taxImplications: 'Higher tax on short-term gains' },
        { name: 'Debt Funds', allocation: 20, expectedReturn: countryReturns.debt, risk: 'Low' as const, description: 'Stability and regular income', taxImplications: 'Taxed as per income slab' },
        { name: 'Gold/Commodity ETFs', allocation: 10, expectedReturn: countryReturns.gold, risk: 'Medium' as const, description: 'Inflation hedge and portfolio diversification', taxImplications: 'Capital gains tax on profits' }
      ],
      conservative: [
        { name: 'Large Cap Equity Funds', allocation: 30, expectedReturn: countryReturns.equity, risk: 'Medium' as const, description: 'Limited equity exposure for growth', taxImplications: 'Long-term capital gains tax applicable' },
        { name: 'Hybrid Funds', allocation: 30, expectedReturn: (countryReturns.equity + countryReturns.debt) / 2, risk: 'Medium' as const, description: 'Balanced equity-debt allocation', taxImplications: 'Mixed taxation based on allocation' },
        { name: 'Debt Funds', allocation: 30, expectedReturn: countryReturns.debt, risk: 'Low' as const, description: 'Capital preservation and steady returns', taxImplications: 'Taxed as per income slab' },
        { name: 'Fixed Deposits/Government Bonds', allocation: 10, expectedReturn: countryReturns.debt - 1, risk: 'Low' as const, description: 'Guaranteed returns and tax benefits', taxImplications: 'TDS applicable on interest' }
      ]
    };

    return baseOptions[strategy as keyof typeof baseOptions] || baseOptions.balanced;
  };

  const strategies = {
    aggressive: {
      title: 'Aggressive Growth',
      subtitle: 'High risk, high reward for long-term growth',
      icon: Zap,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      suitability: yearsToRetirement >= 20 ? 'Highly Suitable' : yearsToRetirement >= 10 ? 'Moderately Suitable' : 'Not Recommended',
      options: getInvestmentOptions('aggressive')
    },
    balanced: {
      title: 'Balanced Growth',
      subtitle: 'Optimal mix of growth and stability',
      icon: BarChart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      suitability: 'Suitable for Most Investors',
      options: getInvestmentOptions('balanced')
    },
    conservative: {
      title: 'Conservative Wealth Preservation',
      subtitle: 'Capital protection with moderate growth',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      suitability: yearsToRetirement <= 10 ? 'Highly Suitable' : 'Conservative Approach',
      options: getInvestmentOptions('conservative')
    }
  };

  const currentStrategy = strategies[selectedStrategy as keyof typeof strategies];
  
  // Calculate weighted expected return
  const weightedReturn = currentStrategy.options.reduce((acc, option) => 
    acc + (option.allocation / 100) * option.expectedReturn, 0
  );

  // Calculate future value with selected strategy
  const monthlyRate = weightedReturn / 100 / 12;
  const months = yearsToRetirement * 12;
  const futureValue = monthlySavings * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  const currentSavingsFuture = financialData.currentSavings * Math.pow(1 + weightedReturn / 100, yearsToRetirement);
  const totalProjected = futureValue + currentSavingsFuture;

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Investment Strategies</h2>
        <p className="text-gray-600">
          Choose the investment approach that aligns with your risk tolerance and timeline
        </p>
      </div>

      {/* Strategy Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(strategies).map(([key, strategy]) => {
          const Icon = strategy.icon;
          const isSelected = selectedStrategy === key;
          
          return (
            <button
              key={key}
              onClick={() => setSelectedStrategy(key)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected 
                  ? `${strategy.borderColor} ${strategy.bgColor} shadow-lg transform scale-105` 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon className={`h-6 w-6 ${isSelected ? strategy.color : 'text-gray-400'}`} />
                <h3 className={`font-semibold ${isSelected ? strategy.color : 'text-gray-600'}`}>
                  {strategy.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{strategy.subtitle}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                strategy.suitability.includes('Highly') ? 'bg-green-100 text-green-700' :
                strategy.suitability.includes('Moderately') ? 'bg-yellow-100 text-yellow-700' :
                strategy.suitability.includes('Not') ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {strategy.suitability}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Strategy Details */}
      <div className={`${currentStrategy.bgColor} rounded-xl p-6 border-2 ${currentStrategy.borderColor} mb-8`}>
        <div className="flex items-center space-x-3 mb-6">
          <currentStrategy.icon className={`h-8 w-8 ${currentStrategy.color}`} />
          <div>
            <h3 className={`text-2xl font-bold ${currentStrategy.color}`}>{currentStrategy.title}</h3>
            <p className="text-gray-600">{currentStrategy.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Allocation */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Asset Allocation</span>
            </h4>
            <div className="space-y-4">
              {currentStrategy.options.map((option, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{option.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{option.allocation}%</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        option.risk === 'Low' ? 'bg-green-100 text-green-700' :
                        option.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {option.risk} Risk
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        option.risk === 'Low' ? 'bg-green-500' :
                        option.risk === 'Medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${option.allocation}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    Expected Return: {option.expectedReturn}% p.a.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projection */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Investment Projection</span>
            </h4>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Investment:</span>
                  <span className="font-semibold">{currencySymbol}{monthlySavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Savings:</span>
                  <span className="font-semibold">{currencySymbol}{(financialData.currentSavings / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold">{weightedReturn.toFixed(1)}% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Investment Period:</span>
                  <span className="font-semibold">{yearsToRetirement} years</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-900">Projected Corpus:</span>
                  <span className={`font-bold ${currentStrategy.color}`}>
                    {currencySymbol}{(totalProjected / 10000000).toFixed(2)} Cr
                  </span>
                </div>
              </div>
            </div>

            {/* Investment Steps */}
            <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-3">Implementation Steps</h5>
              {selectedCountry && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Tax Considerations for {selectedCountry.name}:</strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Income Tax: {selectedCountry.taxRates.income}% | Capital Gains: {selectedCountry.taxRates.capitalGains}%
                  </p>
                </div>
              )}
              <ol className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-medium">1</span>
                  <span>Start SIP in recommended fund categories</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-medium">2</span>
                  <span>Set up automatic monthly investments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-medium">3</span>
                  <span>Review and rebalance portfolio annually</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-medium">4</span>
                  <span>Increase investments with salary increments</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStrategies;