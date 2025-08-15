import React, { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, Image as RNImage, TouchableOpacity, Alert, Platform } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { RotateCcw } from "lucide-react-native";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import Hero from "@/components/Hero";
import FeatureCard, { Feature } from "@/components/FeatureCard";
import Accordion from "@/components/Accordion";
import ReturnStatusCard from "@/components/ReturnStatusCard";
import { useTaxReturn } from "@/contexts/TaxReturnContext";

import faqs from "@/mocks/faqs";

export default function HomeScreen() {
  const router = useRouter();
  const { resetReturn, status } = useTaxReturn();

  const onPrimary = useCallback(() => {
    console.log("[Home] Start for free pressed");
    try {
      router.push("/(tabs)/file");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [router]);

  const onSecondary = useCallback(() => {
    console.log("[Home] See pricing pressed");
    try {
      router.push("/(tabs)/pricing");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [router]);

  const handleStartOver = useCallback(() => {
    console.log("[Home] Start over pressed");

    if (Platform.OS === 'web') {
      try {
        const confirmed = typeof window !== 'undefined' ? window.confirm(
          'Are you sure you want to start over? This will delete all your current tax return data and cannot be undone.'
        ) : true;
        if (confirmed) {
          void (async () => {
            try {
              await resetReturn();
              console.log('[Home] Tax return reset successfully (web)');
            } catch (error) {
              console.error('[Home] Failed to reset tax return (web):', error);
            }
          })();
        }
      } catch (error) {
        console.error('[Home] Web confirm failed, performing hard reset fallback:', error);
        void resetReturn();
      }
      return;
    }

    Alert.alert(
      "Start Over",
      "Are you sure you want to start over? This will delete all your current tax return data and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Start Over",
          style: "destructive",
          onPress: async () => {
            try {
              await resetReturn();
              console.log("[Home] Tax return reset successfully (native)");
            } catch (error) {
              console.error("[Home] Failed to reset tax return (native):", error);
            }
          }
        }
      ]
    );
  }, [resetReturn]);

  const features: Feature[] = useMemo(
    () => [
      { id: "accurate", title: "Accuracy checks", description: "Smart guidance and built‑in checks to help avoid costly mistakes.", icon: "ShieldCheck" },
      { id: "maximize", title: "Maximize refund", description: "We’ll look for credits and deductions tailored to your situation.", icon: "PiggyBank" },
      { id: "guided", title: "Step-by-step", description: "Answer simple questions. We’ll do the math and the forms for you.", icon: "Sparkles" },
    ],
    []
  );

  return (
    <ErrorBoundary>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} testID="home-scroll">
        <Hero onPrimary={onPrimary} onSecondary={onSecondary} />
        
        <ReturnStatusCard />
        
        {(status.step !== 'draft' || status.paidAt || status.submittedAt) && (
          <View style={styles.startOverContainer}>
            <TouchableOpacity 
              style={styles.startOverButton} 
              onPress={handleStartOver}
              testID="start-over-button"
            >
              <RotateCcw size={20} color={Colors.light.danger} />
              <Text style={styles.startOverText}>Start Over</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.row}>
          {features.map((f) => (
            <View key={f.id} style={styles.featureCol}>
              <FeatureCard feature={f} />
            </View>
          ))}
        </View>

        <View style={styles.banner} testID="trust-banner">
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Your taxes, secured</Text>
            <Text style={styles.bannerSubtitle}>Encryption, 2FA, and continuous monitoring keep your info protected.</Text>
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&q=80&auto=format&fit=crop" }}
            style={styles.bannerImg}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently asked questions</Text>
          <Accordion items={faqs} />
        </View>

        <View style={styles.footerCTA}>
          <Text style={styles.footerTitle}>Ready to start?</Text>
          <Text style={styles.footerSubtitle}>It only takes a few minutes to see your estimated refund.</Text>
          <RNImage
            source={{ uri: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop" }}
            style={styles.footerImg}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { paddingBottom: 24 },
  row: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  featureCol: { flex: 1 },
  banner: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
  },
  bannerLeft: { flex: 1, padding: 16, justifyContent: "center" },
  bannerTitle: { fontSize: 18, fontWeight: "800", color: Colors.light.text },
  bannerSubtitle: { fontSize: 14, color: Colors.light.muted, marginTop: 6, lineHeight: 20 },
  bannerImg: { width: 120, height: "100%" as unknown as number, minHeight: 110 },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: Colors.light.text, marginBottom: 12 },
  footerCTA: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    overflow: "hidden",
  },
  footerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  footerSubtitle: { color: "rgba(255,255,255,0.9)", marginTop: 6 },
  footerImg: { height: 140, borderRadius: 12, marginTop: 12 },
  startOverContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  startOverButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  startOverText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.danger,
  },
  bottomPad: { height: 28 },
});