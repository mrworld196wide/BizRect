import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    getSliderList();
  }, []);
  const getSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // loggind data to console
      // console.log(doc.id, " => ", doc.data());
      // appending to array
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 5,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft:20,
        paddingTop:5
      }}
      renderItem={({item,index})=>(
        <Image source={{uri:item.imageUrl}}
        style={{
            width:360,
            height:150,
            borderRadius:15,
            marginRight:20
        }}/>
      )}/>
    </View>
  );
}
