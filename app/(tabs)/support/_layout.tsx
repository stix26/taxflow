import React from "react";
import { Stack } from "expo-router";

export default function SupportStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Support" }} />
      <Stack.Screen name="article/[id]" options={{ title: "" }} />
    </Stack>
  );
}