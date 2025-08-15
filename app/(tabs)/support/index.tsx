import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";
import { HELP_ARTICLES } from "@/mocks/faqs";

export default function SupportScreen() {
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(
    () => HELP_ARTICLES.filter((a) => a.title.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <ErrorBoundary>
      <View style={styles.container} testID="support-screen">
        <Text style={styles.title}>How can we help?</Text>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search help articles"
          style={styles.input}
          testID="support-search"
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              testID={`article-${item.id}`}
              onPress={() => router.push(`/(tabs)/support/article/${item.id}` as any)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPreview} numberOfLines={2}>{item.body}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.cardAuthor}>By {item.author}</Text>
                <Text style={styles.cardDate}>{new Date(item.publishedDate).toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", color: Colors.light.text, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  list: { paddingTop: 12, paddingBottom: 24, gap: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardTitle: { fontWeight: "700", fontSize: 15, color: Colors.light.text },
  cardPreview: { fontSize: 13, color: Colors.light.muted, marginTop: 6, lineHeight: 18 },
  cardMeta: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.light.border },
  cardAuthor: { fontSize: 12, color: Colors.light.text, fontWeight: "600" },
  cardDate: { fontSize: 12, color: Colors.light.muted },
});