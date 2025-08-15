import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import CTAButton from "@/components/CTAButton";

type FilingData = {
  email: string;
  zip: string;
  filingStatus: "single" | "married" | "hoh" | "";
};

export default function FileScreen() {
  const router = useRouter();
  const [data, setData] = useState<FilingData>({ email: "", zip: "", filingStatus: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const showWebAlert = useCallback((message: string) => {
    try {
      (globalThis as any)?.alert?.(message);
    } catch (e) {
      console.log("[File] Web alert:", message);
    }
  }, []);

  const submit = useCallback(() => {
    console.log("[File] Submit button pressed", data);

    if (!data.email.includes("@") || data.zip.length < 3 || !data.filingStatus) {
      if (Platform.OS === "web") {
        showWebAlert("Please complete all fields correctly.");
      } else {
        Alert.alert("Validation Error", "Please complete all fields correctly.");
      }
      return;
    }

    setLoading(true);
    console.log("[File] Submitting form data", data);

    setTimeout(() => {
      try {
        setLoading(false);
        console.log("[File] Draft created successfully. Navigating to success screen.");
        router.push("/file/success");
      } catch (error) {
        console.error("Form submission error:", error);
        setLoading(false);
        if (Platform.OS === "web") {
          showWebAlert("Something went wrong. Please try again.");
        } else {
          Alert.alert("Error", "Something went wrong. Please try again.");
        }
      }
    }, 800);
  }, [data, router, showWebAlert]);

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="file-screen">
        <Text style={styles.title}>Let’s create your draft</Text>
        <Text style={styles.subtitle}>We’ll save as you go. You can switch devices anytime.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={data.email}
            onChangeText={(t) => setData((s) => ({ ...s, email: t }))}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            testID="input-email"
          />

          <Text style={styles.label}>ZIP code</Text>
          <TextInput
            value={data.zip}
            onChangeText={(t) => setData((s) => ({ ...s, zip: t }))}
            placeholder="12345"
            keyboardType={Platform.OS === "web" ? "default" : "number-pad"}
            style={styles.input}
            testID="input-zip"
          />

          <Text style={styles.label}>Filing status</Text>
          <View style={styles.statusRow}>
            {[
              { id: "single", label: "Single" },
              { id: "married", label: "Married" },
              { id: "hoh", label: "Head of Household" },
            ].map((s) => {
              const selected = data.filingStatus === (s.id as FilingData["filingStatus"]);
              return (
                <TouchableOpacity
                  key={s.id}
                  onPress={() => setData((d) => ({ ...d, filingStatus: s.id as FilingData["filingStatus"] }))}
                  style={[styles.pill, selected && styles.pillSelected]}
                  activeOpacity={0.9}
                  testID={`status-${s.id}`}
                >
                  <Text style={[styles.pillText, selected && styles.pillTextSel]}>{s.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <CTAButton title="Create my draft" onPress={submit} loading={loading} style={styles.submit} testID="submit-file" />
        </View>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", color: Colors.light.text },
  subtitle: { fontSize: 14, color: Colors.light.muted, marginTop: 6 },
  form: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
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
  statusRow: { flexDirection: "row", gap: 8, marginTop: 6 },
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
  submit: { marginTop: 16 },
});