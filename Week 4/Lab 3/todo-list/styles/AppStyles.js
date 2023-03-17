import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    padding: 32,
  },
  backgroundCover: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.6,
    padding: 16,
  },
  lightText: {
    color: "#fff",
  },
 
  errorText: {
    color: "#ff0000",
  },
  header: {
    fontSize: 20,
    padding: 15,
    alignSelf:"center"
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 12,
    color: "#fff",
  },
  inlineTextButton: {
    color: "#b2d8d8",
    padding: 0,
    margin: 0,
  },
  pressedInlineButton: {
    color: "#b2d8d8",
    opacity: 0.6,
  },
  rightAligned: {
    justifyContent: "flex-end",
  },
  darkTextInput: {
    borderBottomColor: "#000000",
  },
  noPadding:{
    padding:0,
  },
  rightMargin: {
    marginRight: 16,
  },
  cancelButton:{
    padding:10,
    margin:15,
  },
  stretch:{
    alignSelf:"stretch"
  }
});
