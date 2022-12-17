import { useEffect } from "react";
import { View, Text } from "react-native";
import useAuthStore from "../../state/auth";

export default function Home({ route }) {
  const { setQueryParams, setPath } = useAuthStore();

  useEffect(() => {
    if (route.params) {
      setQueryParams(route.params);
    }
    setPath(route.name);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>home</Text>
    </View>
  );
}
