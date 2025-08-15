import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { HELP_ARTICLES } from "@/mocks/faqs";
import Colors from "@/constants/colors";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = HELP_ARTICLES.find(a => a.id === id);
  
  // Generate a consistent random number for this article
  const randomArticleId = useMemo(() => {
    if (!id) return '000000';
    // Create a simple hash from the article ID to ensure consistency
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Convert to positive 6-digit number
    return Math.abs(hash % 900000 + 100000).toString();
  }, [id]);

  if (!article) {
    return (
      <ErrorBoundary>
        <View style={styles.container}>
          <Text style={styles.errorText}>Article not found</Text>
        </View>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Stack.Screen options={{ title: "" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.articleId}>article/{randomArticleId}</Text>
        <View style={styles.header}>
          <Text style={styles.category}>{article.category}</Text>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.author}>By {article.author}</Text>
            <Text style={styles.date}>{new Date(article.publishedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</Text>
          </View>
        </View>
        
        <View style={styles.bodyContainer}>
          {article.body.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <Text key={index} style={styles.sectionHeader}>
                  {paragraph.replace(/\*\*/g, '')}
                </Text>
              );
            }
            
            if (paragraph.startsWith('• ')) {
              return (
                <Text key={index} style={styles.bulletPoint}>
                  {paragraph}
                </Text>
              );
            }
            
            return (
              <Text key={index} style={styles.bodyText}>
                {paragraph}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  articleId: {
    fontSize: 14,
    color: Colors.light.muted,
    marginBottom: 16,
    fontFamily: "monospace",
  },
  header: {
    marginBottom: 24,
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0066CC",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
    lineHeight: 34,
    marginBottom: 16,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  author: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  date: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  bodyContainer: {
    gap: 16,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: 8,
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 50,
  },
});