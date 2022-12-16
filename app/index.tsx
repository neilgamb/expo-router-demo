import { View, Text } from "react-native";
import { Link, Stack } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <Link style={{ color: "blue" }} href="/home">
        Go to Home
      </Link>
    </View>
  );
}
