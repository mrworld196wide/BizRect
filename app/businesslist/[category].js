import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: category,
    });
    getBusinessList();
  }, []);

  /**
   * used to get business list by category
   */
  const getBusinessList = async () => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // logging data to console
      //   console.log(doc.data());
      setBusinessList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <View>
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : (
        <View style={{marginTop: "40%", alignItems: "center"}}>
          <Image source={require("../../assets/images/not-found.png")} style={{
            height: 250,
            width: 250,
          }} />
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.GREY,
              textAlign: "center",
              marginTop: "5%"
            }}
          >
            No Business Found
          </Text>
        </View>
      )}
    </View>
  );
}
