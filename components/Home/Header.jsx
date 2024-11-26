import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
      }}
    >
      {/* <Text style={{ fontSize: 24, fontFamily: "outfit-medium" }}>Home</Text> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "black",
          }}
        />
        <View>
          <Text style={{color: "#fff",}}>Welcome</Text>
          <Text style={{
            fontSize: 20,
            color: "#fff",
            fontFamily: "outfit-medium",
          }}>{user?.fullName}</Text>
        </View>
      </View>
      {/* Search Bar */}
      
    </View>
  );
}