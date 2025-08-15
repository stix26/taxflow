import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import ErrorBoundary from '@/components/ErrorBoundary';
import CTAButton from '@/components/CTAButton';
import { calculateStateTax, getStateName, hasStateTax } from '@/constants/stateTaxes';

interface TaxReturnDraft {
  firstName: string;
  lastName: string;
  filingStatus: 'single' | 'married' | 'hoh' | '';
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
  retirementDetails?: {
    iraContribAmount?: string;
  };
  state: string;
}

export default function Preview1040Screen() {
  const router = useRouter();
  const [draft, setDraft] = useState<TaxReturnDraft | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        const saved = (globalThis as any)?.localStorage?.getItem('work_draft');
        if (saved) setDraft(JSON.parse(saved) as TaxReturnDraft);
      } catch (e) {
        console.log('[1040] Load saved state failed', e);
      }
    }
  }, []);

  const fmt = (n: number) => `$${n.toFixed(2)}`;
  const parseAmt = (s: string | undefined) => parseFloat((s ?? '').replace(/[^0-9.-]/g, '')) || 0;

  const computed = useMemo(() => {
    if (!draft) return {
      totalIncome: 0,
      adjustments: 0,
      agi: 0,
      deductions: 0,
      taxableIncome: 0,
      federalTax: 0,
      stateTax: 0,
      fedWithheld: 0,
      stateWithheld: 0,
      refund: 0,
      amountOwed: 0,
    };

    const totalIncome = [
      draft.incomeDetails.w2Wages,
      draft.incomeDetails.nec1099Amount,
      draft.incomeDetails.misc1099Amount,
      draft.incomeDetails.interest1099Amount,
      draft.incomeDetails.dividends1099Amount,
      draft.incomeDetails.otherIncomeAmount,
    ].reduce((sum, a) => sum + parseAmt(a), 0);

    const standard = draft.filingStatus === 'married' ? 29200 : draft.filingStatus === 'hoh' ? 21900 : 14600;

    const iraDeduction = Math.min(parseAmt(draft.retirementDetails?.iraContribAmount ?? ''), 7000);
    const studentLoanAdj = Math.min(parseAmt(draft.deductionDetails.studentLoanInterestAmount), 2500);
    const adjustments = iraDeduction + studentLoanAdj;

    const itemized = [
      draft.deductionDetails.mortgageInterestAmount,
      draft.deductionDetails.charityAmount,
      draft.deductionDetails.educationExpensesAmount,
      draft.deductionDetails.childcareAmount,
      draft.deductionDetails.medicalExpenses,
      draft.deductionDetails.stateLocalTaxes,
      draft.deductionDetails.propertyTaxes,
    ].reduce((sum, a) => sum + parseAmt(a), 0);

    const deductions = draft.deductions.itemize && itemized > standard ? itemized : standard;
    const agi = Math.max(0, totalIncome - adjustments);
    const taxableIncome = Math.max(0, agi - deductions);

    const brackets = draft.filingStatus === 'married'
      ? [[0, 0.10], [23200, 0.12], [94300, 0.22], [201050, 0.24], [383900, 0.32], [487450, 0.35], [731200, 0.37]]
      : [[0, 0.10], [11600, 0.12], [47150, 0.22], [100525, 0.24], [191950, 0.32], [243725, 0.35], [609350, 0.37]];

    let federalTax = 0;
    for (let i = 0; i < brackets.length; i++) {
      const [thr, rate] = brackets[i] as [number, number];
      const next = i < brackets.length - 1 ? (brackets[i + 1] as [number, number])[0] : Infinity;
      const taxableAt = Math.min(Math.max(0, taxableIncome - thr), next - thr);
      federalTax += taxableAt * rate;
    }

    // State tax calculation
    const filingStatusForState = draft.filingStatus === 'married' ? 'married' : draft.filingStatus === 'hoh' ? 'hoh' : 'single';
    const stateTax = calculateStateTax(
      draft.state,
      agi, // Use AGI as base for state tax calculation
      filingStatusForState,
      draft.dependentsCount || 0
    );

    const totalTax = federalTax + stateTax;
    const fedWithheld = parseAmt(draft.incomeDetails.w2FederalWithheld);
    const stateWithheld = parseAmt(draft.incomeDetails.w2StateWithheld);
    const totalWithheld = fedWithheld + stateWithheld;
    
    const refund = Math.max(0, totalWithheld - totalTax);
    const amountOwed = Math.max(0, totalTax - totalWithheld);

    return { totalIncome, adjustments, agi, deductions, taxableIncome, federalTax, stateTax, fedWithheld, stateWithheld, refund, amountOwed };
  }, [draft]);

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="preview-1040-screen">
        <Stack.Screen options={{ title: 'Preview Form 1040' }} />
        <ScrollView contentContainerStyle={styles.card}>
          <Text style={styles.h1}>Form 1040 preview</Text>
          <Text style={styles.p}>Based on your entries. Not a substitute for the official form.</Text>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Filing information</Text>
            <Text style={styles.row}><Text style={styles.keyTxt}>Name: </Text><Text style={styles.valTxt}>{draft ? `${draft.firstName ?? ''} ${draft.lastName ?? ''}`.trim() : '-'}</Text></Text>
            <Text style={styles.row}><Text style={styles.keyTxt}>Status: </Text><Text style={styles.valTxt}>{draft?.filingStatus || '-'}</Text></Text>
            <Text style={styles.row}><Text style={styles.keyTxt}>Dependents: </Text><Text style={styles.valTxt}>{draft?.hasDependents ? String(draft.dependentsCount ?? 0) : draft?.hasDependents === false ? '0' : '-'}</Text></Text>
            <Text style={styles.row}><Text style={styles.keyTxt}>State: </Text><Text style={styles.valTxt}>{draft?.state || '-'}</Text></Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Income</Text>
            <Line label="Wages, salaries, tips" amount={parseAmt(draft?.incomeDetails.w2Wages)} code="1" />
            <Line label="Interest" amount={parseAmt(draft?.incomeDetails.interest1099Amount)} code="2b" />
            <Line label="Dividends" amount={parseAmt(draft?.incomeDetails.dividends1099Amount)} code="3b" />
            <Line label="Business income (1099-NEC/MISC)" amount={parseAmt(draft?.incomeDetails.nec1099Amount) + parseAmt(draft?.incomeDetails.misc1099Amount)} code="8" />
            <Line label="Other income" amount={parseAmt(draft?.incomeDetails.otherIncomeAmount)} code="8z" />
            <Line label="Total income" amount={computed.totalIncome} bold code="9" />
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Adjustments and deductions</Text>
            <Line label="IRA deduction" amount={Math.min(parseAmt(draft?.retirementDetails?.iraContribAmount ?? ''), 7000)} code="10" />
            <Line label="Student loan interest deduction" amount={Math.min(parseAmt(draft?.deductionDetails.studentLoanInterestAmount ?? ''), 2500)} code="10" />
            <Line label="Total adjustments to income" amount={computed.adjustments} code="10" />
            <Line label="Adjusted gross income" amount={computed.agi} bold code="11" />
            <Line label="Standard/itemized deductions" amount={computed.deductions} code="12" />
            <Line label="Taxable income" amount={computed.taxableIncome} bold code="15" />
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Tax and credits</Text>
            <Line label="Federal tax" amount={computed.federalTax} code="16" />
            {draft?.state && hasStateTax(draft.state) && (
              <Line label={`${getStateName(draft.state)} state tax`} amount={computed.stateTax} code="" />
            )}
            <Line label="Total tax" amount={computed.federalTax + computed.stateTax} bold code="" />
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Payments</Text>
            <Line label="Federal income tax withheld" amount={computed.fedWithheld} code="25a" />
            {draft?.state && hasStateTax(draft.state) && (
              <Line label={`${getStateName(draft.state)} state tax withheld`} amount={computed.stateWithheld} code="" />
            )}
            <Line label="Total payments" amount={computed.fedWithheld + computed.stateWithheld} bold code="" />
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Refund or amount you owe</Text>
            <Line label="Refund" amount={computed.refund} bold code="35" highlightPositive />
            <Line label="Amount you owe" amount={computed.amountOwed} bold code="37" highlightNegative />
          </View>

          <View style={styles.navRow}>
            <CTAButton title="Back" variant="secondary" onPress={() => router.back()} />
            <CTAButton title="Continue" onPress={() => router.push('/(tabs)/file/review-submit')} />
          </View>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
}

function Line({ label, amount, code, bold, highlightPositive, highlightNegative }: { label: string; amount: number; code?: string; bold?: boolean; highlightPositive?: boolean; highlightNegative?: boolean; }) {
  const amountTextStyle = [styles.valTxt, bold ? styles.bold : null, highlightPositive && amount > 0 ? styles.positive : null, highlightNegative && amount > 0 ? styles.negative : null];
  return (
    <View style={styles.line}>
      <Text style={styles.lineCode}>{code ?? ''}</Text>
      <Text style={styles.lineLabel}>{label}</Text>
      <Text style={amountTextStyle as any}>${amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  card: { marginTop: 8, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.light.border },
  h1: { fontSize: 20, fontWeight: '800', color: Colors.light.text },
  p: { fontSize: 14, color: Colors.light.muted, marginTop: 6, marginBottom: 12 },
  box: { marginTop: 12, borderWidth: 1, borderColor: Colors.light.card, borderRadius: 12, padding: 12 },
  boxTitle: { fontSize: 16, fontWeight: '700', color: Colors.light.text, marginBottom: 8 },
  row: { marginBottom: 6, color: Colors.light.text } as any,
  keyTxt: { color: Colors.light.muted, fontWeight: '600' },
  valTxt: { color: Colors.light.text, fontWeight: '700' },
  bold: { fontWeight: '800' as const },
  positive: { color: '#10B981' },
  negative: { color: '#EF4444' },
  line: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingVertical: 6 },
  lineCode: { width: 36, color: Colors.light.muted },
  lineLabel: { flex: 1, color: Colors.light.text },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
});
