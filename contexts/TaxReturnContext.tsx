import { useState, useEffect, useMemo, useCallback } from 'react';
import { Platform } from 'react-native';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateStateTax } from '@/constants/stateTaxes';

export interface TaxReturnDraft {
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  email: string;
  filingStatus: "single" | "married" | "hoh" | "";
  hasDependents: boolean | null;
  dependentsCount: number | null;
  income: {
    w2: boolean;
    nec1099: boolean;
    misc1099: boolean;
    interest1099: boolean;
    dividends1099: boolean;
    other: string;
  };
  incomeDetails: {
    w2Wages: string;
    w2FederalWithheld: string;
    w2StateWithheld: string;
    nec1099Amount: string;
    misc1099Amount: string;
    interest1099Amount: string;
    dividends1099Amount: string;
    otherIncomeAmount: string;
  };
  deductions: {
    standard: boolean;
    itemize: boolean;
    studentLoanInterest: boolean;
    mortgageInterest: boolean;
    charity: boolean;
    educationExpenses: boolean;
    childcare: boolean;
  };
  deductionDetails: {
    studentLoanInterestAmount: string;
    mortgageInterestAmount: string;
    charityAmount: string;
    educationExpensesAmount: string;
    childcareAmount: string;
    medicalExpenses: string;
    stateLocalTaxes: string;
    propertyTaxes: string;
  };
  state: string;
  health: {
    hadMarketplaceCoverage: boolean;
    hadHsa: boolean;
  };
  education: {
    paidTuition1098T: boolean;
    studentLoanInterestPaid: boolean;
  };
  retirement: {
    iraContrib: boolean;
    rothContrib: boolean;
    employer401k: boolean;
  };
  retirementDetails: {
    iraContribAmount: string;
    rothContribAmount: string;
    employer401kAmount: string;
  };
  payments: {
    madeEstimatedPayments: boolean;
    amountEstimated?: string;
  };
  other: {
    movedStates: boolean;
    disasterRelief: boolean;
    foreignIncome: boolean;
  };
}

export interface TaxCalculation {
  totalIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  selfEmploymentTax: number;
  totalTax: number;
  federalWithheld: number;
  stateWithheld: number;
  estimatedPayments: number;
  refundOrOwed: number;
  isRefund: boolean;
}

export interface ReturnStatus {
  step: 'draft' | 'review' | 'paid' | 'submitted' | 'accepted';
  paidAt?: Date;
  submittedAt?: Date;
  acceptedAt?: Date;
  confirmationNumber?: string;
}

const initialDraft: TaxReturnDraft = {
  firstName: "",
  lastName: "",
  dob: "",
  ssn: "",
  email: "",
  filingStatus: "",
  hasDependents: null,
  dependentsCount: null,
  income: {
    w2: false,
    nec1099: false,
    misc1099: false,
    interest1099: false,
    dividends1099: false,
    other: "",
  },
  incomeDetails: {
    w2Wages: "",
    w2FederalWithheld: "",
    w2StateWithheld: "",
    nec1099Amount: "",
    misc1099Amount: "",
    interest1099Amount: "",
    dividends1099Amount: "",
    otherIncomeAmount: "",
  },
  deductions: {
    standard: true,
    itemize: false,
    studentLoanInterest: false,
    mortgageInterest: false,
    charity: false,
    educationExpenses: false,
    childcare: false,
  },
  deductionDetails: {
    studentLoanInterestAmount: "",
    mortgageInterestAmount: "",
    charityAmount: "",
    educationExpensesAmount: "",
    childcareAmount: "",
    medicalExpenses: "",
    stateLocalTaxes: "",
    propertyTaxes: "",
  },
  state: "",
  health: { hadMarketplaceCoverage: false, hadHsa: false },
  education: { paidTuition1098T: false, studentLoanInterestPaid: false },
  retirement: { iraContrib: false, rothContrib: false, employer401k: false },
  retirementDetails: { iraContribAmount: "", rothContribAmount: "", employer401kAmount: "" },
  payments: { madeEstimatedPayments: false, amountEstimated: "" },
  other: { movedStates: false, disasterRelief: false, foreignIncome: false },
};

const initialStatus: ReturnStatus = {
  step: 'draft'
};

export const [TaxReturnProvider, useTaxReturn] = createContextHook(() => {
  const [draft, setDraft] = useState<TaxReturnDraft>(initialDraft);
  const [status, setStatus] = useState<ReturnStatus>(initialStatus);
  const [loading, setLoading] = useState<boolean>(true);

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        if (Platform.OS === 'web') {
          const savedDraft = (globalThis as any)?.localStorage?.getItem('work_draft');
          const savedStatus = (globalThis as any)?.localStorage?.getItem('return_status');
          
          if (savedDraft) {
            const parsed = JSON.parse(savedDraft) as TaxReturnDraft;
            const safeDraft = {
              ...initialDraft,
              ...parsed,
              income: { ...initialDraft.income, ...parsed.income },
              incomeDetails: { ...initialDraft.incomeDetails, ...parsed.incomeDetails },
              deductions: { ...initialDraft.deductions, ...parsed.deductions },
              deductionDetails: { ...initialDraft.deductionDetails, ...parsed.deductionDetails },
              health: { ...initialDraft.health, ...parsed.health },
              education: { ...initialDraft.education, ...parsed.education },
              retirement: { ...initialDraft.retirement, ...parsed.retirement },
              retirementDetails: { ...initialDraft.retirementDetails, ...parsed.retirementDetails },
              payments: { ...initialDraft.payments, ...parsed.payments },
              other: { ...initialDraft.other, ...parsed.other },
            };
            setDraft(safeDraft);
          }
          
          if (savedStatus) {
            const parsedStatus = JSON.parse(savedStatus) as ReturnStatus;
            setStatus({
              ...parsedStatus,
              paidAt: parsedStatus.paidAt ? new Date(parsedStatus.paidAt) : undefined,
              submittedAt: parsedStatus.submittedAt ? new Date(parsedStatus.submittedAt) : undefined,
              acceptedAt: parsedStatus.acceptedAt ? new Date(parsedStatus.acceptedAt) : undefined,
            });
          }
        } else {
          const savedDraft = await AsyncStorage.getItem('work_draft');
          const savedStatus = await AsyncStorage.getItem('return_status');
          
          if (savedDraft) {
            const parsed = JSON.parse(savedDraft) as TaxReturnDraft;
            const safeDraft = {
              ...initialDraft,
              ...parsed,
              income: { ...initialDraft.income, ...parsed.income },
              incomeDetails: { ...initialDraft.incomeDetails, ...parsed.incomeDetails },
              deductions: { ...initialDraft.deductions, ...parsed.deductions },
              deductionDetails: { ...initialDraft.deductionDetails, ...parsed.deductionDetails },
              health: { ...initialDraft.health, ...parsed.health },
              education: { ...initialDraft.education, ...parsed.education },
              retirement: { ...initialDraft.retirement, ...parsed.retirement },
              retirementDetails: { ...initialDraft.retirementDetails, ...parsed.retirementDetails },
              payments: { ...initialDraft.payments, ...parsed.payments },
              other: { ...initialDraft.other, ...parsed.other },
            };
            setDraft(safeDraft);
          }
          
          if (savedStatus) {
            const parsedStatus = JSON.parse(savedStatus) as ReturnStatus;
            setStatus({
              ...parsedStatus,
              paidAt: parsedStatus.paidAt ? new Date(parsedStatus.paidAt) : undefined,
              submittedAt: parsedStatus.submittedAt ? new Date(parsedStatus.submittedAt) : undefined,
              acceptedAt: parsedStatus.acceptedAt ? new Date(parsedStatus.acceptedAt) : undefined,
            });
          }
        }
      } catch (error) {
        console.log('[TaxReturn] Failed to load saved data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (loading) return;
    
    const saveData = async () => {
      try {
        if (Platform.OS === 'web') {
          (globalThis as any)?.localStorage?.setItem('work_draft', JSON.stringify(draft));
          (globalThis as any)?.localStorage?.setItem('return_status', JSON.stringify(status));
        } else {
          await AsyncStorage.setItem('work_draft', JSON.stringify(draft));
          await AsyncStorage.setItem('return_status', JSON.stringify(status));
        }
      } catch (error) {
        console.log('[TaxReturn] Failed to save data:', error);
      }
    };

    saveData();
  }, [draft, status, loading]);

  // Calculate taxes with proper SE tax calculation
  const taxCalculation = useMemo((): TaxCalculation => {
    const parseAmount = (amount: string): number => {
      return parseFloat(amount?.replace(/[^0-9.-]/g, '') || '0') || 0;
    };

    // Income calculations
    const w2Wages = parseAmount(draft.incomeDetails.w2Wages);
    const nec1099Amount = parseAmount(draft.incomeDetails.nec1099Amount);
    const misc1099Amount = parseAmount(draft.incomeDetails.misc1099Amount);
    const interest1099Amount = parseAmount(draft.incomeDetails.interest1099Amount);
    const dividends1099Amount = parseAmount(draft.incomeDetails.dividends1099Amount);
    const otherIncomeAmount = parseAmount(draft.incomeDetails.otherIncomeAmount);

    const totalIncome = w2Wages + nec1099Amount + misc1099Amount + interest1099Amount + dividends1099Amount + otherIncomeAmount;

    // Self-employment tax calculation (for 1099-NEC)
    const selfEmploymentIncome = nec1099Amount;
    const netSelfEmploymentIncome = selfEmploymentIncome * 0.9235; // 92.35% of SE income
    const selfEmploymentTax = netSelfEmploymentIncome * 0.153; // 15.3% SE tax rate
    const deductibleSETax = selfEmploymentTax * 0.5; // Half of SE tax is deductible

    // Adjusted Gross Income
    let adjustedGrossIncome = totalIncome - deductibleSETax;

    // Deductions
    let totalDeductions = 0;
    if (draft.deductions.standard) {
      // 2024 standard deduction amounts
      const standardDeductions = {
        single: 14600,
        married: 29200,
        hoh: 21900
      };
      totalDeductions = standardDeductions[draft.filingStatus as keyof typeof standardDeductions] || standardDeductions.single;
    } else if (draft.deductions.itemize) {
      totalDeductions = [
        parseAmount(draft.deductionDetails.mortgageInterestAmount),
        parseAmount(draft.deductionDetails.charityAmount),
        parseAmount(draft.deductionDetails.medicalExpenses),
        parseAmount(draft.deductionDetails.stateLocalTaxes),
        parseAmount(draft.deductionDetails.propertyTaxes)
      ].reduce((sum, amount) => sum + amount, 0);
    }

    // Additional deductions (above-the-line)
    const studentLoanInterest = Math.min(parseAmount(draft.deductionDetails.studentLoanInterestAmount), 2500);
    const iraContribution = Math.min(parseAmount(draft.retirementDetails.iraContribAmount), 7000); // 2024 limit
    adjustedGrossIncome -= studentLoanInterest;
    adjustedGrossIncome -= iraContribution;

    const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

    // Federal tax calculation (simplified progressive tax brackets for 2024)
    let federalTax = 0;
    if (draft.filingStatus === 'single') {
      if (taxableIncome > 609350) federalTax += (taxableIncome - 609350) * 0.37;
      if (taxableIncome > 243725) federalTax += Math.min(taxableIncome - 243725, 609350 - 243725) * 0.35;
      if (taxableIncome > 191950) federalTax += Math.min(taxableIncome - 191950, 243725 - 191950) * 0.32;
      if (taxableIncome > 100525) federalTax += Math.min(taxableIncome - 100525, 191950 - 100525) * 0.24;
      if (taxableIncome > 47150) federalTax += Math.min(taxableIncome - 47150, 100525 - 47150) * 0.22;
      if (taxableIncome > 11000) federalTax += Math.min(taxableIncome - 11000, 47150 - 11000) * 0.12;
      if (taxableIncome > 0) federalTax += Math.min(taxableIncome, 11000) * 0.10;
    } else {
      // Simplified calculation for other filing statuses
      federalTax = taxableIncome * 0.22; // Approximate average rate
    }

    // State tax calculation
    const filingStatusForState = draft.filingStatus === 'married' ? 'married' : draft.filingStatus === 'hoh' ? 'hoh' : 'single';
    const stateTax = calculateStateTax(
      draft.state,
      adjustedGrossIncome, // Use AGI as base for state tax calculation
      filingStatusForState,
      draft.dependentsCount || 0
    );

    const totalTax = federalTax + selfEmploymentTax + stateTax;

    // Payments and withholdings
    const federalWithheld = parseAmount(draft.incomeDetails.w2FederalWithheld);
    const stateWithheld = parseAmount(draft.incomeDetails.w2StateWithheld);
    const estimatedPayments = parseAmount(draft.payments.amountEstimated || '0');

    const totalPayments = federalWithheld + stateWithheld + estimatedPayments;
    const refundOrOwed = totalPayments - totalTax;
    const isRefund = refundOrOwed > 0;

    return {
      totalIncome,
      adjustedGrossIncome,
      taxableIncome,
      federalTax,
      stateTax,
      selfEmploymentTax,
      totalTax,
      federalWithheld,
      stateWithheld,
      estimatedPayments,
      refundOrOwed: Math.abs(refundOrOwed),
      isRefund
    };
  }, [draft]);

  const updateDraft = useCallback((updates: Partial<TaxReturnDraft>) => {
    setDraft(prev => ({ ...prev, ...updates }));
  }, []);

  const updateStatus = useCallback((updates: Partial<ReturnStatus>) => {
    setStatus(prev => ({ ...prev, ...updates }));
  }, []);

  const markAsPaid = useCallback((confirmationNumber: string) => {
    setStatus(prev => ({
      ...prev,
      step: 'paid',
      paidAt: new Date(),
      confirmationNumber
    }));
  }, []);

  const markAsSubmitted = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      step: 'submitted',
      submittedAt: new Date()
    }));
  }, []);

  const markAsAccepted = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      step: 'accepted',
      acceptedAt: new Date()
    }));
  }, []);

  const resetReturn = useCallback(async () => {
    console.log('[TaxReturn] Resetting return and clearing storage');

    setDraft({ ...initialDraft });
    setStatus({ step: 'draft' });

    try {
      if (Platform.OS === 'web') {
        (globalThis as any)?.localStorage?.removeItem('work_draft');
        (globalThis as any)?.localStorage?.removeItem('return_status');
        (globalThis as any)?.localStorage?.removeItem('work_step');
      } else {
        await AsyncStorage.removeItem('work_draft');
        await AsyncStorage.removeItem('return_status');
        await AsyncStorage.removeItem('work_step');
      }
      console.log('[TaxReturn] Storage cleared successfully');
    } catch (error) {
      console.log('[TaxReturn] Failed to clear storage:', error);
    }
  }, []);

  return useMemo(() => ({
    draft,
    status,
    taxCalculation,
    loading,
    updateDraft,
    updateStatus,
    markAsPaid,
    markAsSubmitted,
    markAsAccepted,
    resetReturn
  }), [draft, status, taxCalculation, loading, updateDraft, updateStatus, markAsPaid, markAsSubmitted, markAsAccepted, resetReturn]);
});

export const useTaxCalculation = () => {
  const { taxCalculation } = useTaxReturn();
  return taxCalculation;
};

export const useReturnStatus = () => {
  const { status } = useTaxReturn();
  return status;
};