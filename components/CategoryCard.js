import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";
import { connect } from "react-redux";
import { SharedElement } from "react-navigation-shared-element";
const CategoryCard = ({ appTheme, containerStyle, category, onPress, sharedElementPrefix }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 150,
                width: 200,
                ...containerStyle
            }}
        >
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                    source={category?.thumbnail}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                    }}
                />
            </SharedElement>
            <View
                style={{
                    position: "absolute",
                    bottom: 50,
                    left: 5,
                }}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Title-${category.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >


                    <Text
                        style={{
                            position: "absolute",
                            color: COLORS.white,
                            ...FONTS.h2,
                        }}
                    >
                        {category?.title}
                    </Text>

                </SharedElement>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard;