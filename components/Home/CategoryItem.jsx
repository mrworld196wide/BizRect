import { View, Text, Image, Touchable, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function CategoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{
            padding:15,
            backgroundColor:Colors.PRIMARY,
            borderRadius:99,
            marginRight:15,
        }}>
            <Image source ={{uri:category.icon}}
                style={{
                    width:30,
                    height:30
                }}/></View>
                <Text style={{
                    textAlign:'center',
                    fontSize:12,
                    fontFamily:'outfit'
                }} >{category.name}
                </Text>
      </TouchableOpacity>
  )
}