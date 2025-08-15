import React, { memo, useMemo, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, Platform } from "react-native";
import Colors from "@/constants/colors";

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  disabled?: boolean;
};

const CTAButton = memo(function CTAButton({
  title,
  onPress,
  loading = false,
  variant = "primary",
  style,
  textStyle,
  testID,
  disabled = false,
}: Props) {
  const buttonStyle = useMemo(() => {
    const base: ViewStyle[] = [styles.button];
    if (variant === "primary") base.push(styles.primary);
    if (variant === "secondary") base.push(styles.secondary);
    if (disabled) base.push(styles.disabled);
    if (style) base.push(style);
    return base;
  }, [variant, style, disabled]);

  const labelStyle = useMemo(() => {
    const base: TextStyle[] = [styles.label];
    if (variant === "secondary") base.push(styles.labelSecondary);
    if (textStyle) base.push(textStyle);
    return base;
  }, [variant, textStyle]);

  const handlePress = useCallback(() => {
    if (!disabled && !loading && onPress) {
      console.log(`[CTAButton] ${title} pressed`);
      onPress();
    }
  }, [disabled, loading, onPress, title]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.9}
      testID={testID ?? "cta-button"}
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" ? Colors.light.tint : "#fff"} />
      ) : (
        <Text style={labelStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: Colors.light.tint,
  },
  secondary: {
    backgroundColor: "#E5E7EB",
  },
  disabled: {
    opacity: Platform.OS === "web" ? 0.7 : 0.6,
  },
  label: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  labelSecondary: {
    color: Colors.light.tint,
  },
});

export default CTAButton;