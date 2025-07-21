import React, { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, Target, DollarSign, BarChart3 } from 'lucide-react';
import FinancialInputForm from './components/FinancialInputForm';
import RetirementCalculator from './components/RetirementCalculator';
import InvestmentStrategies from './components/InvestmentStrategies';
import ProjectionCharts from './components/ProjectionCharts';
import { FinancialData } from './types';
import { getCountryByCode } from './data/countries';

function App() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  const selectedCountry = financialData ? getCountryByCode(financialData.country) : null;

  const tabs = [
    { id: 'input', label: 'Financial Details', icon: Calculator },
    { id: 'calculator', label: 'Retirement Goal', icon: Target },
    { id: 'strategies', label: 'Investment Plans', icon: TrendingUp },
    { id: 'projections', label: 'Growth Charts', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <PiggyBank className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WealthPlan Pro</h1>
                <p className="text-sm text-gray-600">Your Personal Financial Advisor</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {selectedCountry && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <span className="text-2xl">{selectedCountry.code === 'IN' ? '🇮🇳' : selectedCountry.code === 'US' ? '🇺🇸' : selectedCountry.code === 'GB' ? '🇬🇧' : selectedCountry.code === 'CA' ? '🇨🇦' : selectedCountry.code === 'AU' ? '🇦🇺' : selectedCountry.code === 'DE' ? '🇩🇪' : selectedCountry.code === 'SG' ? '🇸🇬' : '🇦🇪'}</span>
                  <span className="font-semibold">{selectedCountry.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-green-600">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">Secure Your Future</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-2">
          <nav className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = tab.id !== 'input' && !financialData;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id)}
                  disabled={isDisabled}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                      : isDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg min-h-[600px]">
          {activeTab === 'input' && (
            <FinancialInputForm
              onDataSubmit={(data) => {
                setFinancialData(data);
                setActiveTab('calculator');
              }}
              initialData={financialData}
            />
          )}
          
          {activeTab === 'calculator' && financialData && (
            <RetirementCalculator financialData={financialData} />
          )}
          
          {activeTab === 'strategies' && financialData && (
            <InvestmentStrategies financialData={financialData} />
          )}
          
          {activeTab === 'projections' && financialData && (
            <ProjectionCharts financialData={financialData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;