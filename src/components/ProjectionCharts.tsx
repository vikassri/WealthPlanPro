import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { FinancialData } from '../types';
import { getCountryByCode } from '../data/countries';

interface Props {
  financialData: FinancialData;
}

const ProjectionCharts: React.FC<Props> = ({ financialData }) => {
  const [selectedView, setSelectedView] = useState('growth');

  const selectedCountry = getCountryByCode(financialData.country);
  const currencySymbol = selectedCountry?.symbol || '₹';

  const yearsToRetirement = financialData.retirementAge - financialData.currentAge;
  const monthlySavings = financialData.monthlyIncome - financialData.monthlyExpenses;

  // Generate year-by-year projections
  const generateProjections = () => {
    const projections = [];
    let currentSavings = financialData.currentSavings;
    
    // Calculate life events impact
    const lifeEventsImpact = financialData.lifeEvents.reduce((acc, event) => {
      const year = event.targetAge - financialData.currentAge;
      if (!acc[year]) acc[year] = 0;
      acc[year] += event.estimatedCost;
      return acc;
    }, {} as Record<number, number>);
    
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = financialData.currentAge + year;
      
      // Calculate corpus at this year
      if (year === 0) {
        projections.push({
          year,
          age,
          corpus: currentSavings,
          annualIncome: financialData.monthlyIncome * 12,
          annualExpenses: financialData.monthlyExpenses * 12,
          annualSavings: monthlySavings * 12,
          lifeEventsCost: 0,
          totalInvested: currentSavings,
          netWorth: currentSavings
        });
      } else {
        // Calculate income and expenses with increments
        const annualIncome = financialData.monthlyIncome * 12 * Math.pow(1 + financialData.salaryIncrementRate / 100, year);
        const annualExpenses = financialData.monthlyExpenses * 12 * Math.pow(1 + financialData.expenseIncrementRate / 100, year);
        const annualSavings = annualIncome - annualExpenses;
        
        // Calculate corpus growth
        const previousCorpus = projections[year - 1].corpus;
        const investmentReturns = previousCorpus * (financialData.expectedReturns / 100);
        const lifeEventsCost = lifeEventsImpact[year] || 0;
        
        const newCorpus = previousCorpus + investmentReturns + annualSavings - lifeEventsCost;
        const totalInvested = projections[year - 1].totalInvested + annualSavings;
        
        projections.push({
          year,
          age,
          corpus: Math.max(0, newCorpus),
          annualIncome,
          annualExpenses,
          annualSavings,
          lifeEventsCost,
          totalInvested,
          netWorth: Math.max(0, newCorpus)
        });
      }
    }
    
    return projections;
  };

  const projections = generateProjections();
  const finalCorpus = projections[projections.length - 1].corpus;
  const maxCorpus = Math.max(...projections.map(p => p.corpus));

  // Calculate milestones
  const milestones = [
    { amount: 10000000, label: '1 Cr', achieved: false },
    { amount: 50000000, label: '5 Cr', achieved: false },
    { amount: 100000000, label: '10 Cr', achieved: false },
    { amount: 200000000, label: '20 Cr', achieved: false },
    { amount: 500000000, label: '50 Cr', achieved: false },
  ];

  milestones.forEach(milestone => {
    const achievementYear = projections.find(p => p.corpus >= milestone.amount);
    if (achievementYear) {
      milestone.achieved = true;
      milestone.year = achievementYear.year;
      milestone.age = achievementYear.age;
    }
  });

  const views = [
    { id: 'growth', label: 'Wealth Growth', icon: TrendingUp },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'breakdown', label: 'Year-by-Year', icon: Calendar },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Wealth Growth Projections</h2>
        <p className="text-gray-600">
          Visualize your journey to financial independence
        </p>
      </div>

      {/* View Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedView === view.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Growth Chart View */}
      {selectedView === 'growth' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Wealth Accumulation Over Time</span>
          </h3>
          
          <div className="space-y-4">
            {projections.filter((_, index) => index % 5 === 0 || index === projections.length - 1).map((projection, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium text-gray-600">Year {projection.year}</div>
                  <div className="text-xs text-gray-500">Age {projection.age}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{currencySymbol}{(projection.corpus / 10000000).toFixed(2)} Cr</span>
                    <span className="text-xs text-gray-500">
                      {projection.year > 0 && `+${(((projection.corpus / projections[0].corpus) - 1) * 100).toFixed(0)}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(projection.corpus / maxCorpus) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{currencySymbol}{(finalCorpus / 10000000).toFixed(2)} Cr</div>
              <div className="text-sm text-blue-700">Final Corpus</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{((finalCorpus / projections[projections.length - 1].totalInvested) * 100).toFixed(0)}%</div>
              <div className="text-sm text-green-700">Total Growth</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{currencySymbol}{(projections[projections.length - 1].totalInvested / 10000000).toFixed(2)} Cr</div>
              <div className="text-sm text-purple-700">Total Investment</div>
            </div>
          </div>
        </div>
      )}

      {/* Milestones View */}
      {selectedView === 'milestones' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Wealth Milestones</span>
          </h3>
          
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 ${
                  milestone.achieved 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.achieved 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {milestone.achieved ? '✓' : index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{milestone.label}</div>
                      <div className="text-sm text-gray-600">₹{(milestone.amount / 10000000).toFixed(0)} Crore</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {milestone.achieved ? (
                      <div>
                        <div className="font-semibold text-green-600">Year {milestone.year}</div>
                        <div className="text-sm text-green-700">At age {milestone.age}</div>
                      </div>
                    ) : (
                      <div className="text-gray-500">Not achieved</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Year-by-Year Breakdown */}
      {selectedView === 'breakdown' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Detailed Year-by-Year Breakdown</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-900">Year</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Age</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Corpus</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Annual Income</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Annual Savings</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Total Invested</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Life Events</th>
                  <th className="text-left p-3 font-semibold text-gray-900">ROI</th>
                </tr>
              </thead>
              <tbody>
                {projections.filter((_, index) => index % 3 === 0 || index === projections.length - 1).map((projection, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium">{projection.year}</td>
                    <td className="p-3">{projection.age}</td>
                    <td className="p-3 font-semibold text-blue-600">{currencySymbol}{(projection.corpus / 10000000).toFixed(2)} Cr</td>
                    <td className="p-3">{currencySymbol}{(projection.annualIncome / 100000).toFixed(1)}L</td>
                    <td className="p-3 text-green-600">{currencySymbol}{(projection.annualSavings / 100000).toFixed(1)}L</td>
                    <td className="p-3">{currencySymbol}{(projection.totalInvested / 10000000).toFixed(2)} Cr</td>
                    <td className="p-3 text-red-600">{projection.lifeEventsCost > 0 ? `${currencySymbol}${(projection.lifeEventsCost / 100000).toFixed(1)}L` : '-'}</td>
                    <td className="p-3 text-green-600 font-medium">
                      {projection.year > 0 && projection.totalInvested > 0 ? `+${(((projection.corpus / projection.totalInvested) - 1) * 100).toFixed(0)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectionCharts;