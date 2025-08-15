import React, { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";

interface ReviewData {
  totalIncome: number;
  federalWithheld: number;
  stateWithheld: number;
  totalDeductions: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  federalRefund: number;
  stateRefund: number;
}

interface TaxReturnDraft {
  firstName: string;
  lastName: string;
  filingStatus: "single" | "married" | "hoh" | "";
  hasDependents: boolean | null;
  dependentsCount: number | null;
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
  deductions: {
    standard: boolean;
    itemize: boolean;
  };
  state: string;
}

export default function ReviewSubmitScreen() {
  const router = useRouter();
  const [agreed, setAgreed] = useState<boolean>(false);
  const [draft, setDraft] = useState<TaxReturnDraft | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        const saved = (globalThis as any)?.localStorage?.getItem("work_draft");
        if (saved) {
          const parsed = JSON.parse(saved) as TaxReturnDraft;
          setDraft(parsed);
        }
      } catch (e) {
        console.log("[review] Load saved state failed", e);
      }
    }
  }, []);

  const summary: ReviewData = useMemo(() => {
    if (!draft) {
      return {
        totalIncome: 0,
        federalWithheld: 0,
        stateWithheld: 0,
        totalDeductions: 0,
        taxableIncome: 0,
        federalTax: 0,
        stateTax: 0,
        federalRefund: 0,
        stateRefund: 0,
      };
    }

    const parseAmount = (amount: string): number => {
      return parseFloat(amount.replace(/[^0-9.-]/g, '')) || 0;
    };

    const totalIncome = [
      draft.incomeDetails.w2Wages,
      draft.incomeDetails.nec1099Amount,
      draft.incomeDetails.misc1099Amount,
      draft.incomeDetails.interest1099Amount,
      draft.incomeDetails.dividends1099Amount,
      draft.incomeDetails.otherIncomeAmount,
    ].reduce((sum, amount) => sum + parseAmount(amount), 0);

    const federalWithheld = parseAmount(draft.incomeDetails.w2FederalWithheld);
    const stateWithheld = parseAmount(draft.incomeDetails.w2StateWithheld);

    const standardDeduction = draft.filingStatus === "married" ? 29200 : 
                             draft.filingStatus === "hoh" ? 21900 : 14600;
    
    const itemizedDeductions = [
      draft.deductionDetails.studentLoanInterestAmount,
      draft.deductionDetails.mortgageInterestAmount,
      draft.deductionDetails.charityAmount,
      draft.deductionDetails.educationExpensesAmount,
      draft.deductionDetails.childcareAmount,
      draft.deductionDetails.medicalExpenses,
      draft.deductionDetails.stateLocalTaxes,
      draft.deductionDetails.propertyTaxes,
    ].reduce((sum, amount) => sum + parseAmount(amount), 0);

    const totalDeductions = draft.deductions.itemize && itemizedDeductions > standardDeduction 
      ? itemizedDeductions 
      : standardDeduction;

    const taxableIncome = Math.max(0, totalIncome - totalDeductions);
    
    const federalTax = calculateFederalTax(taxableIncome, draft.filingStatus, draft.dependentsCount || 0);
    const stateTax = calculateStateTax(taxableIncome, draft.state);
    
    const federalRefund = federalWithheld - federalTax;
    const stateRefund = stateWithheld - stateTax;

    return {
      totalIncome,
      federalWithheld,
      stateWithheld,
      totalDeductions,
      taxableIncome,
      federalTax,
      stateTax,
      federalRefund,
      stateRefund,
    };
  }, [draft]);

  function calculateFederalTax(taxableIncome: number, filingStatus: string, dependents: number): number {
    let tax = 0;
    const brackets = filingStatus === "married" 
      ? [[0, 0.10], [23200, 0.12], [94300, 0.22], [201050, 0.24], [383900, 0.32], [487450, 0.35], [731200, 0.37]]
      : [[0, 0.10], [11600, 0.12], [47150, 0.22], [100525, 0.24], [191950, 0.32], [243725, 0.35], [609350, 0.37]];
    
    for (let i = 0; i < brackets.length; i++) {
      const [threshold, rate] = brackets[i];
      const nextThreshold = i < brackets.length - 1 ? brackets[i + 1][0] : Infinity;
      const taxableAtBracket = Math.min(Math.max(0, taxableIncome - threshold), nextThreshold - threshold);
      tax += taxableAtBracket * rate;
    }
    
    const childTaxCredit = Math.min(dependents * 2000, tax);
    return Math.max(0, tax - childTaxCredit);
  };

  function calculateStateTax(taxableIncome: number, state: string): number {
    const stateTaxRates: { [key: string]: number } = {
      "California": 0.08,
      "New York": 0.065,
      "Texas": 0,
      "Florida": 0,
      "Washington": 0,
      "Nevada": 0,
      "Tennessee": 0,
      "Wyoming": 0,
      "South Dakota": 0,
    };
    
    const rate = stateTaxRates[state] || 0.05;
    return taxableIncome * rate;
  };

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="review-submit-screen">
        <Stack.Screen options={{ title: "Review & submit" }} />
        <ScrollView contentContainerStyle={styles.card}>
          <Text style={styles.h1}>Final review</Text>
          <Text style={styles.p}>Look over your totals. You can still edit before filing.</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Total Income</Text>
            <Text style={styles.summaryVal}>${summary.totalIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Total Deductions</Text>
            <Text style={styles.summaryVal}>${summary.totalDeductions.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Taxable Income</Text>
            <Text style={styles.summaryVal}>${summary.taxableIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Federal Tax</Text>
            <Text style={styles.summaryVal}>${summary.federalTax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>State Tax</Text>
            <Text style={styles.summaryVal}>${summary.stateTax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Federal Withheld</Text>
            <Text style={styles.summaryVal}>${summary.federalWithheld.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>State Withheld</Text>
            <Text style={styles.summaryVal}>${summary.stateWithheld.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.summaryRow, { borderBottomWidth: 2, borderBottomColor: Colors.light.tint, marginTop: 12 }]}>
            <Text style={[styles.summaryKey, { fontWeight: '700', fontSize: 16 }]}>Federal Refund</Text>
            <Text style={[styles.summaryVal, { color: summary.federalRefund >= 0 ? '#10B981' : '#EF4444', fontSize: 16 }]}>
              {summary.federalRefund >= 0 ? '+' : ''}${summary.federalRefund.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 2, borderBottomColor: Colors.light.tint }]}>
            <Text style={[styles.summaryKey, { fontWeight: '700', fontSize: 16 }]}>State Refund</Text>
            <Text style={[styles.summaryVal, { color: summary.stateRefund >= 0 ? '#10B981' : '#EF4444', fontSize: 16 }]}>
              {summary.stateRefund >= 0 ? '+' : ''}${summary.stateRefund.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setAgreed((v) => !v)}
            style={[styles.checkRow, agreed && styles.checkRowSel]}
            activeOpacity={0.9}
            testID="agree-accuracy"
          >
            <Text style={[styles.checkLabel, agreed && styles.checkLabelSel]}>I confirm my information is true and correct</Text>
          </TouchableOpacity>

          <View style={styles.navRow}>
            <CTAButton title="Back" variant="secondary" onPress={() => router.back()} />
            <CTAButton title="Preview 1040" variant="secondary" onPress={() => router.push('/(tabs)/file/preview-1040')} />
            <CTAButton title="Continue" onPress={() => {
              if (!agreed) {
                if (Platform.OS === 'web') (globalThis as any)?.alert?.('Please confirm accuracy to continue.');
                else Alert.alert('Hold on', 'Please confirm accuracy to continue.');
                return; 
              }
              router.push({ pathname: '/(tabs)/file/efile-consent' } as any);
            }} disabled={!agreed} />
          </View>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  card: { marginTop: 8, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.light.border },
  h1: { fontSize: 20, fontWeight: '800', color: Colors.light.text },
  p: { fontSize: 14, color: Colors.light.muted, marginTop: 6, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.light.card },
  summaryKey: { color: Colors.light.muted },
  summaryVal: { color: Colors.light.text, fontWeight: '700' },
  checkRow: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: Colors.light.border, marginTop: 12 },
  checkRowSel: { backgroundColor: '#F8FAFF', borderColor: Colors.light.tint },
  checkLabel: { color: Colors.light.text, fontWeight: '600' },
  checkLabelSel: { color: Colors.light.tint },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
});
