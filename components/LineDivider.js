import React from "react";

import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";

import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";

const LineDivider = ({lineStyle}) => {
    return (
        <View
        style={{
            width: "100%",
            height: 2,
            backgroundColor: COLORS.gray20,
            ...lineStyle
        }}
        />
    );
}

export default LineDivider;