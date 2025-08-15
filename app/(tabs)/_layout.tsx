// tabs
import { Tabs } from "expo-router";
import React from "react";
import Colors from "@/constants/colors";
import { Home, FileText, LifeBuoy } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false,
        tabBarStyle: { borderTopColor: Colors.light.border },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="file"
        options={{
          title: "File",
          tabBarIcon: ({ color }) => <FileText color={color} />,
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ color }) => <LifeBuoy color={color} />,
        }}
      />
      <Tabs.Screen
        name="pricing"
        options={{
          title: "Pricing",
        }}
      />
    </Tabs>
  );
}