import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import useAuthStore from "../../state/auth";

export default function Details({ route }) {
  const { setQueryParams, isAuthenticating } = useAuthStore();

  useEffect(() => {
    route.params && setQueryParams(route.params);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isAuthenticating ? (
        <ActivityIndicator size="large" animating />
      ) : (
        <Text>details</Text>
      )}
    </View>
  );
}
