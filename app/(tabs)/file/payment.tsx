import React, { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Platform, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";
import { useTaxReturn } from "@/contexts/TaxReturnContext";

interface PaymentForm {
  nameOnCard: string;
  cardNumber: string;
  exp: string;
  cvc: string;
  zip: string;
}

interface BankForm {
  accountHolder: string;
  routingNumber: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | '';
}

export default function PaymentScreen() {
  const router = useRouter();
  const { markAsPaid, taxCalculation } = useTaxReturn();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [form, setForm] = useState<PaymentForm>({ nameOnCard: '', cardNumber: '', exp: '', cvc: '', zip: '' });
  const [bankForm, setBankForm] = useState<BankForm>({ accountHolder: '', routingNumber: '', accountNumber: '', accountType: '' });
  const [loading, setLoading] = useState<boolean>(false);



  const cardValid = useMemo(() => form.nameOnCard.length > 1 && form.cardNumber.replace(/\s+/g,'').length >= 12 && /\d{2}\/\d{2}/.test(form.exp) && form.cvc.length >= 3 && form.zip.length >= 3, [form]);
  const bankValid = useMemo(() => bankForm.accountHolder.length > 1 && bankForm.routingNumber.length === 9 && bankForm.accountNumber.length >= 4 && bankForm.accountType !== '', [bankForm]);
  const valid = paymentMethod === 'card' ? cardValid : bankValid;

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="payment-screen">
        <Stack.Screen options={{ title: 'Payment' }} />
        <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
          <Text style={styles.h1}>Payment & Refund</Text>
          <Text style={styles.p}>Pay your filing fee and set up direct deposit for faster refunds.</Text>

          <View style={styles.feeSection}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Federal filing fee</Text>
              <Text style={styles.feeAmount}>$39.99</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>State filing fee</Text>
              <Text style={styles.feeAmount}>$19.99</Text>
            </View>
            <View style={[styles.feeRow, { borderTopWidth: 1, borderTopColor: Colors.light.border, paddingTop: 8 }]}>
              <Text style={[styles.feeLabel, { fontWeight: '700' }]}>Total</Text>
              <Text style={[styles.feeAmount, { fontWeight: '700', color: Colors.light.tint }]}>$59.98</Text>
            </View>
          </View>

          {taxCalculation.isRefund && (
            <View style={styles.refundSection}>
              <Text style={styles.sectionTitle}>Expected Refund: ${taxCalculation.refundOrOwed.toFixed(2)}</Text>
              <Text style={styles.p}>Choose how you'd like to receive your refund:</Text>
              
              <View style={styles.methodRow}>
                <TouchableOpacity
                  onPress={() => setPaymentMethod('bank')}
                  style={[styles.methodButton, paymentMethod === 'bank' && styles.methodButtonSelected]}
                >
                  <Text style={[styles.methodText, paymentMethod === 'bank' && styles.methodTextSelected]}>Direct Deposit (Faster)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPaymentMethod('card')}
                  style={[styles.methodButton, paymentMethod === 'card' && styles.methodButtonSelected]}
                >
                  <Text style={[styles.methodText, paymentMethod === 'card' && styles.methodTextSelected]}>Paper Check</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          {paymentMethod === 'card' ? (
            <View>
              <Text style={styles.label}>Name on card</Text>
              <TextInput value={form.nameOnCard} onChangeText={(t) => setForm((f) => ({ ...f, nameOnCard: t }))} placeholder="Jane Doe" style={styles.input} testID="card-name" />

              <Text style={styles.label}>Card number</Text>
              <TextInput value={form.cardNumber} onChangeText={(t) => setForm((f) => ({ ...f, cardNumber: t.replace(/[^0-9\s]/g,'') }))} placeholder="4242 4242 4242 4242" keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'} style={styles.input} testID="card-number" />

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Exp (MM/YY)</Text>
                  <TextInput value={form.exp} onChangeText={(t) => setForm((f) => ({ ...f, exp: t }))} placeholder="12/27" style={styles.input} testID="card-exp" />
                </View>
                <View style={{ width: 120 }}>
                  <Text style={styles.label}>CVC</Text>
                  <TextInput value={form.cvc} onChangeText={(t) => setForm((f) => ({ ...f, cvc: t.replace(/[^0-9]/g,'') }))} placeholder="123" keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'} style={styles.input} testID="card-cvc" />
                </View>
              </View>

              <Text style={styles.label}>Billing ZIP</Text>
              <TextInput value={form.zip} onChangeText={(t) => setForm((f) => ({ ...f, zip: t }))} placeholder="12345" keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'} style={styles.input} testID="card-zip" />
            </View>
          ) : (
            <View>
              <Text style={styles.label}>Account holder name</Text>
              <TextInput value={bankForm.accountHolder} onChangeText={(t) => setBankForm((f) => ({ ...f, accountHolder: t }))} placeholder="Jane Doe" style={styles.input} testID="bank-name" />

              <Text style={styles.label}>Routing number</Text>
              <TextInput value={bankForm.routingNumber} onChangeText={(t) => setBankForm((f) => ({ ...f, routingNumber: t.replace(/[^0-9]/g,'').slice(0,9) }))} placeholder="123456789" keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'} style={styles.input} testID="bank-routing" />

              <Text style={styles.label}>Account number</Text>
              <TextInput value={bankForm.accountNumber} onChangeText={(t) => setBankForm((f) => ({ ...f, accountNumber: t.replace(/[^0-9]/g,'') }))} placeholder="1234567890" keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'} style={styles.input} testID="bank-account" />

              <Text style={styles.label}>Account type</Text>
              <View style={styles.methodRow}>
                <TouchableOpacity
                  onPress={() => setBankForm((f) => ({ ...f, accountType: 'checking' }))}
                  style={[styles.methodButton, bankForm.accountType === 'checking' && styles.methodButtonSelected]}
                >
                  <Text style={[styles.methodText, bankForm.accountType === 'checking' && styles.methodTextSelected]}>Checking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setBankForm((f) => ({ ...f, accountType: 'savings' }))}
                  style={[styles.methodButton, bankForm.accountType === 'savings' && styles.methodButtonSelected]}
                >
                  <Text style={[styles.methodText, bankForm.accountType === 'savings' && styles.methodTextSelected]}>Savings</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.navRow}>
            <CTAButton title="Back" variant="secondary" onPress={() => router.back()} />
            <CTAButton title="Pay & continue" onPress={() => {
              if (!valid) {
                if (Platform.OS === 'web') (globalThis as any)?.alert?.('Please enter valid payment details.');
                else Alert.alert('Payment', 'Please enter valid payment details.');
                return;
              }
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                const confirmationNumber = `PAY-${Date.now().toString().slice(-8)}`;
                markAsPaid(confirmationNumber);
                router.push({ pathname: '/(tabs)/file/signature' } as any);
              }, 800);
            }} loading={loading} disabled={!valid} />
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
  label: { fontWeight: '700', color: Colors.light.text, marginTop: 10, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: Colors.light.text },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  feeSection: { backgroundColor: Colors.light.card, borderRadius: 12, padding: 16, marginBottom: 16 },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  feeLabel: { color: Colors.light.text, fontSize: 14 },
  feeAmount: { color: Colors.light.text, fontSize: 14, fontWeight: '600' },
  refundSection: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.light.text, marginBottom: 8 },
  methodRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  methodButton: { flex: 1, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
  methodButtonSelected: { backgroundColor: Colors.light.tint, borderColor: Colors.light.tint },
  methodText: { color: Colors.light.text, fontWeight: '600' },
  methodTextSelected: { color: '#fff' },
});
