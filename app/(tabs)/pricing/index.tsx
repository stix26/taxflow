import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";

export default function PricingScreen() {
  const router = useRouter();

  const goStart = useCallback(() => {
    console.log("[Pricing] Start for free from pricing");
    router.push("/(tabs)/file");
  }, [router]);

  return (
    <ErrorBoundary>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} testID="pricing-screen">
        <Text style={styles.title}>Simple, transparent pricing</Text>
        <Text style={styles.subtitle}>Start for free. Only pay when you file.</Text>

        <View style={styles.cardsRow}>
          <View style={styles.card} testID="plan-free">
            <Text style={styles.planName}>Free</Text>
            <Text style={styles.price}>$0</Text>
            <Text style={styles.desc}>Estimate your refund and get started.</Text>
            <CTAButton title="Start for free" onPress={goStart} />
          </View>

          <View style={styles.card} testID="plan-plus">
            <Text style={styles.planName}>Plus</Text>
            <Text style={styles.price}>$39</Text>
            <Text style={styles.desc}>Everything in Free, plus extra forms.</Text>
            <CTAButton title="Choose Plus" onPress={goStart} variant="secondary" />
          </View>
        </View>

        <View style={styles.fineprint}>
          <Text style={styles.fineText}>No account required to explore plans. Create an account only when you’re ready to file.</Text>
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 16, paddingBottom: 28 },
  title: { fontSize: 22, fontWeight: "800", color: Colors.light.text },
  subtitle: { fontSize: 14, color: Colors.light.muted, marginTop: 6 },
  cardsRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  card: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
  },
  planName: { fontSize: 16, fontWeight: "800", color: Colors.light.text },
  price: { fontSize: 24, fontWeight: "900", marginTop: 6, color: Colors.light.tint },
  desc: { color: Colors.light.muted, marginTop: 6 },
  fineprint: { marginTop: 16 },
  fineText: { color: Colors.light.muted },
});
