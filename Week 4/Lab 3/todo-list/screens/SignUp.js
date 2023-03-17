import { Text, View, ImageBackground, TextInput, Button } from "react-native";
import AppStyles from "../styles/AppStyles.js";
import React from "react";
import InlineTextButton from "../components/InlineTextButton.js";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import { auth } from "../firebase";


export default function SignUp({navigation}) {
  const background = require("../assets/background.jpg");

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmpassword, setConfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage]= React.useState("");

  let validateAndSet =(value,valueToCompare,setValue)=>{
    if(value!== valueToCompare){
      setValidationMessage("Passwords don't match.");
    }
    else{
      setValidationMessage("");
    }
    setValue(value);
  }

  let signup =()=>{
    if (password === confirmpassword) {
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        sendEmailVerification(auth.currentUser);
         navigation.navigate("Todo",{user: userCredential.user});
      })
      .catch((error)=>{
        setValidationMessage(error.message);
      });
      
    } else {
      
    }
  }
  return (
    <ImageBackground style={AppStyles.container} source={background}>
      <View style={AppStyles.backgroundCover}>
        <Text style={[AppStyles.lightText, AppStyles.header]}>Sign Up</Text>
        <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
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
          onChangeText={(value) =>
            validateAndSet(value, confirmpassword, setPassword)
          }
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry={true}
          value={confirmpassword}
          onChangeText={(value) =>
            validateAndSet(value, password, setConfirmPassword)
          }
        />
        <View style={AppStyles.rowContainer}>
          <Text style={AppStyles.lightText}>Already have an account? </Text>
          <InlineTextButton text="Login" onPress={() => navigation.popToTop()} />
        </View>
        <Button title="Sign Up" onPress={signup} color="#00b4d8" />
      </View>
    </ImageBackground>
  );
}
