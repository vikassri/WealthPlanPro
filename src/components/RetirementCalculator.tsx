import React from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { FinancialData } from '../types';
import { getCountryByCode } from '../data/countries';

interface Props {
  financialData: FinancialData;
}

const RetirementCalculator: React.FC<Props> = ({ financialData }) => {
  const selectedCountry = getCountryByCode(financialData.country);
  const currencySymbol = selectedCountry?.symbol || '₹';

  // Calculation functions
  const calculateRetirementCorpus = () => {
    const yearsToRetirement = financialData.retirementAge - financialData.currentAge;
    const currentMonthlyExpenses = financialData.monthlyIncome * (financialData.desiredRetirementIncome / 100);
    const inflationAdjustedExpenses = currentMonthlyExpenses * Math.pow(1 + financialData.expectedInflation / 100, yearsToRetirement);
    const annualRetirementExpenses = inflationAdjustedExpenses * 12;
    // Using 4% withdrawal rule for corpus calculation
    const requiredCorpus = annualRetirementExpenses / 0.04;
    return requiredCorpus;
  };

  const calculateLifeEventsCost = () => {
    return financialData.lifeEvents.reduce((total, event) => {
      const yearsFromNow = event.targetAge - financialData.currentAge;
      const inflationAdjustedCost = event.estimatedCost * Math.pow(1 + financialData.expectedInflation / 100, yearsFromNow);
      
      if (event.isRecurring && event.recurringYears) {
        // Calculate present value of recurring payments
        let totalRecurringCost = 0;
        for (let i = 0; i < event.recurringYears; i++) {
          const yearCost = inflationAdjustedCost * Math.pow(1 + financialData.expectedInflation / 100, i);
          totalRecurringCost += yearCost;
        }
        return total + totalRecurringCost;
      }
      
      return total + inflationAdjustedCost;
    }, 0);
  };

  const calculateCurrentProjection = () => {
    const yearsToRetirement = financialData.retirementAge - financialData.currentAge;
    
    // Calculate average monthly savings considering salary and expense increments
    let totalSavings = 0;
    for (let year = 0; year < yearsToRetirement; year++) {
      const yearlyIncome = financialData.monthlyIncome * 12 * Math.pow(1 + financialData.salaryIncrementRate / 100, year);
      const yearlyExpenses = financialData.monthlyExpenses * 12 * Math.pow(1 + financialData.expenseIncrementRate / 100, year);
      totalSavings += (yearlyIncome - yearlyExpenses);
    }
    
    // Future value of current savings
    const futureValueCurrentSavings = financialData.currentSavings * Math.pow(1 + financialData.expectedReturns / 100, yearsToRetirement);
    
    // Future value of variable savings
    const futureValueSavings = totalSavings * Math.pow(1 + financialData.expectedReturns / 100, yearsToRetirement / 2); // Approximate mid-point calculation
    
    return futureValueCurrentSavings + futureValueSavings;
  };

  const requiredCorpus = calculateRetirementCorpus();
  const lifeEventsCost = calculateLifeEventsCost();
  const totalRequiredCorpus = requiredCorpus + lifeEventsCost;
  const projectedCorpus = calculateCurrentProjection();
  const shortfall = totalRequiredCorpus - projectedCorpus;
  const isOnTrack = shortfall <= 0;
  const yearsToRetirement = financialData.retirementAge - financialData.currentAge;
  const monthlySavings = financialData.monthlyIncome - financialData.monthlyExpenses;

  // Calculate additional monthly investment needed
  const additionalMonthlyNeeded = shortfall > 0 ? (() => {
    const monthlyRate = financialData.expectedReturns / 100 / 12;
    const months = yearsToRetirement * 12;
    return shortfall / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  })() : 0;

  const stats = [
    {
      label: 'Required Retirement Corpus',
      value: `${currencySymbol}${(requiredCorpus / 10000000).toFixed(2)} Cr`,
      description: 'Amount needed at retirement',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Target
    },
    {
      label: 'Life Events Cost',
      value: `${currencySymbol}${(lifeEventsCost / 10000000).toFixed(2)} Cr`,
      description: 'Major expenses planned',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Calendar
    },
    {
      label: 'Projected Corpus',
      value: `${currencySymbol}${(projectedCorpus / 10000000).toFixed(2)} Cr`,
      description: 'Based on current savings rate',
      color: isOnTrack ? 'text-green-600' : 'text-orange-600',
      bgColor: isOnTrack ? 'bg-green-50' : 'bg-orange-50',
      icon: TrendingUp
    },
    {
      label: 'Current Monthly Savings',
      value: `${currencySymbol}${monthlySavings.toLocaleString()}`,
      description: 'Available for investments',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      icon: DollarSign
    }
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Retirement Analysis</h2>
        <p className="text-gray-600">
          Based on your financial profile, here's your retirement planning overview
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
              <div className="flex items-center space-x-3 mb-3">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Status Card */}
      <div className={`rounded-xl p-6 mb-8 ${isOnTrack ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
        <div className="flex items-start space-x-4">
          {isOnTrack ? (
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
          ) : (
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
          )}
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 ${isOnTrack ? 'text-green-800' : 'text-red-800'}`}>
              {isOnTrack ? 'Congratulations! You\'re on track!' : 'Action Required: Shortfall Identified'}
            </h3>
            {isOnTrack ? (
              <p className="text-green-700">
                Your current savings and investment plan will help you achieve your retirement goals. 
                You're projected to have a surplus of {currencySymbol}{((projectedCorpus - totalRequiredCorpus) / 10000000).toFixed(2)} Cr!
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-red-700">
                  You have a shortfall of {currencySymbol}{(shortfall / 10000000).toFixed(2)} Cr in your retirement corpus.
                </p>
                <p className="text-red-700 font-semibold">
                  You need to invest an additional {currencySymbol}{additionalMonthlyNeeded.toLocaleString()} per month 
                  to bridge this gap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Calculation Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Current Financial Status</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Income:</span>
                <span className="font-medium">{currencySymbol}{financialData.monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Expenses:</span>
                <span className="font-medium">{currencySymbol}{financialData.monthlyExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Savings:</span>
                <span className="font-medium text-green-600">{currencySymbol}{monthlySavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Savings:</span>
                <span className="font-medium">{currencySymbol}{(financialData.currentSavings / 100000).toFixed(1)} L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Salary Increment:</span>
                <span className="font-medium">{financialData.salaryIncrementRate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expense Increment:</span>
                <span className="font-medium">{financialData.expenseIncrementRate}% p.a.</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Retirement Requirements</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Desired Retirement Income:</span>
                <span className="font-medium">{financialData.desiredRetirementIncome}% of current</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Inflation:</span>
                <span className="font-medium">{financialData.expectedInflation}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Returns:</span>
                <span className="font-medium">{financialData.expectedReturns}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Years to Retirement:</span>
                <span className="font-medium">{yearsToRetirement} years</span>
              </div>
            </div>
          </div>
          
          {financialData.lifeEvents.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-medium text-gray-700">Major Life Events</h5>
              <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
                {financialData.lifeEvents.map((event, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{event.name} (Age {event.targetAge}):</span>
                    <span className="font-medium">{currencySymbol}{event.estimatedCost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;