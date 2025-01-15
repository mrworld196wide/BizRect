import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";
export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBusinessDetailById();
  }, []);
  //   fetching business data base on id
  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db,'BusinessList',businessid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // logging the data
      // console.log("Document data:", docSnap.data());
      setBusiness({id:docSnap.id,...docSnap.data()});
      setLoading(false);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro Section */}
          <Intro business={business} />
          {/* Action Button */}
          <ActionButton business={business} />
          {/* About Section  */}
          <About business={business} />
          {/* Review Section */}
          <Reviews business={business} />
        </View>
      )}
      {/* <Text>{businessid}</Text> */}
    </ScrollView>
  );
}
