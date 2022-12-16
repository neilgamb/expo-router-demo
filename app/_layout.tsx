import { Layout } from "expo-router";
import useAuthStore from "../state/auth";

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore(); // isAuthenticated = false

  return (
    <Layout>
      <Layout.Screen name="(home)" redirect={!isAuthenticated} />
      <Layout.Screen name="signin" redirect={isAuthenticated} />
      <Layout.Children />
    </Layout>
  );
}
