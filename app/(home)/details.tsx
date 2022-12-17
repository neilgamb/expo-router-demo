import { useEffect } from "react";
import { View, Text } from "react-native";
import useAuthStore from "../../state/auth";

export default function Details({ route }) {
  const { setQueryParams } = useAuthStore();

  useEffect(() => {
    const queryParams = route.params;
    if (queryParams) {
      setQueryParams(queryParams);
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>details</Text>
    </View>
  );
}
