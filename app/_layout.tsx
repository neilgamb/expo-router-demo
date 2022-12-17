import { useEffect } from "react";
import { Layout, useNavigation } from "expo-router";
import { DripsyProvider } from "dripsy";
import theme from "../style/theme";

import useAuthStore from "../state/auth";

export default function RootLayout() {
  const { isAuthenticated, queryParams } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) navigation.navigate("signin");
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("queryParams: ");
    console.log(queryParams);
  }, [queryParams]);

  return (
    <DripsyProvider theme={theme}>
      <Layout>
        {/* <Layout.Screen
          name="(home)"
          redirect={!isAuthenticated}
        />
        <Layout.Screen
          name="signin"
          redirect={isAuthenticated}
        /> */}
        <Layout.Children />
      </Layout>
    </DripsyProvider>
  );
}
