import React from "react";
import { Stack } from "expo-router";

export default function PricingStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pricing" }} />
    </Stack>
  );
}
