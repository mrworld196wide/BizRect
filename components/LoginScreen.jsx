import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser"; 
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../assets/images/login.png")}
          style={{
            width: 220,
            height: 440,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "black",
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your online{" "}
          <Text style={{ color: Colors.PRIMARY }}>Business Directory</Text> App{" "}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 10,
            color: Colors.GREY,
          }}
        >
          {" "}
          Discover local businesses and promote your own, all in one app!{" "}
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 20,
            fontFamily: "outfit",
          }}>Get Started</Text>
        </TouchableOpacity>
    </View>
  );
}

// use rns to create give below boilerplate
const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  btn:{
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 99,
    marginTop:5,
  }
});
