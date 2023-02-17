import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";
import { IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard, HorizontalCourselCard, ProgressBar } from "../components";
import { connect } from "react-redux";
const ProfileValue = ({appTheme, icon, label, value, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 80,
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            {/* Icons */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: appTheme?.backgroundColor3,
                }}
            >

                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary,
                    }}
                />

            </View>

            {/* Lable and Value */}

            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                {label && <Text
                style={{
                    color: COLORS.gray30,
                    ...FONTS.body3
                }}
                >
                    {label}
                </Text>}
                <Text
                style={{
                    ...FONTS.h3,
                    color: appTheme?.textColor
                }}
                >
                    {value}
                </Text>
            </View>

            {/* Icon */}

            <Image 
                source={icons.right_arrow}
                style={{
                    width: 15,
                    height: 15,
                    tintColor: appTheme?.tintColor,
                }}
            />

        </TouchableOpacity>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme }
}

function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileValue);