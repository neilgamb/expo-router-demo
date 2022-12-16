import { Layout } from "expo-router";

export default function RootLayout() {
  return (
    <Layout>
      <Layout.Screen name="(home)/_layout.tsx" />
      <Layout.Screen name="index" />
      <Layout.Children />
    </Layout>
  );
}
