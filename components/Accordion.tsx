import React, { memo, useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import Colors from "@/constants/colors";
import { ChevronDown } from "lucide-react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type FAQ = { id: string; q: string; a: string };

type Props = {
  items: FAQ[];
};

const Accordion = memo(function Accordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback(
    (id: string) => {
      if (Platform.OS !== 'web') {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      setOpenId((prev) => (prev === id ? null : id));
    },
    [setOpenId]
  );

  return (
    <View style={styles.wrapper} testID="accordion">
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <View key={item.id} style={styles.item}>
            <TouchableOpacity
              onPress={() => toggle(item.id)}
              activeOpacity={0.8}
              style={styles.header}
              testID={`accordion-header-${item.id}`}
            >
              <Text style={styles.q}>{item.q}</Text>
              <View style={[styles.chev, open && styles.chevOpen]}>
                <ChevronDown color={Colors.light.muted} />
              </View>
            </TouchableOpacity>
            {open ? (
              <View style={styles.body} testID={`accordion-body-${item.id}`}>
                <Text style={styles.a}>{item.a}</Text>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: Colors.light.border },
  item: { backgroundColor: "#fff" },
  header: { paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  q: { fontSize: 15, fontWeight: "700", color: Colors.light.text, flex: 1, paddingRight: 12 },
  chev: { transform: [{ rotate: "0deg" }] },
  chevOpen: { transform: [{ rotate: "180deg" }] },
  body: { paddingHorizontal: 16, paddingBottom: 14 },
  a: { color: Colors.light.muted, fontSize: 14, lineHeight: 20 },
});

export default Accordion;