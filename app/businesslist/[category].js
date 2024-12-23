import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    // clearing the list first
    setBusinessList([]);
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
    setLoading(false);
  };
  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
        //onrefresh to send fetch request to get data
         onRefresh={getBusinessList}
         refreshing={loading}
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator style={{marginTop:'60%'}} size={'large'} color={Colors.PRIMARY} />
      ) : (
        <View style={{ marginTop: "40%", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/not-found.png")}
            style={{
              height: 250,
              width: 250,
            }}
          />
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.GREY,
              textAlign: "center",
              marginTop: "5%",
            }}
          >
            No Business Found
          </Text>
        </View>
      )}
    </View>
  );
}
