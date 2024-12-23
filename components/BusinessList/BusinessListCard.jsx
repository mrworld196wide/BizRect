import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function BusinessListCard({ business }) {
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View style={{flex:1, gap:5, paddingTop: "2%"}}>
        <Text style={{ fontFamily: "outfit-bold", fontSize:20 }}>{business.name}</Text>
        <Text style={{ fontFamily: "outfit", fontSize:15, color:Colors.GREY }}>{business.address}</Text>
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
      </View>
    </View>
  );
}
