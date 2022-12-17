import { Layout } from "expo-router";
import { DripsyProvider, makeTheme } from "dripsy";

import useAuthStore from "../state/auth";

const theme = makeTheme({});

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore(); // isAuthenticated = false

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
