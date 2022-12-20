import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
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
  const { authenticate, isAuthenticated, isAuthenticating } = useAuthStore();
  const { navigate, getCurrentRoute } = useNavigation();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const currentRoute = getCurrentRoute();

    if (!isAuthenticated && !isAuthenticating) {
      navigate("unauthorized");
      setShowLoader(false);
    } else if (currentRoute && isAuthenticated) {
      navigate("(home)", { screen: currentRoute.name });
      setShowLoader(false);
    }
  }, [isAuthenticated, isAuthenticating]);

  useEffect(() => {
    const queryParams = getCurrentRoute()?.params;
    const authCode = queryParams?.authCode;
    const animalOwnerSmsNumber = queryParams?.animalOwnerSmsNumber;
    authenticate({ authCode, animalOwnerSmsNumber });
  }, []);

  return (
    <DripsyProvider theme={theme}>
      {showLoader && <Loading />}
      <Layout>
        <Layout.Children />
      </Layout>
    </DripsyProvider>
  );
}

const Loading = () => (
  <View
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      backgroundColor: "white",
    }}
  >
    <ActivityIndicator size="large" animating />
  </View>
);
