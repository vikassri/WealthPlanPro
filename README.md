# WealthPlan Pro 💰

A comprehensive, interactive financial planning and retirement calculator that helps users plan their financial future with personalized investment strategies and life event planning.

![WealthPlan Pro](https://img.shields.io/badge/WealthPlan-Pro-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🌍 Multi-Country Support
- **8 Countries Supported**: India, USA, UK, Canada, Australia, Germany, Singapore, UAE
- **Local Currency Display**: Native currency symbols and formatting
- **Country-Specific Economics**: Tailored inflation rates, investment returns, and tax rates
- **Localized Investment Options**: Market-appropriate investment vehicles for each country

### 📊 Advanced Financial Calculations
- **Retirement Corpus Calculation**: Sophisticated algorithms considering inflation and lifestyle needs
- **Salary & Expense Increments**: Annual growth rate modeling for accurate projections
- **Tax-Aware Planning**: Country-specific tax implications for investments
- **4% Withdrawal Rule**: Industry-standard retirement corpus calculation

### 🎯 Life Events Planning
- **Major Life Events**: House purchase, children's education, marriage, health emergencies
- **Smart Cost Estimation**: Country-specific realistic cost projections
- **Recurring Expenses**: Annual costs like school fees, vacation funds
- **Priority System**: High/Medium/Low priority classification
- **Inflation Adjustment**: All future costs adjusted for local inflation rates

### 💼 Investment Strategies
- **Three Strategy Types**:
  - **Aggressive Growth**: High risk, high reward for long-term investors
  - **Balanced Growth**: Optimal mix of growth and stability
  - **Conservative**: Capital protection with moderate growth
- **Asset Allocation**: Detailed breakdown of equity, debt, real estate, and gold
- **Risk Assessment**: Strategies adapt based on time horizon and risk tolerance
- **Implementation Guidance**: Step-by-step investment setup instructions

### 📈 Interactive Projections
- **Wealth Growth Charts**: Visual representation of corpus accumulation over time
- **Milestone Tracking**: Achievement markers for 1 Cr, 5 Cr, 10 Cr, etc.
- **Year-by-Year Breakdown**: Detailed annual projections with income/expense growth
- **Scenario Comparison**: Compare different investment strategies and outcomes

## 🚀 Live Demo

**Live Application**: [https://thriving-taiyaki-0831c9.netlify.app](https://thriving-taiyaki-0831c9.netlify.app)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS for responsive, modern design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Netlify for reliable hosting

## 📱 Screenshots

### Financial Input Form
Clean, intuitive form for capturing user financial data with country selection and life events planning.

### Retirement Analysis
Comprehensive analysis showing required corpus, current projections, and gap analysis with actionable recommendations.

### Investment Strategies
Three distinct investment approaches with detailed asset allocation and expected returns based on country-specific market data.

### Growth Projections
Interactive charts showing wealth accumulation over time with milestone achievements and year-by-year breakdowns.

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wealthplan-pro.git
   cd wealthplan-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📋 Usage Guide

### Step 1: Personal Information
- Select your country from the dropdown
- Enter current age and planned retirement age
- The app automatically adjusts for local economic conditions

### Step 2: Financial Status
- Input monthly income and expenses
- Add current savings amount
- Set salary and expense increment rates

### Step 3: Assumptions & Goals
- Review and adjust inflation expectations
- Set expected investment returns
- Define desired retirement income percentage

### Step 4: Life Events
- Add major life events like house purchase, children's education
- Set target ages and estimated costs
- Configure recurring expenses

### Step 5: Analysis & Strategies
- Review retirement corpus requirements
- Analyze current projection vs. goals
- Explore different investment strategies
- View detailed growth projections

## 🌍 Supported Countries

| Country | Currency | Inflation Rate | Equity Returns | Tax Considerations |
|---------|----------|----------------|----------------|-------------------|
| 🇮🇳 India | INR (₹) | 6.0% | 14% | 30% income, 20% capital gains |
| 🇺🇸 USA | USD ($) | 3.0% | 10% | 25% income, 15% capital gains |
| 🇬🇧 UK | GBP (£) | 2.5% | 9% | 20% income, 10% capital gains |
| 🇨🇦 Canada | CAD (C$) | 2.8% | 9.5% | 26% income, 13% capital gains |
| 🇦🇺 Australia | AUD (A$) | 3.2% | 10.5% | 30% income, 15% capital gains |
| 🇩🇪 Germany | EUR (€) | 2.2% | 8.5% | 42% income, 26% capital gains |
| 🇸🇬 Singapore | SGD (S$) | 2.0% | 9% | 17% income, 0% capital gains |
| 🇦🇪 UAE | AED (د.إ) | 2.5% | 8% | 0% income, 0% capital gains |

## 🧮 Calculation Methodology

### Retirement Corpus Calculation
```
Required Corpus = (Annual Retirement Expenses × 25)
Annual Retirement Expenses = Current Income × Desired % × (1 + Inflation)^Years
```

### Investment Projections
```
Future Value = Present Value × (1 + Return Rate)^Years
SIP Future Value = Monthly SIP × [((1 + r)^n - 1) / r]
```

### Life Events Impact
```
Inflation Adjusted Cost = Current Cost × (1 + Inflation)^Years to Event
```

## 🎨 Design Philosophy

- **Apple-Level Aesthetics**: Clean, sophisticated, and intuitive design
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Micro-Interactions**: Subtle animations and hover effects for enhanced UX
- **Progressive Disclosure**: Complex information revealed contextually

## 🔧 Configuration

### Adding New Countries
1. Update `src/data/countries.ts` with new country data
2. Add currency symbol and economic parameters
3. Update cost estimates in `src/data/lifeEvents.ts`

### Customizing Investment Options
1. Modify `src/components/InvestmentStrategies.tsx`
2. Adjust asset allocation percentages
3. Update expected returns based on market research

## 📊 Data Sources

- **Inflation Rates**: Based on historical averages and central bank targets
- **Investment Returns**: Long-term market averages for each country
- **Tax Rates**: Current tax slabs for income and capital gains
- **Life Event Costs**: Market research and regional cost analysis

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Add proper error handling
- Include unit tests for new features
- Update documentation for new functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React** team for the amazing framework
- **Vite** for lightning-fast development experience

## 📞 Support

For support, email support@wealthplanpro.com or create an issue in this repository.

## 🗺️ Roadmap

- [ ] **Portfolio Tracking**: Real-time investment portfolio monitoring
- [ ] **Goal-Based Planning**: Specific financial goals beyond retirement
- [ ] **Insurance Planning**: Life and health insurance recommendations
- [ ] **Estate Planning**: Will and inheritance planning tools
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **API Integration**: Real-time market data and fund performance
- [ ] **AI Recommendations**: Machine learning-based investment suggestions
- [ ] **Multi-Language Support**: Localization for different languages

---

**Built with ❤️ for financial empowerment and secure retirement planning**

*WealthPlan Pro - Your Personal Financial Advisor*