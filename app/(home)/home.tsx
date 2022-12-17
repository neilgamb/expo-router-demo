import { View, Text, TouchableOpacity } from "react-native";
import { useDripsyTheme } from "dripsy";
import useAuthStore from "../../state/auth";

export default function Home({ navigation }) {
  const theme = useDripsyTheme();
  const { setIsAuthenticated } = useAuthStore();

  console.log(theme);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>home</Text>
      <TouchableOpacity
        onPress={() => setIsAuthenticated(false)}
        style={{
          marginTop: 12,
          borderWidth: 1,
          borderColor: "blue",
          paddingHorizontal: 10,
          paddingVertical: 5,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 7,
        }}
      >
        <Text style={{ color: "blue" }}>sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
