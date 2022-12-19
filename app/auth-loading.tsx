// import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
// import useAuthStore from "../state/auth";

export default function AuthLoading({ navigation }) {
  // const { isAuthenticated, setIsAuthenticated, path } = useAuthStore();

  // useEffect(() => {
  //   if (isAuthenticated) navigation.navigate("(home)", { screen: path });
  // }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" animating />
    </View>
  );
}
