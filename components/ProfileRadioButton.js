import React from "react";

import {View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Animated} from "react-native";

import {COLORS, SIZES, FONTS, icons, images, dummyData} from "../constants";

import {IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard, HorizontalCourselCard, ProgressBar} from "../components";
import {connect} from "react-redux";
const ProfileRadioButton = ({appTheme,icon, label, isSelected, onPress}) => {

    const radioAnimaed = React.useRef(new Animated.Value(0)).current;

    const circleColorAnimated = radioAnimaed.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.primary] 
    });

    const lineColorAnimated = radioAnimaed.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13]
    });

    React.useEffect(() => {
        if(isSelected){
            Animated.timing(radioAnimaed, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start();
        }else{
            Animated.timing(radioAnimaed, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [isSelected]);
    return(
        <View
        style={{
            flexDirection: 'row',
            height: 80,
            alignItems: 'center',
        }}
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

            <View style={{
                flex: 1,
                marginLeft: SIZES.radius
            }}>
                <Text style={{
                    ...FONTS.h3,
                    color: appTheme?.textColor
                }}>{label}</Text>
            </View>

            {/* Radio Button */}
            <TouchableOpacity style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={onPress}
            >

            <Animated.View style={{
                width: "100%",
                height: 5,
                borderRadius:3,
                backgroundColor: lineColorAnimated,
            }} />

       <Animated.View 
         style={{
            position: 'absolute',
            left:radioAnimaed,
            width:25,
            height:25,
            borderRadius: 15,
            borderWidth: 5,
                        borderColor: circleColorAnimated,
            backgroundColor:appTheme?.backgroundColor1
         }}
       />

            </TouchableOpacity>

        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileRadioButton);