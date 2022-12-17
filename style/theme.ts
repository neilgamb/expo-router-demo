import { makeTheme } from "dripsy";

type MyTheme = typeof theme;

declare module "dripsy" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

const theme = makeTheme({
  buttons: {
    primaryContainer: {
      marginTop: 12,
      borderWidth: 1,
      borderColor: "blue",
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 7,
    },
    primaryText: {
      color: "blue",
    },
  },
});

export default theme;
