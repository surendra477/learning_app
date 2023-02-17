import React from "react";

import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";

import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";


const IconLabel = ({ icon, label, containerStyle, iconStyle, labelStyle }) => {
    return(
        <View
        style={{
            flexDirection:'row',
            alignItems:'center',
            ...containerStyle
        }}
        >
<Image 

    source={icon}
    style={{
        width:20,
        height:20,
        tintColor:COLORS.gray30,
        ...iconStyle
    }}
/>

<Text
style={{
    marginLeft:SIZES.base,
    color:COLORS.gray30,
    ...FONTS.body3,
    ...labelStyle
}}
>
    {label}
</Text>
        </View>
    )
}

export default IconLabel;