import { useEffect } from "react";
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
  const { isAuthenticated, authenticate, path } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) navigation.navigate("signin");
  }, [isAuthenticated]);

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <DripsyProvider theme={theme}>
      <Layout>
        <Layout.Children />
      </Layout>
    </DripsyProvider>
  );
}
