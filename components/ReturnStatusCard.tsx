import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, Clock, FileText, CreditCard, Send } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useTaxReturn } from '../contexts/TaxReturnContext';

const ReturnStatusCard: React.FC = () => {
  const router = useRouter();
  const { status, taxCalculation } = useTaxReturn();

  if (status.step === 'draft') {
    return null; // Don't show anything if still in draft
  }

  const getStatusInfo = () => {
    switch (status.step) {
      case 'review':
        return {
          icon: <FileText size={24} color={Colors.light.tint} />,
          title: 'Return Ready for Review',
          subtitle: 'Complete your filing process',
          action: 'Continue Filing',
          route: '/(tabs)/file/review-submit'
        };
      case 'paid':
        return {
          icon: <CreditCard size={24} color={Colors.light.success || '#10B981'} />,
          title: 'Payment Processed',
          subtitle: 'Ready to submit your return',
          action: 'Submit Return',
          route: '/(tabs)/file/submit'
        };
      case 'submitted':
        return {
          icon: <Send size={24} color={Colors.light.warning || '#F59E0B'} />,
          title: 'Return Submitted',
          subtitle: 'Waiting for IRS acceptance',
          action: 'View Status',
          route: '/(tabs)/file/receipt'
        };
      case 'accepted':
        return {
          icon: <CheckCircle size={24} color={Colors.light.success || '#10B981'} />,
          title: 'Return Accepted!',
          subtitle: taxCalculation.isRefund ? `Refund: ${taxCalculation.refundOrOwed.toFixed(2)}` : `Amount owed: ${taxCalculation.refundOrOwed.toFixed(2)}`,
          action: 'View Receipt',
          route: '/(tabs)/file/receipt'
        };
      default:
        return null;
    }
  };

  const statusInfo = getStatusInfo();
  if (!statusInfo) return null;

  const getProgressPercentage = () => {
    switch (status.step) {
      case 'review': return 25;
      case 'paid': return 50;
      case 'submitted': return 75;
      case 'accepted': return 100;
      default: return 0;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.push(statusInfo.route as any)}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {statusInfo.icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{statusInfo.title}</Text>
          <Text style={styles.subtitle}>{statusInfo.subtitle}</Text>
        </View>
        <Clock size={16} color={Colors.light.muted} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${getProgressPercentage()}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{getProgressPercentage()}% Complete</Text>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>{statusInfo.action}</Text>
      </View>

      {status.confirmationNumber && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationLabel}>Confirmation:</Text>
          <Text style={styles.confirmationNumber}>{status.confirmationNumber}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.light.card,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.light.tint,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.light.muted,
    fontWeight: '600',
  },
  actionContainer: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.card,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.tint,
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.card,
  },
  confirmationLabel: {
    fontSize: 12,
    color: Colors.light.muted,
    marginRight: 8,
  },
  confirmationNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.text,
    fontFamily: 'monospace',
  },
});

export default ReturnStatusCard;