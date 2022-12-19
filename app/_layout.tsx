import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
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
  const { authenticate, isAuthenticated, isAuthenticating, path } =
    useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      navigation.navigate("unauthorized");
    } else if (isAuthenticated) {
      navigation.navigate(`(home)`, { screen: path });
    }
  }, [isAuthenticated, isAuthenticating]);

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <DripsyProvider theme={theme}>
      {isAuthenticating ? (
        <Loading />
      ) : (
        <Layout>
          <Layout.Children />
        </Layout>
      )}
    </DripsyProvider>
  );
}

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" animating />
  </View>
);
