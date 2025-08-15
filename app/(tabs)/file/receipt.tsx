import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { CheckCircle, FileText, CreditCard, Calendar } from "lucide-react-native";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";

interface ReceiptData {
  plan: 'Free' | 'Plus';
  federalFee: number;
  stateFee: number;
  total: number;
  paymentMethod: string;
  refundAmount: number;
  formsIncluded: string[];
}

export default function FilingReceiptScreen() {
  const router = useRouter();
  const conf = Math.floor(100000000 + Math.random() * 900000000).toString();
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    plan: 'Plus',
    federalFee: 39.99,
    stateFee: 19.99,
    total: 59.98,
    paymentMethod: 'Credit Card ending in 4242',
    refundAmount: 0,
    formsIncluded: ['Form 1040', 'Schedule A', 'Schedule B', 'Form W-2', 'State Return']
  });

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        const saved = (globalThis as any)?.localStorage?.getItem("work_draft");
        if (saved) {
          const draft = JSON.parse(saved);
          const federalWithheld = parseFloat(draft.incomeDetails?.w2FederalWithheld?.replace(/[^0-9.-]/g, '') || '0');
          const stateWithheld = parseFloat(draft.incomeDetails?.w2StateWithheld?.replace(/[^0-9.-]/g, '') || '0');
          setReceiptData(prev => ({ ...prev, refundAmount: federalWithheld + stateWithheld }));
        }
      } catch (e) {
        console.log("[receipt] Load saved state failed", e);
      }
    }
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="receipt-screen">
        <Stack.Screen options={{ title: 'Filing Receipt' }} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Success Header */}
          <View style={styles.successHeader}>
            <CheckCircle size={48} color={Colors.light.success || '#10B981'} />
            <Text style={styles.successTitle}>Tax Return Filed Successfully!</Text>
            <Text style={styles.successSubtitle}>Your return has been submitted to the IRS</Text>
          </View>

          {/* Confirmation Details */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Confirmation Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Confirmation Number:</Text>
              <Text style={styles.confirmationNumber}>{conf}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Filing Date:</Text>
              <Text style={styles.detailValue}>{currentDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={[styles.detailValue, { color: Colors.light.success || '#10B981' }]}>Submitted</Text>
            </View>
          </View>

          {/* Plan & Services */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Plan & Services</Text>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{receiptData.plan} Plan</Text>
              <Text style={styles.planPrice}>${receiptData.total.toFixed(2)}</Text>
            </View>
            
            <View style={styles.formsSection}>
              <Text style={styles.formsTitle}>Forms Included:</Text>
              {receiptData.formsIncluded.map((form, index) => (
                <View key={index} style={styles.formRow}>
                  <FileText size={16} color={Colors.light.muted} />
                  <Text style={styles.formName}>{form}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Cost Breakdown</Text>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Federal Filing Fee</Text>
              <Text style={styles.feeAmount}>${receiptData.federalFee.toFixed(2)}</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>State Filing Fee</Text>
              <Text style={styles.feeAmount}>${receiptData.stateFee.toFixed(2)}</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Processing Fee</Text>
              <Text style={styles.feeAmount}>$0.00</Text>
            </View>
            <View style={[styles.feeRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalAmount}>${receiptData.total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentRow}>
              <CreditCard size={20} color={Colors.light.muted} />
              <Text style={styles.paymentMethod}>{receiptData.paymentMethod}</Text>
            </View>
            <Text style={styles.paymentDate}>Charged on {currentDate}</Text>
          </View>

          {/* Refund Information */}
          {receiptData.refundAmount > 0 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Expected Refund</Text>
              <View style={styles.refundRow}>
                <Text style={styles.refundLabel}>Federal Refund:</Text>
                <Text style={styles.refundAmount}>${receiptData.refundAmount.toFixed(2)}</Text>
              </View>
              <Text style={styles.refundNote}>Refunds typically arrive within 21 days when filed electronically with direct deposit.</Text>
            </View>
          )}

          {/* Next Steps */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>What's Next?</Text>
            <View style={styles.nextStepRow}>
              <Calendar size={16} color={Colors.light.muted} />
              <Text style={styles.nextStepText}>We'll email you when the IRS accepts your return</Text>
            </View>
            <View style={styles.nextStepRow}>
              <CheckCircle size={16} color={Colors.light.muted} />
              <Text style={styles.nextStepText}>Track your refund status at IRS.gov</Text>
            </View>
            <View style={styles.nextStepRow}>
              <FileText size={16} color={Colors.light.muted} />
              <Text style={styles.nextStepText}>Keep this receipt for your records</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <CTAButton 
              title="Download Receipt" 
              variant="secondary" 
              onPress={() => {
                if (Platform.OS === 'web') {
                  (globalThis as any)?.alert?.('Receipt download started');
                }
              }} 
            />
            <CTAButton 
              title="Go to Dashboard" 
              onPress={() => router.replace('/(tabs)/(home)')} 
            />
          </View>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.light.background 
  },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 32 
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 24
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.light.text,
    marginTop: 12,
    textAlign: 'center'
  },
  successSubtitle: {
    fontSize: 16,
    color: Colors.light.muted,
    marginTop: 4,
    textAlign: 'center'
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: Colors.light.border,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.light.muted,
    fontWeight: '500'
  },
  detailValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '600'
  },
  confirmationNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.light.tint,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border
  },
  planName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.light.tint
  },
  formsSection: {
    marginTop: 8
  },
  formsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  formName: {
    fontSize: 14,
    color: Colors.light.muted,
    marginLeft: 8
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  feeLabel: {
    fontSize: 14,
    color: Colors.light.text
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
    marginTop: 8
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.light.tint
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  paymentMethod: {
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 8,
    fontWeight: '500'
  },
  paymentDate: {
    fontSize: 12,
    color: Colors.light.muted
  },
  refundRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  refundLabel: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500'
  },
  refundAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.success || '#10B981'
  },
  refundNote: {
    fontSize: 12,
    color: Colors.light.muted,
    fontStyle: 'italic'
  },
  nextStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  nextStepText: {
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 8,
    flex: 1
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8
  }
});
