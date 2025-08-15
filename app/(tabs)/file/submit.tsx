import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";
import { useTaxReturn } from "@/contexts/TaxReturnContext";

export default function SubmitReturnScreen() {
  const router = useRouter();
  const { markAsSubmitted } = useTaxReturn();
  const [submitting, setSubmitting] = useState<boolean>(false);

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="submit-screen">
        <Stack.Screen options={{ title: 'Submit return' }} />
        <View style={styles.card}>
          <Text style={styles.h1}>Ready to file</Text>
          <Text style={styles.p}>We will transmit your return securely to the IRS and your state.</Text>

          <View style={styles.navRow}>
            <CTAButton title="Back" variant="secondary" onPress={() => router.back()} />
            <CTAButton title="File my return" onPress={() => {
              setSubmitting(true);
              setTimeout(() => {
                setSubmitting(false);
                markAsSubmitted();
                if (Platform.OS === 'web') (globalThis as any)?.alert?.('Return submitted successfully!');
                else Alert.alert('Success', 'Return submitted successfully!');
                router.replace({ pathname: '/(tabs)/file/receipt' } as any);
              }, 1200);
            }} loading={submitting} testID="file-return" />
          </View>
        </View>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  card: { marginTop: 8, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.light.border },
  h1: { fontSize: 20, fontWeight: '800', color: Colors.light.text },
  p: { fontSize: 14, color: Colors.light.muted, marginTop: 6, marginBottom: 12 },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
});
