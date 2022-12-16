import { Stack, Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="details" />
      <Tabs.Screen name="_sitemap" options={{ href: null }} />
      <Tabs.Screen name="[...404]" options={{ href: null }} />
    </Tabs>
  );
}
