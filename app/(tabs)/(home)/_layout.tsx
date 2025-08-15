import React from "react";
import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "TaxFlow", headerLargeTitle: false }} />
    </Stack>
  );
}