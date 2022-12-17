import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDripsyTheme } from "dripsy";
import useAuthStore from "../../state/auth";

export default function Home({ navigation }) {
  const { theme } = useDripsyTheme();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) navigation.navigate("signin");
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>home</Text>
      <TouchableOpacity
        onPress={() => setIsAuthenticated(false)}
        style={theme.buttons.primaryContainer}
      >
        <Text style={theme.buttons.primaryText}>sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
