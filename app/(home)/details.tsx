import { useEffect } from "react";
import { View, Text } from "react-native";
import useAuthStore from "../../state/auth";

export default function Details({ navigation }) {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) navigation.navigate("signin");
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>details</Text>
    </View>
  );
}
