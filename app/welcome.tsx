import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Welcome() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <Link style={{ color: "blue" }} href="/home">
        Go to Home
      </Link>
    </View>
  );
}
