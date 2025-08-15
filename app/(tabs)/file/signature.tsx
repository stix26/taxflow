import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform, Alert, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";

export default function SignatureScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [signed, setSigned] = useState<boolean>(false);

  const valid = useMemo(() => firstName.length > 1 && lastName.length > 1 && pin.length === 5, [firstName, lastName, pin]);

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="signature-screen">
        <Stack.Screen options={{ title: 'Signature' }} />
        <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
          <Text style={styles.h1}>Sign your return</Text>
          <Text style={styles.p}>Type your legal name and a 5-digit self-select PIN to sign electronically.</Text>

          <Text style={styles.label}>First name</Text>
          <TextInput value={firstName} onChangeText={setFirstName} placeholder="Jane" style={styles.input} testID="sig-first" />
          <Text style={styles.label}>Last name</Text>
          <TextInput value={lastName} onChangeText={setLastName} placeholder="Doe" style={styles.input} testID="sig-last" />
          <Text style={styles.label}>5-digit PIN</Text>
          <TextInput value={pin} onChangeText={(t) => setPin(t.replace(/[^0-9]/g,'').slice(0,5))} keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'} placeholder="12345" style={styles.input} testID="sig-pin" />

          <View style={styles.navRow}>
            <CTAButton title="Back" variant="secondary" onPress={() => router.back()} />
            <CTAButton title={signed ? 'Signed' : 'Sign'} onPress={() => {
              if (!valid) {
                if (Platform.OS === 'web') (globalThis as any)?.alert?.('Please complete name and 5-digit PIN.');
                else Alert.alert('Signature', 'Please complete name and 5-digit PIN.');
                return;
              }
              setSigned(true);
              setTimeout(() => router.push({ pathname: '/(tabs)/file/submit' } as any), 200);
            }} disabled={!valid} />
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
});
