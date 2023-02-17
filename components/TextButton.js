import React from "react";

import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";

import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";

const TextButton = ({ label, labelStyle, contentContainerStyle, onPress, disabled }) => {
  return (
    <TouchableOpacity
    style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...contentContainerStyle
    }}
    onPress={onPress}
    disabled={disabled}
    >
<Text 
style={{
    color: COLORS.white,
    ...FONTS.h3,
    ...labelStyle
}}
>
              {label}
</Text>
    </TouchableOpacity>
  )
};

export default TextButton;