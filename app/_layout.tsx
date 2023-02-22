import { ActivityIndicator, View } from "react-native";
import { Layout, useNavigation } from "expo-router";
import { DripsyProvider } from "dripsy";

import theme from "../style/theme";

export default function RootLayout() {
  return (
    <DripsyProvider theme={theme}>
      <Layout>
        <Layout.Children />
      </Layout>
    </DripsyProvider>
  );
}
