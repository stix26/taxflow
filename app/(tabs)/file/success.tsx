import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";
import { useRouter } from "expo-router";

export default function DraftSuccessScreen() {
  const router = useRouter();
  return (
    <ErrorBoundary>
      <View style={styles.container} testID="file-success">
        <Text style={styles.title}>Draft Created Successfully</Text>
        <Text style={styles.subtitle}>Your tax return draft has been saved. You can continue working on it anytime from any device.</Text>
        <View style={styles.actions}>
          <CTAButton title="Work on your return" onPress={() => router.replace({ pathname: "/(tabs)/file/work" } as any)} />
          <CTAButton title="View draft" variant="secondary" onPress={() => router.replace("/file")} />
        </View>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", color: Colors.light.text },
  subtitle: { fontSize: 14, color: Colors.light.muted, marginTop: 6 },
  actions: { flexDirection: "row", gap: 12, marginTop: 16 },
});