import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDripsyTheme } from "dripsy";
import useAuthStore from "../state/auth";

export default function SignIn({ navigation }) {
  const { theme } = useDripsyTheme();
  const { isAuthenticated, setIsAuthenticated, path } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigation.navigate("(home)", { screen: path });
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>sign in</Text>
      <TouchableOpacity
        onPress={() => setIsAuthenticated(true)}
        style={theme.buttons.primaryContainer}
      >
        <Text style={theme.buttons.primaryText}>sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
