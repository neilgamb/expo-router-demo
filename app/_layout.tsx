import { useEffect, useState } from "react";
import { Layout, useNavigation } from "expo-router";
import { DripsyProvider } from "dripsy";
import { Amplify } from "aws-amplify";
import theme from "../style/theme";
import useAuthStore from "../state/auth";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_ZLOgvbDEE",
    userPoolWebClientId: "44g1gnaev6suhscl9h1aur4pjf",
    authenticationFlowType: "CUSTOM_AUTH",
  },
});

export default function RootLayout() {
  const { isAuthenticated, authenticate, path, queryParams } = useAuthStore();
  const navigation = useNavigation();
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigation.navigate("signin");
    } else {
      navigation.navigate("(home)", { screen: path });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (queryParams && !hasAuthenticated) {
      authenticate(queryParams);
    }
  }, [queryParams]);

  return (
    <DripsyProvider theme={theme}>
      <Layout>
        <Layout.Children />
      </Layout>
    </DripsyProvider>
  );
}
