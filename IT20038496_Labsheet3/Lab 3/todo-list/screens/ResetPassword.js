import { Text, View, ImageBackground, TextInput, Button } from "react-native";
import AppStyles from "../styles/AppStyles.js";
import React from "react";
import InlineTextButton from "../components/InlineTextButton.js";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
export default function ResetPassword({navigation}) {
  const background = require("../assets/background.jpg");

  let [email, setEmail] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  let resetPassword = ()=>{
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      navigation.popToTop();
    })
    .catch((eror)=>{
      setErrorMessage(eror.message);

    })
  }
  

  return (
    <ImageBackground style={AppStyles.container} source={background}>
      <View style={AppStyles.backgroundCover}>
        <Text style={[AppStyles.lightText, AppStyles.header]}>Reset Password</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={AppStyles.input}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <View style={AppStyles.rowContainer}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton text="Sign Up"  onPress={()=> navigation.navigate("SignUp")}/>
        </View>
       
        <Button title="Reset Password"onPress={resetPassword} color="#00b4d8" />
      </View>
    </ImageBackground>
  );
}
