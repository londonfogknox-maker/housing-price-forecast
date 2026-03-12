
export interface ForecastYear {
  year: number;
  monthlyMortgage: number;
  monthlyTax: number;
  monthlyInsurance: number;
  totalMonthly: number;
}

export const calculateFloridaForecast = (
  homePrice: number,
  downPayment: number,
  interestRate: number,
  annualTax: number,
  annualInsurance: number,
  insuranceGrowth: number
): ForecastYear[] => {
  const years: ForecastYear[] = [];
  
  // Principal & Interest (Fixed for 30 years)
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const n = 30 * 12; 
  const pAndI = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / 
    (Math.pow(1 + monthlyRate, n) - 1);

  let currentAnnualTax = annualTax;
  let currentAnnualInsurance = annualInsurance;

  for (let i = 1; i <= 30; i++) {
    years.push({
      year: i,
      monthlyMortgage: Math.round(pAndI),
      monthlyTax: Math.round(currentAnnualTax / 12),
      monthlyInsurance: Math.round(currentAnnualInsurance / 12),
      totalMonthly: Math.round(pAndI + (currentAnnualTax / 12) + (currentAnnualInsurance / 12)),
    });

    // --- FLORIDA REALITY CHECK ---
    // Save Our Homes cap: Property tax assessed value increases max 3%
    currentAnnualTax *= 1.03; 
    
    // Insurance: Florida rates are volatile. Let's assume a 7% average increase.
    currentAnnualInsurance *= (1 + (insuranceGrowth / 100));
  }

  return years;
};
