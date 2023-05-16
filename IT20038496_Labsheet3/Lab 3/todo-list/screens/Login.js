import { Text, View, ImageBackground, TextInput, Button } from "react-native";
import AppStyles from "../styles/AppStyles.js";
import React from "react";
import { auth } from "../firebase";
import InlineTextButton from "../components/InlineTextButton.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


export default function Login({ navigation }) {
  const background = require("../assets/background.jpg");

   if (auth.currentUser) {
     navigation.navigate("ToDo");
   } else {
     onAuthStateChanged(auth, (user) => {
       if (user) {
         navigation.navigate("ToDo");
       }
     });
   }

   

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMessage, setErrorMessage] =React.useState("");

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //Signed In
            navigation.navigate("ToDo", { user: userCredential.user });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please enter an email an password");
    }
  };

  return (
    <ImageBackground style={AppStyles.container} source={background}>
      <View style={AppStyles.backgroundCover}>
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={AppStyles.errorText} >{errorMessage}</Text>
        <TextInput
          style={AppStyles.input}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={AppStyles.rowContainer}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton
            text="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
        <View style={AppStyles.rowContainer}>
          <Text style={AppStyles.lightText}>Forgot your Password? </Text>
          <InlineTextButton
            text="Reset"
            onPress={() => navigation.navigate("ResetPassword")}
          />
        </View>
        <Button title="Login" onPress={login} color="#00b4d8" />
      </View>
    </ImageBackground>
  );
}
