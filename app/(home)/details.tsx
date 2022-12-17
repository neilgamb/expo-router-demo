import { View, Text } from "react-native";
import useAuthStore from "../../state/auth";

export default function Details({ navigation, route }) {
  const { isAuthenticated } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>details</Text>
    </View>
  );
}
