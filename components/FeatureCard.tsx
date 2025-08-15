import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ShieldCheck, PiggyBank, Sparkles } from "lucide-react-native";
import Colors from "@/constants/colors";

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: "ShieldCheck" | "PiggyBank" | "Sparkles";
};

type Props = {
  feature: Feature;
};

const IconMap = {
  ShieldCheck,
  PiggyBank,
  Sparkles,
};

const FeatureCard = memo(function FeatureCard({ feature }: Props) {
  const IconCmp = IconMap[feature.icon];
  return (
    <View style={styles.card} testID={`feature-${feature.id}`}>
      <View style={styles.iconWrap}>
        <IconCmp color={Colors.light.tint} />
      </View>
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.desc}>{feature.description}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    flex: 1,
    minWidth: 140,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "700", color: Colors.light.text },
  desc: { fontSize: 13, color: Colors.light.muted, marginTop: 6, lineHeight: 18 },
});

export default FeatureCard;