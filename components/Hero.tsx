import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CTAButton from "./CTAButton";
import Colors from "@/constants/colors";

type Props = {
  onPrimary?: () => void;
  onSecondary?: () => void;
};

const Hero = memo(function Hero({ onPrimary, onSecondary }: Props) {
  console.log('[Hero] Rendered with callbacks:', { onPrimary: !!onPrimary, onSecondary: !!onSecondary });
  
  return (
    <LinearGradient
      colors={[Colors.light.gradientStart, Colors.light.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.inner} testID="hero">
        <View style={styles.badge}>
          <Text style={styles.badgeText}>TaxFlow</Text>
        </View>
        <Text style={styles.header}>File taxes with confidence</Text>
        <Text style={styles.subheader}>
          Simple guided steps, built-in checks, and on-demand support to help you maximize your refund.
        </Text>
        <View style={styles.actions}>
          <CTAButton title="Start for free" onPress={onPrimary} />
          <CTAButton title="See pricing" variant="secondary" onPress={onSecondary} />
        </View>
        <Text style={styles.trust}>Trusted by 2M+ filers • Bank-grade security</Text>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 16,
    marginTop: 16,
  },
  inner: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    alignItems: "center",
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: { color: "#fff", fontWeight: "700", letterSpacing: 0.3 },
  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  subheader: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  trust: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 12,
  },
});

export default Hero;