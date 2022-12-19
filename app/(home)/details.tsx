import { useEffect } from "react";
import { View, Text } from "react-native";
import useAuthStore from "../../state/auth";

export default function Details({ route }) {
  const { setQueryParams, setPath } = useAuthStore();

  useEffect(() => {
    setPath(route.name);
    route.params && setQueryParams(route.params);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>details</Text>
    </View>
  );
}
