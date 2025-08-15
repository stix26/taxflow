import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";

export default function EfileConsentScreen() {
  const router = useRouter();
  const [consents, setConsents] = useState<{ authorizeEfile: boolean; bankAccountAccuracy: boolean; privacyRead: boolean }>({ authorizeEfile: false, bankAccountAccuracy: false, privacyRead: false });

  const allChecked = useMemo(() => consents.authorizeEfile && consents.bankAccountAccuracy && consents.privacyRead, [consents]);

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="efile-consent-screen">
        <Stack.Screen options={{ title: "E-file consent" }} />
        <ScrollView contentContainerStyle={styles.card}>
          <Text style={styles.h1}>Consent and authorizations</Text>
          <Text style={styles.p}>Please review and acknowledge the following disclosures required to e-file your return.</Text>

          {[
            { key: 'authorizeEfile', text: 'I authorize electronic filing of my federal and state tax returns.' },
            { key: 'bankAccountAccuracy', text: 'I confirm my routing and account information, if provided, is accurate.' },
            { key: 'privacyRead', text: 'I have read and agree to the Privacy Statement and Terms.' },
          ].map((item) => {
            const checked = consents[item.key as keyof typeof consents];
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => setConsents((c) => ({ ...c, [item.key]: !checked }))}
                style={[styles.checkRow, checked && styles.checkRowSel]}
                activeOpacity={0.9}
                testID={`consent-${item.key}`}
              >
                <Text style={[styles.checkLabel, checked && styles.checkLabelSel]}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.navRow}>
            <CTAButton title="Back" variant="secondary" onPress={() => router.back()} />
            <CTAButton
              title="Continue"
              onPress={() => {
                if (!allChecked) {
                  if (Platform.OS === 'web') (globalThis as any)?.alert?.('Please acknowledge all consents.');
                  else Alert.alert('One more step', 'Please acknowledge all consents.');
                  return;
                }
                router.push({ pathname: '/(tabs)/file/payment' } as any);
              }}
              disabled={!allChecked}
              testID="continue-consent"
            />
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
  checkRow: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: Colors.light.border, marginTop: 12 },
  checkRowSel: { backgroundColor: '#F8FAFF', borderColor: Colors.light.tint },
  checkLabel: { color: Colors.light.text, fontWeight: '600' },
  checkLabelSel: { color: Colors.light.tint },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
});
