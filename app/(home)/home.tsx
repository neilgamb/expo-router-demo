import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDripsyTheme } from "dripsy";
import useAuthStore from "../../state/auth";

export default function Home({ route }) {
  const { theme } = useDripsyTheme();
  const { setIsAuthenticated, setQueryParams, setPath } = useAuthStore();

  useEffect(() => {
    if (route.params) {
      setQueryParams(route.params);
    }
    setPath(route.name);
  }, []);

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
