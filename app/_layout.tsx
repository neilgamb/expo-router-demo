import { useEffect } from "react";
import { Layout, useNavigation } from "expo-router";
import { DripsyProvider, View } from "dripsy";
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
  const { authenticate, isAuthenticated, isAuthenticating, queryParams } =
    useAuthStore();
  const { navigate, getCurrentRoute } = useNavigation();

  useEffect(() => {
    const currentRoute = getCurrentRoute();

    if (!isAuthenticated && !isAuthenticating) {
      navigate("unauthorized");
    } else if (currentRoute) {
      navigate("(home)", { screen: currentRoute.name });
    }
  }, [isAuthenticated, isAuthenticating]);

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
