import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TaxReturnProvider } from "../contexts/TaxReturnContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="modal" options={{ presentation: "transparentModal", headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch((e) => {
      console.log("SplashScreen hide error", e);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TaxReturnProvider>
        {Platform.OS === 'web' ? (
          <View style={{ flex: 1 }}>
            <RootLayoutNav />
          </View>
        ) : (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        )}
      </TaxReturnProvider>
    </QueryClientProvider>
  );
}