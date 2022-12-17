import { useEffect } from "react";
import { Layout } from "expo-router";
import { DripsyProvider } from "dripsy";
import theme from "../style/theme";

import useAuthStore from "../state/auth";

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    console.log("initial mount");
  }, []);

  return (
    <DripsyProvider theme={theme}>
      <Layout>
        <Layout.Screen name="(home)" redirect={!isAuthenticated} />
        <Layout.Screen name="signin" redirect={isAuthenticated} />
        <Layout.Children />
      </Layout>
    </DripsyProvider>
  );
}
