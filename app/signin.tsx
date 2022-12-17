import { View, Text, TouchableOpacity } from "react-native";
import useAuthStore from "../state/auth";

export default function SignIn() {
  const { setIsAuthenticated } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>sign in</Text>
      <TouchableOpacity
        onPress={() => setIsAuthenticated(true)}
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
        <Text style={{ color: "blue" }}>sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
