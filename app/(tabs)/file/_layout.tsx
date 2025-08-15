import React from "react";
import { Stack } from "expo-router";

export default function FileStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Start filing" }} />
      <Stack.Screen name="success" options={{ title: "Draft created" }} />
      <Stack.Screen name="work" options={{ title: "Work on your return" }} />
      <Stack.Screen name="review-submit" options={{ title: "Review & submit" }} />
      <Stack.Screen name="preview-1040" options={{ title: "Preview Form 1040" }} />
      <Stack.Screen name="efile-consent" options={{ title: "E-file consent" }} />
      <Stack.Screen name="payment" options={{ title: "Payment" }} />
      <Stack.Screen name="signature" options={{ title: "Signature" }} />
      <Stack.Screen name="submit" options={{ title: "Submit return" }} />
      <Stack.Screen name="receipt" options={{ title: "Filing receipt" }} />
    </Stack>
  );
}