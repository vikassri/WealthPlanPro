import React, { useState } from 'react';
import { User, DollarSign, Calendar, TrendingUp, Save, Globe, Plus, Trash2 } from 'lucide-react';
import { FinancialData, LifeEvent } from '../types';
import { countries, getCountryByCode } from '../data/countries';
import { commonLifeEvents, getEstimatedCostByCountry } from '../data/lifeEvents';

interface Props {
  onDataSubmit: (data: FinancialData) => void;
  initialData: FinancialData | null;
}

const FinancialInputForm: React.FC<Props> = ({ onDataSubmit, initialData }) => {
  const [formData, setFormData] = useState<FinancialData>(
    initialData || {
      currentAge: 30,
      retirementAge: 60,
      country: 'IN',
      monthlyIncome: 50000,
      monthlyExpenses: 35000,
      currentSavings: 500000,
      salaryIncrementRate: 8,
      expenseIncrementRate: 6,
      expectedInflation: 6,
      expectedReturns: 12,
      desiredRetirementIncome: 80,
      lifeEvents: []
    }
  );

  const selectedCountry = getCountryByCode(formData.country);

  const handleInputChange = (field: keyof FinancialData, value: number) => {
    if (field === 'country' && typeof value === 'string') {
      const country = getCountryByCode(value);
      if (country) {
        setFormData(prev => ({ 
          ...prev, 
          [field]: value,
          expectedInflation: country.inflationRate,
          expectedReturns: country.averageReturns.equity
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addLifeEvent = (eventTemplate: typeof commonLifeEvents[0]) => {
    const newEvent: LifeEvent = {
      id: Date.now().toString(),
      ...eventTemplate,
      targetAge: formData.currentAge + 5,
      estimatedCost: getEstimatedCostByCountry(eventTemplate.name, formData.country)
    };
    setFormData(prev => ({
      ...prev,
      lifeEvents: [...prev.lifeEvents, newEvent]
    }));
  };

  const updateLifeEvent = (id: string, updates: Partial<LifeEvent>) => {
    setFormData(prev => ({
      ...prev,
      lifeEvents: prev.lifeEvents.map(event => 
        event.id === id ? { ...event, ...updates } : event
      )
    }));
  };

  const removeLifeEvent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lifeEvents: prev.lifeEvents.filter(event => event.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataSubmit(formData);
  };

  const inputGroups = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { key: 'country', label: 'Country', type: 'select', options: countries.map(c => ({ value: c.code, label: c.name })) },
        { key: 'currentAge', label: 'Current Age', suffix: 'years', min: 18, max: 65 },
        { key: 'retirementAge', label: 'Planned Retirement Age', suffix: 'years', min: 45, max: 75 },
      ]
    },
    {
      title: 'Current Financial Status',
      icon: DollarSign,
      fields: [
        { key: 'monthlyIncome', label: 'Monthly Income', prefix: selectedCountry?.symbol || '₹', min: 0 },
        { key: 'monthlyExpenses', label: 'Monthly Expenses', prefix: selectedCountry?.symbol || '₹', min: 0 },
        { key: 'currentSavings', label: 'Current Savings', prefix: selectedCountry?.symbol || '₹', min: 0 },
      ]
    },
    {
      title: 'Assumptions & Goals',
      icon: TrendingUp,
      fields: [
        { key: 'salaryIncrementRate', label: 'Annual Salary Increment', suffix: '% p.a.', min: 0, max: 20, step: 0.5 },
        { key: 'expenseIncrementRate', label: 'Annual Expense Increment', suffix: '% p.a.', min: 0, max: 15, step: 0.5 },
        { key: 'expectedInflation', label: 'Expected Inflation Rate', suffix: '% p.a.', min: 3, max: 15, step: 0.5 },
        { key: 'expectedReturns', label: 'Expected Investment Returns', suffix: '% p.a.', min: 5, max: 20, step: 0.5 },
        { key: 'desiredRetirementIncome', label: 'Desired Retirement Income', suffix: '% of current income', min: 50, max: 100, step: 5 },
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Planning Questionnaire</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please provide your current financial details to receive personalized retirement planning recommendations
        </p>
        {selectedCountry && (
          <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Planning for {selectedCountry.name} ({selectedCountry.currency})</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {inputGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <div key={groupIndex} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{group.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.key as keyof FinancialData] as string}
                        onChange={(e) => handleInputChange(field.key as keyof FinancialData, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative">
                        {field.prefix && (
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            {field.prefix}
                          </span>
                        )}
                        <input
                          type="number"
                          value={formData[field.key as keyof FinancialData] as number}
                          onChange={(e) => handleInputChange(field.key as keyof FinancialData, parseFloat(e.target.value) || 0)}
                          min={field.min}
                          max={field.max}
                          step={field.step || 1}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            field.prefix ? 'pl-8' : ''
                          } ${field.suffix ? 'pr-20' : ''}`}
                          required
                        />
                        {field.suffix && (
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            {field.suffix}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Life Events Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Life Events & Major Expenses</h3>
            </div>
          </div>

          {/* Add Life Event Buttons */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Add major life events to get a more accurate financial plan:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonLifeEvents.map((event, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addLifeEvent(event)}
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-700">{event.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Life Events List */}
          {formData.lifeEvents.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Your Life Events:</h4>
              {formData.lifeEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <div className="font-medium text-gray-900">{event.name}</div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        event.priority === 'High' ? 'bg-red-100 text-red-700' :
                        event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {event.priority} Priority
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Target Age</label>
                      <input
                        type="number"
                        value={event.targetAge}
                        onChange={(e) => updateLifeEvent(event.id, { targetAge: parseInt(e.target.value) || formData.currentAge })}
                        min={formData.currentAge}
                        max={formData.retirementAge}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Cost ({selectedCountry?.symbol})
                        {event.isRecurring && ` per year for ${event.recurringYears} years`}
                      </label>
                      <input
                        type="number"
                        value={event.estimatedCost}
                        onChange={(e) => updateLifeEvent(event.id, { estimatedCost: parseFloat(e.target.value) || 0 })}
                        min={0}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeLifeEvent(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {event.isRecurring && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Recurring Years</label>
                        <input
                          type="number"
                          value={event.recurringYears || 1}
                          onChange={(e) => updateLifeEvent(event.id, { recurringYears: parseInt(e.target.value) || 1 })}
                          min={1}
                          max={30}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700">
                  <strong>Total Life Events Cost:</strong> {selectedCountry?.symbol}
                  {formData.lifeEvents.reduce((total, event) => {
                    const cost = event.isRecurring ? event.estimatedCost * (event.recurringYears || 1) : event.estimatedCost;
                    return total + cost;
                  }, 0).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Save className="h-5 w-5" />
            <span>Calculate My Retirement Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialInputForm;