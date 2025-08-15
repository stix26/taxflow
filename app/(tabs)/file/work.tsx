import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";
import { CheckCircle2 } from "lucide-react-native";
import { useTaxReturn, TaxReturnDraft } from "../../../contexts/TaxReturnContext";

type StepKey =
  | "personal"
  | "status"
  | "dependents"
  | "income"
  | "incomeDetails"
  | "deductions"
  | "deductionDetails"
  | "state"
  | "health"
  | "education"
  | "retirement"
  | "retirementDetails"
  | "payments"
  | "other"
  | "review";

const stepsOrder: StepKey[] = [
  "personal",
  "status",
  "dependents",
  "income",
  "incomeDetails",
  "deductions",
  "deductionDetails",
  "state",
  "health",
  "education",
  "retirement",
  "retirementDetails",
  "payments",
  "other",
  "review",
];

export default function WorkOnReturnScreen() {
  const router = useRouter();
  const { draft, updateDraft, updateStatus, taxCalculation } = useTaxReturn();
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        const savedStep = (globalThis as any)?.localStorage?.getItem("work_step");
        if (savedStep) {
          const idx = Number(savedStep);
          if (!Number.isNaN(idx) && idx >= 0 && idx < stepsOrder.length) setStepIndex(idx);
        }
      } catch (e) {
        console.log("[work] Load saved state failed", e);
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        (globalThis as any)?.localStorage?.setItem("work_step", String(stepIndex));
      } catch (e) {
        console.log("[work] Persist failed", e);
      }
    }
  }, [stepIndex]);

  const step = stepsOrder[stepIndex] as StepKey;

  const isValidDOB = useCallback((dob: string): boolean => {
    if (!dob) return false;
    const m = dob.match(/^([0-1]\d)\/(\d{2})\/(\d{4})$/);
    if (!m) return false;
    const month = Number(m[1]);
    const day = Number(m[2]);
    const year = Number(m[3]);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > 2100) return false;
    return true;
  }, []);

  const nextDisabled = useMemo(() => {
    if (step === "personal") {
      return !(draft.firstName && draft.lastName && draft.email.includes("@") && isValidDOB(draft.dob));
    }
    if (step === "status") {
      return draft.filingStatus === "";
    }
    if (step === "dependents") {
      if (draft.hasDependents === null) return true;
      if (draft.hasDependents) return (draft.dependentsCount ?? 0) < 0;
      return false;
    }
    if (step === "incomeDetails") {
      const hasW2 = draft.income?.w2;
      const hasNec = draft.income?.nec1099;
      if (hasW2 && !draft.incomeDetails?.w2Wages) return true;
      if (hasNec && !draft.incomeDetails?.nec1099Amount) return true;
      return false;
    }
    if (step === "state") {
      return draft.state?.trim().length < 2;
    }
    return false;
  }, [draft, step, isValidDOB]);

  const handleNext = useCallback(() => {
    if (stepIndex < stepsOrder.length - 1) {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex]);

  const handleBack = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      updateStatus({ step: 'review' });
      if (Platform.OS === "web") {
        try {
          (globalThis as any)?.alert?.("Your info is saved. You can return anytime.");
        } catch (e) {
          console.log("Saved draft");
        }
      } else {
        Alert.alert("Saved", "Your information has been saved.");
      }
      router.replace("/(tabs)/file");
    }, 700);
  }, [router, updateStatus]);

  const progress = useMemo(() => (stepIndex + 1) / stepsOrder.length, [stepIndex]);

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="work-screen">
        <Stack.Screen
          options={{
            title: "Work on your return",
          }}
        />

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack} />
            <View style={[styles.progressBar, { width: `${Math.round(progress * 100)}%` }]} />
            <Text style={styles.progressLabel}>{`${stepIndex + 1} / ${stepsOrder.length}`}</Text>
          </View>

          {step === "personal" && (
            <View>
              <Text style={styles.h1}>Let's start with your information</Text>
              <Text style={styles.p}>We'll use this information to prepare your tax return and keep your progress saved.</Text>

              <Text style={styles.label}>First name</Text>
              <TextInput
                value={draft.firstName}
                onChangeText={(t) => updateDraft({ firstName: t })}
                placeholder="Jane"
                autoCapitalize="words"
                style={styles.input}
                testID="first-name"
              />

              <Text style={styles.label}>Last name</Text>
              <TextInput
                value={draft.lastName}
                onChangeText={(t) => updateDraft({ lastName: t })}
                placeholder="Doe"
                autoCapitalize="words"
                style={styles.input}
                testID="last-name"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                value={draft.email}
                onChangeText={(t) => updateDraft({ email: t })}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                testID="email"
              />

              <Text style={styles.label}>Date of birth</Text>
              <TextInput
                value={draft.dob}
                onChangeText={(t) => updateDraft({ dob: t })}
                placeholder="MM/DD/YYYY"
                keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                style={styles.input}
                testID="dob"
              />
              <Text style={[styles.p, { marginTop: 4 }]}>We use your age for IRA catch-up limits and other eligibility checks.</Text>

              <Text style={styles.label}>SSN (last 4)</Text>
              <TextInput
                value={draft.ssn}
                onChangeText={(t) => updateDraft({ ssn: t.replace(/[^0-9]/g, "").slice(0, 4) })}
                placeholder="1234"
                keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                style={styles.input}
                testID="ssn"
              />
            </View>
          )}

          {step === "status" && (
            <View>
              <Text style={styles.h1}>What's your filing status?</Text>
              <Text style={styles.p}>Choose the filing status that best describes your situation for this tax year.</Text>
              <View style={styles.row}>
                {[
                  { id: "single", label: "Single" },
                  { id: "married", label: "Married" },
                  { id: "hoh", label: "Head of Household" },
                ].map((s) => {
                  const selected = draft.filingStatus === (s.id as TaxReturnDraft["filingStatus"]);
                  return (
                    <TouchableOpacity
                      key={s.id}
                      onPress={() => updateDraft({ filingStatus: s.id as TaxReturnDraft["filingStatus"] })}
                      style={[styles.pill, selected && styles.pillSelected]}
                      activeOpacity={0.9}
                      testID={`status-${s.id}`}
                    >
                      <Text style={[styles.pillText, selected && styles.pillTextSel]}>{s.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {step === "dependents" && (
            <View>
              <Text style={styles.h1}>Do you have any dependents?</Text>
              <Text style={styles.p}>This includes children, relatives, or others who rely on you for financial support.</Text>
              <View style={styles.row}>
                {[
                  { id: true, label: "Yes" },
                  { id: false, label: "No" },
                ].map((opt) => {
                  const selected = draft.hasDependents === opt.id;
                  return (
                    <TouchableOpacity
                      key={String(opt.id)}
                      onPress={() => updateDraft({ hasDependents: opt.id })}
                      style={[styles.pill, selected && styles.pillSelected]}
                      activeOpacity={0.9}
                      testID={`dependents-${opt.label.toLowerCase()}`}
                    >
                      <Text style={[styles.pillText, selected && styles.pillTextSel]}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {draft.hasDependents && (
                <View style={{ marginTop: 12 }}>
                  <Text style={styles.label}>How many dependents?</Text>
                  <TextInput
                    value={String(draft.dependentsCount ?? "")}
                    onChangeText={(t) => updateDraft({ dependentsCount: Number(t.replace(/[^0-9]/g, "")) || 0 })}
                    placeholder="0"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="dependents-count"
                  />
                </View>
              )}
            </View>
          )}

          {step === "income" && (
            <View>
              <Text style={styles.h1}>What income documents do you have?</Text>
              <Text style={styles.p}>Select all that apply. You'll enter the specific amounts in the next step.</Text>

              {[
                { key: "w2", label: "W-2 (job)" },
                { key: "nec1099", label: "1099-NEC (contract)" },
                { key: "misc1099", label: "1099-MISC" },
                { key: "interest1099", label: "1099-INT (interest)" },
                { key: "dividends1099", label: "1099-DIV (dividends)" },
              ].map((it) => {
                const k = it.key as keyof TaxReturnDraft["income"];
                const selected = Boolean(draft.income[k]);
                return (
                  <TouchableOpacity
                    key={it.key}
                    onPress={() => updateDraft({ income: { ...draft.income, [k]: !selected } })}
                    style={[styles.checkRow, selected && styles.checkRowSel]}
                    activeOpacity={0.9}
                    testID={`income-${it.key}`}
                  >
                    <CheckCircle2 color={selected ? Colors.light.tint : Colors.light.border} />
                    <Text style={[styles.checkLabel, selected && styles.checkLabelSel]}>{it.label}</Text>
                  </TouchableOpacity>
                );
              })}

              <Text style={[styles.label, { marginTop: 12 }]}>Other income (optional)</Text>
              <TextInput
                value={draft.income.other}
                onChangeText={(t) => updateDraft({ income: { ...draft.income, other: t } })}
                placeholder="Rental, crypto, etc."
                style={styles.input}
                testID="income-other"
              />
            </View>
          )}

          {step === "incomeDetails" && (
            <View>
              <Text style={styles.h1}>Enter your income amounts</Text>
              <Text style={styles.p}>Please enter the exact amounts from your tax documents (W-2, 1099 forms, etc.).</Text>

              {draft.income?.w2 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>W-2 Income</Text>
                  <Text style={styles.label}>Wages (Box 1)</Text>
                  <TextInput
                    value={draft.incomeDetails?.w2Wages || ""}
                    onChangeText={(t) => updateDraft({ incomeDetails: { ...draft.incomeDetails, w2Wages: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="w2-wages"
                  />
                  <Text style={styles.label}>Federal tax withheld (Box 2)</Text>
                  <TextInput
                    value={draft.incomeDetails?.w2FederalWithheld || ""}
                    onChangeText={(t) => updateDraft({ incomeDetails: { ...draft.incomeDetails, w2FederalWithheld: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="w2-federal-withheld"
                  />
                  <Text style={styles.label}>State tax withheld (Box 17)</Text>
                  <TextInput
                    value={draft.incomeDetails?.w2StateWithheld || ""}
                    onChangeText={(t) => updateDraft({ incomeDetails: { ...draft.incomeDetails, w2StateWithheld: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="w2-state-withheld"
                  />
                </View>
              )}

              {draft.income?.nec1099 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>1099-NEC Income</Text>
                  <Text style={styles.label}>Nonemployee compensation (Box 1)</Text>
                  <TextInput
                    value={draft.incomeDetails?.nec1099Amount || ""}
                    onChangeText={(t) => updateDraft({ incomeDetails: { ...draft.incomeDetails, nec1099Amount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="nec1099-amount"
                  />
                </View>
              )}
            </View>
          )}

          {step === "deductions" && (
            <View>
              <Text style={styles.h1}>Tax Deductions</Text>
              <Text style={styles.p}>Choose between taking the standard deduction or itemizing your deductions for maximum tax savings.</Text>
              <View style={styles.row}>
                {[{ id: 'standard', label: 'Standard deduction' }, { id: 'itemize', label: 'Itemize' }].map((opt) => {
                  const selected = (draft.deductions as any)[opt.id];
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      onPress={() => {
                        if (opt.id === 'standard') {
                          updateDraft({ deductions: { ...draft.deductions, standard: true, itemize: false } });
                        } else {
                          updateDraft({ deductions: { ...draft.deductions, standard: false, itemize: true } });
                        }
                      }}
                      style={[styles.pill, selected && styles.pillSelected]}
                      activeOpacity={0.9}
                      testID={`deduction-${opt.id}`}
                    >
                      <Text style={[styles.pillText, selected && styles.pillTextSel]}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{ marginTop: 12 }}>
                {[{ key: 'studentLoanInterest', label: 'Student loan interest' }, { key: 'mortgageInterest', label: 'Mortgage interest' }, { key: 'charity', label: 'Charitable donations' }, { key: 'educationExpenses', label: 'Education expenses' }, { key: 'childcare', label: 'Childcare' }].map((it) => {
                  const k = it.key as keyof typeof draft.deductions;
                  const selected = Boolean(draft.deductions[k]);
                  return (
                    <TouchableOpacity
                      key={it.key}
                      onPress={() => updateDraft({ deductions: { ...draft.deductions, [k]: !selected } })}
                      style={[styles.checkRow, selected && styles.checkRowSel]}
                      activeOpacity={0.9}
                      testID={`deductions-${it.key}`}
                    >
                      <CheckCircle2 color={selected ? Colors.light.tint : Colors.light.border} />
                      <Text style={[styles.checkLabel, selected && styles.checkLabelSel]}>{it.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {step === "deductionDetails" && (
            <View>
              <Text style={styles.h1}>Deduction Details</Text>
              <Text style={styles.p}>Enter the amounts for each deduction you selected. These will help reduce your taxable income.</Text>

              <Text style={styles.label}>Student loan interest</Text>
              <TextInput
                value={draft.deductionDetails.studentLoanInterestAmount ?? ""}
                onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, studentLoanInterestAmount: t } })}
                placeholder="$0.00"
                keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                style={styles.input}
                testID="deduct-student-loan"
              />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Traditional IRA</Text>
                <Text style={styles.label}>IRA contribution amount</Text>
                <TextInput
                  value={draft.retirementDetails.iraContribAmount ?? ""}
                  onChangeText={(t) => updateDraft({ retirementDetails: { ...draft.retirementDetails, iraContribAmount: t } })}
                  placeholder="$0.00"
                  keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                  style={styles.input}
                  testID="deduct-ira"
                />
                <Text style={[styles.p, { fontSize: 12, marginTop: 4 }]}>2024 limit: $7,000 ($8,000 if age 50 or older by 12/31/2024). Deductible if eligible.</Text>
              </View>

              {draft.deductions.itemize && (
                <View>
                  <Text style={styles.label}>Mortgage interest</Text>
                  <TextInput
                    value={draft.deductionDetails.mortgageInterestAmount ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, mortgageInterestAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-mortgage"
                  />
                  <Text style={styles.label}>Charitable donations</Text>
                  <TextInput
                    value={draft.deductionDetails.charityAmount ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, charityAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-charity"
                  />
                  <Text style={styles.label}>Education expenses</Text>
                  <TextInput
                    value={draft.deductionDetails.educationExpensesAmount ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, educationExpensesAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-education"
                  />
                  <Text style={styles.label}>Childcare expenses</Text>
                  <TextInput
                    value={draft.deductionDetails.childcareAmount ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, childcareAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-childcare"
                  />
                  <Text style={styles.label}>Medical expenses</Text>
                  <TextInput
                    value={draft.deductionDetails.medicalExpenses ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, medicalExpenses: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-medical"
                  />
                  <Text style={styles.label}>State and local taxes</Text>
                  <TextInput
                    value={draft.deductionDetails.stateLocalTaxes ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, stateLocalTaxes: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-salt"
                  />
                  <Text style={styles.label}>Property taxes</Text>
                  <TextInput
                    value={draft.deductionDetails.propertyTaxes ?? ""}
                    onChangeText={(t) => updateDraft({ deductionDetails: { ...draft.deductionDetails, propertyTaxes: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="deduct-property"
                  />
                </View>
              )}
            </View>
          )}

          {step === "state" && (
            <View>
              <Text style={styles.h1}>State Information</Text>
              <Text style={styles.p}>Enter your state of residence for this tax year. This determines your state tax obligations.</Text>
              <Text style={styles.label}>State</Text>
              <TextInput
                value={draft.state}
                onChangeText={(t) => updateDraft({ state: t })}
                placeholder="CA"
                autoCapitalize="characters"
                style={styles.input}
                testID="state"
              />
            </View>
          )}

          {step === "health" && (
            <View>
              <Text style={styles.h1}>Health Coverage</Text>
              <Text style={styles.p}>Tell us about your health insurance coverage and health savings accounts for this tax year.</Text>
              {[{ key: 'hadMarketplaceCoverage', label: 'Had Marketplace (ACA) coverage' }, { key: 'hadHsa', label: 'Had a Health Savings Account (HSA)' }].map((it) => {
                const k = it.key as keyof typeof draft.health;
                const selected = Boolean(draft.health[k]);
                return (
                  <TouchableOpacity
                    key={it.key}
                    onPress={() => updateDraft({ health: { ...draft.health, [k]: !selected } })}
                    style={[styles.checkRow, selected && styles.checkRowSel]}
                    activeOpacity={0.9}
                    testID={`health-${it.key}`}
                  >
                    <CheckCircle2 color={selected ? Colors.light.tint : Colors.light.border} />
                    <Text style={[styles.checkLabel, selected && styles.checkLabelSel]}>{it.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {step === "education" && (
            <View>
              <Text style={styles.h1}>Education Expenses</Text>
              <Text style={styles.p}>Information about education-related forms, tuition payments, and student loan interest.</Text>
              {[{ key: 'paidTuition1098T', label: 'Paid tuition (Form 1098-T)' }, { key: 'studentLoanInterestPaid', label: 'Paid student loan interest' }].map((it) => {
                const k = it.key as keyof typeof draft.education;
                const selected = Boolean(draft.education[k]);
                return (
                  <TouchableOpacity
                    key={it.key}
                    onPress={() => updateDraft({ education: { ...draft.education, [k]: !selected } })}
                    style={[styles.checkRow, selected && styles.checkRowSel]}
                    activeOpacity={0.9}
                    testID={`education-${it.key}`}
                  >
                    <CheckCircle2 color={selected ? Colors.light.tint : Colors.light.border} />
                    <Text style={[styles.checkLabel, selected && styles.checkLabelSel]}>{it.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {step === "retirement" && (
            <View>
              <Text style={styles.h1}>Retirement Contributions</Text>
              <Text style={styles.p}>Did you make contributions to retirement accounts this year? These may be tax-deductible.</Text>
              {[{ key: 'iraContrib', label: 'Traditional IRA' }, { key: 'rothContrib', label: 'Roth IRA' }, { key: 'employer401k', label: 'Employer 401(k)' }].map((it) => {
                const k = it.key as keyof typeof draft.retirement;
                const selected = Boolean(draft.retirement[k]);
                return (
                  <TouchableOpacity
                    key={it.key}
                    onPress={() => updateDraft({ retirement: { ...draft.retirement, [k]: !selected } })}
                    style={[styles.checkRow, selected && styles.checkRowSel]}
                    activeOpacity={0.9}
                    testID={`retirement-${it.key}`}
                  >
                    <CheckCircle2 color={selected ? Colors.light.tint : Colors.light.border} />
                    <Text style={[styles.checkLabel, selected && styles.checkLabelSel]}>{it.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {step === "retirementDetails" && (
            <View>
              <Text style={styles.h1}>Retirement Contribution Amounts</Text>
              <Text style={styles.p}>Enter the amounts you contributed to each retirement account. Traditional IRA contributions may be tax-deductible.</Text>
              
              {draft.retirement.iraContrib && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Traditional IRA</Text>
                  <Text style={styles.label}>Contribution amount</Text>
                  <TextInput
                    value={draft.retirementDetails.iraContribAmount}
                    onChangeText={(t) => updateDraft({ retirementDetails: { ...draft.retirementDetails, iraContribAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="ira-contrib-amount"
                  />
                  <Text style={[styles.p, { fontSize: 12, marginTop: 4 }]}>2024 limit: $7,000 ($8,000 if age 50+ by 12/31/2024)</Text>
                </View>
              )}
              
              {draft.retirement.rothContrib && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Roth IRA</Text>
                  <Text style={styles.label}>Contribution amount</Text>
                  <TextInput
                    value={draft.retirementDetails.rothContribAmount}
                    onChangeText={(t) => updateDraft({ retirementDetails: { ...draft.retirementDetails, rothContribAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="roth-contrib-amount"
                  />
                  <Text style={[styles.p, { fontSize: 12, marginTop: 4 }]}>2024 limit: $7,000 ($8,000 if 50 or older). Not tax-deductible.</Text>
                </View>
              )}
              
              {draft.retirement.employer401k && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Employer 401(k)</Text>
                  <Text style={styles.label}>Your contribution amount</Text>
                  <TextInput
                    value={draft.retirementDetails.employer401kAmount}
                    onChangeText={(t) => updateDraft({ retirementDetails: { ...draft.retirementDetails, employer401kAmount: t } })}
                    placeholder="$0.00"
                    keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                    style={styles.input}
                    testID="401k-contrib-amount"
                  />
                  <Text style={[styles.p, { fontSize: 12, marginTop: 4 }]}>2024 limit: $23,000 ($30,500 if 50 or older). Pre-tax contributions reduce taxable income.</Text>
                </View>
              )}
              
              {!draft.retirement.iraContrib && !draft.retirement.rothContrib && !draft.retirement.employer401k && (
                <View style={styles.section}>
                  <Text style={styles.p}>No retirement contributions selected. Go back to the previous step to select your retirement accounts.</Text>
                </View>
              )}
            </View>
          )}

          {step === "payments" && (
            <View>
              <Text style={styles.h1}>Tax Payments</Text>
              <Text style={styles.p}>Enter any estimated tax payments you made directly to the IRS during the tax year.</Text>
              <View>
                <TouchableOpacity
                  onPress={() => updateDraft({ payments: { ...draft.payments, madeEstimatedPayments: !draft.payments.madeEstimatedPayments } })}
                  style={[styles.checkRow, draft.payments.madeEstimatedPayments && styles.checkRowSel]}
                  activeOpacity={0.9}
                  testID={`payments-estimated-toggle`}
                >
                  <CheckCircle2 color={draft.payments.madeEstimatedPayments ? Colors.light.tint : Colors.light.border} />
                  <Text style={[styles.checkLabel, draft.payments.madeEstimatedPayments && styles.checkLabelSel]}>Made estimated payments</Text>
                </TouchableOpacity>
                {draft.payments.madeEstimatedPayments && (
                  <View style={{ marginTop: 12 }}>
                    <Text style={styles.label}>Total estimated paid</Text>
                    <TextInput
                      value={draft.payments.amountEstimated ?? ''}
                      onChangeText={(t) => updateDraft({ payments: { ...draft.payments, amountEstimated: t } })}
                      placeholder="$0.00"
                      keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
                      style={styles.input}
                      testID="payments-amount"
                    />
                  </View>
                )}
              </View>
            </View>
          )}

          {step === "other" && (
            <View>
              <Text style={styles.h1}>Other Tax Situations</Text>
              <Text style={styles.p}>A few additional questions about special circumstances that may affect your taxes.</Text>
              {[{ key: 'movedStates', label: 'I moved states' }, { key: 'disasterRelief', label: 'Qualified disaster relief' }, { key: 'foreignIncome', label: 'Foreign income' }].map((it) => {
                const k = it.key as keyof typeof draft.other;
                const selected = Boolean(draft.other[k]);
                return (
                  <TouchableOpacity
                    key={it.key}
                    onPress={() => updateDraft({ other: { ...draft.other, [k]: !selected } })}
                    style={[styles.checkRow, selected && styles.checkRowSel]}
                    activeOpacity={0.9}
                    testID={`other-${it.key}`}
                  >
                    <CheckCircle2 color={selected ? Colors.light.tint : Colors.light.border} />
                    <Text style={[styles.checkLabel, selected && styles.checkLabelSel]}>{it.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {step === "review" && (
            <View>
              <Text style={styles.h1}>Review Your Tax Return</Text>
              <Text style={styles.p}>Please review your information below. You can always go back and edit any section if needed.</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Name</Text>
                <Text style={styles.summaryVal}>{`${draft.firstName || "-"} ${draft.lastName || ""}`.trim()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Email</Text>
                <Text style={styles.summaryVal}>{draft.email || "-"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Status</Text>
                <Text style={styles.summaryVal}>{draft.filingStatus || "-"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Total Income</Text>
                <Text style={styles.summaryVal}>${taxCalculation.totalIncome.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Self-Employment Tax</Text>
                <Text style={styles.summaryVal}>${taxCalculation.selfEmploymentTax.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Federal Tax</Text>
                <Text style={styles.summaryVal}>${taxCalculation.federalTax.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Total Tax</Text>
                <Text style={styles.summaryVal}>${taxCalculation.totalTax.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>{taxCalculation.isRefund ? 'Refund' : 'Amount Owed'}</Text>
                <Text style={[styles.summaryVal, { color: taxCalculation.isRefund ? Colors.light.success || '#10B981' : Colors.light.danger || '#EF4444' }]}>
                  ${taxCalculation.refundOrOwed.toFixed(2)}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.navRow}>
            <CTAButton title="Back" onPress={handleBack} variant="secondary" disabled={stepIndex === 0} testID="back-btn" />
            {step === "review" ? (
              <View style={{ flexDirection: "row", gap: 12, flex: 1 }}>
                <CTAButton title="Save & exit" onPress={handleSubmit} loading={submitting} testID="save-exit-btn" />
                <CTAButton title="Review & submit" onPress={() => router.push("/file/review-submit")} testID="go-review-btn" />
              </View>
            ) : (
              <CTAButton title="Continue" onPress={handleNext} disabled={nextDisabled} testID="next-btn" />
            )}
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  card: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  progressWrap: { marginBottom: 12 },
  progressTrack: { position: "absolute", left: 0, right: 0, height: 6, borderRadius: 999, backgroundColor: Colors.light.card },
  progressBar: { position: "absolute", left: 0, height: 6, borderRadius: 999, backgroundColor: Colors.light.tint },
  progressLabel: { marginTop: 8, color: Colors.light.muted, fontWeight: "600" },
  h1: { fontSize: 20, fontWeight: "800", color: Colors.light.text },
  p: { fontSize: 14, color: Colors.light.muted, marginTop: 6, marginBottom: 12 },
  label: { fontWeight: "700", color: Colors.light.text, marginTop: 10, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.light.text,
  },
  row: { flexDirection: "row", gap: 8, marginTop: 6, flexWrap: "wrap" as const },
  pill: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  pillSelected: { backgroundColor: "#EEF2FF", borderColor: Colors.light.tint },
  pillText: { color: Colors.light.muted, fontWeight: "600" },
  pillTextSel: { color: Colors.light.tint },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginTop: 8,
  },
  checkRowSel: { backgroundColor: "#F8FAFF", borderColor: Colors.light.tint },
  checkLabel: { color: Colors.light.text, fontWeight: "600" },
  checkLabelSel: { color: Colors.light.tint },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.light.card },
  summaryKey: { color: Colors.light.muted },
  summaryVal: { color: Colors.light.text, fontWeight: "700" },
  navRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  section: { marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.light.card },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.light.text, marginBottom: 8 },
});