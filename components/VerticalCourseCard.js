import React from "react";

import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";

import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";
import { IconLabel } from "../components";
import { connect } from "react-redux";

const VerticalCourseCard = ({appTheme, containerStyle, course }) => {
    return (
        <TouchableOpacity
            style={{
                width: 270,
                ...containerStyle
            }}
        >
            {/* Thumbnail */}

            <Image
                source={course.thumbnail}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: 150,
                    borderRadius: SIZES.radius,
                    marginBottom: SIZES.radius
                }}
            />

            {/* 
Details */}

            <View style={{
                flexDirection: 'row',
            }}>
                {/* Play */}
                <View
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: appTheme?.backgroundColor3,
                    }}
                >
                    <Image
                        source={icons.play}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: appTheme?.tintColor
                        }}
                    />
                </View>

                {/* Info */}

                <View
                    style={{
                        flexShrink: 1,
                        paddingHorizontal: SIZES.radius,
                    }}
                >
                    <Text style={{
                        flex: 1,
                        ...FONTS.h3,
                        fontSize: 18,
                        color: appTheme?.textColor,
                    }}>
                        {course.title}
                    </Text>
                    <IconLabel 
                        icon={icons.time}
                        label={course.duration}
                        containerStyle={{
                            marginTop: SIZES.base
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
};


function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => dispatch(toggleTheme(themeType))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerticalCourseCard);