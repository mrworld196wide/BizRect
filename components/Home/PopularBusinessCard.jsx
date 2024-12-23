import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
export default function PopularBusinessCard(business) {
  // console.log('Business data:', business)
  return (
    <View
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business?.business?.imageUrl }}
        style={{
          height: 180,
          width: 250,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 5, gap: 5 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
          {business?.business?.name}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 13, color: Colors.GREY }}>
          {business?.business?.address}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop:'2%' }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            marginTop: "2%",
          }}
        >
          <Image
            source={require("../../assets/images/star.png")}
            style={{ height: 15, width: 15 }}
          />
          <Text style={{ fontFamily: "outfit", fontSize: 12 }}>4.5</Text>
        </View>
        <Text
        style={{
          fontFamily: "outfit",
          backgroundColor: Colors.PRIMARY,
          fontSize: 12,
          color: "#fff",
          padding: 5,
          borderRadius: 10,
        }}>{business?.business?.category}</Text>
      </View>
    </View>
  );
}
