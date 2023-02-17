import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import Animated, { interpolate, useAnimatedStyle, withDelay, withTiming } from "react-native-reanimated";

import { TextButton, LineDivider, TwoPointSlider } from "../components/index";

import {
    COLORS, FONTS,
    SIZES,
    icons,
    constants
} from "../constants";

const ClassTypeOption = ({ containerStyle, classType, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={classType.icon}
                resizeMode="contain"
                style={{
                    width: 40,
                    height: 40,
                    tintColor: isSelected ? COLORS.white : COLORS.gray80
                }}
            />
            <Text style={{
                marginTop: SIZES.base,
                ...FONTS.h3,
                color: isSelected ? COLORS.white : COLORS.gray80
            }}>
                {classType.label}
            </Text>
        </TouchableOpacity>
    )
}

const ClassLevelOption = ({ containerStyle, classLevel, isLastItem, isSelected, onPress }) => {
    return (
        <>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    ...containerStyle
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.body
                    }}
                >{classLevel.label}</Text>

                <Image
                    source={isSelected ? icons.checkbox_on : icons.checkbox_off}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                    }}
                />
            </TouchableOpacity>
            {!isLastItem && <LineDivider lineStyle={{
                height: 1
            }} />}
        </>
    )
}
const FilterModal = ({ filterModalSharedValue1, filterModalSharedValue2 }) => {

    const [selectedClassType, setSelectedClassType] = React.useState("");
    const [selectedClassLevel, setSelectedClassLevel] = React.useState("");
    const [selectedCreatedWithin, setSelectedCreatedWithin] = React.useState("");
    const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue1.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModalSharedValue1.value
                }
            ]
        }
    });

    const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue2.value, [SIZES.height, 0], [0, 1])
        }
    })

    const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue2.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModalSharedValue2.value
                }
            ]
        }
    })

    function renderFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    marginBottom:30,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                {/* Reset */}
                <TextButton 
                    label="Reset"
                    contentContainerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                        backgroundColor: null,
                    }}

                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                />

                {/* Apply */}

                <TextButton 
                    label="Apply"
                    contentContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        borderRadius: SIZES.radius,
                        borderWidth: 2,
                        borderColor: COLORS.primary,
                        backgroundColor: COLORS.primary,
                    }}
                    labelStyle={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                />
            </View>
        )
    }
    return (
        //Main Container
        <Animated.View
            style={[{
                position: 'absolute',
                bottom: 0,
                height: SIZES.height,
                width: SIZES.width,
            }, filterModalContainerAnimatedStyle]}
        >

            {/* Background Container */}
            <Animated.View
                style={[{
                    flex: 1,
                    backgroundColor: COLORS.transparentBlack7,
                    height: SIZES.height,
                    width: SIZES.width,

                }, filterModalBgAnimatedStyle]}
            >

            </Animated.View>
            {/* Content Container */}
            <Animated.View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    height: SIZES.height * 0.9,
                    width: SIZES.width,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: COLORS.white,
                }, filterModalContentAnimatedStyle]}
            >
                {/* Header */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    <View
                        style={{
                            width: 60
                        }}
                    />

                    <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h1 }}>
                        Filter
                    </Text>


                    <TextButton
                        label="Cancel"
                        contentContainerStyle={{
                            width: 60,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        onPress={() => {
                            filterModalSharedValue1.value = withTiming(SIZES.height, { duration: 500 });
                            filterModalSharedValue2.value = withDelay(500, withTiming(SIZES.height, { duration: 100 }));
                        }}
                    />
                </View>

                {/* Content */}
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: 50
                    }}
                >
                    {/* Class Type */}
                    <View
                        style={{
                            marginTop: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>
                            Class Type
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius,
                            }}
                        >
                            {constants.class_types.map((item, index) => {
                                return (
                                    <ClassTypeOption
                                        key={`ClassType-${index}`}
                                        containerStyle={{
                                            marginLeft: index == 0 ? 0 : SIZES.base
                                        }}
                                        classType={item}
                                        isSelected={selectedClassType == item?.id}
                                        onPress={() => setSelectedClassType(item.id)}
                                    />
                                )
                            })}
                        </View>
                    </View>

                    {/* Class Level */}
                    <View
                        style={{
                            marginTop: SIZES.padding,

                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>
                            Class Level
                        </Text>

                        <View>
                            {constants.class_levels.map((item, index) => {
                                return (
                                    <ClassLevelOption
                                        key={`ClassType-${index}`}

                                        classLevel={item}
                                        isLastItem={index == constants.class_levels.length - 1}
                                        isSelected={selectedClassLevel == item?.id}
                                        onPress={() => { setSelectedClassLevel(item.id) }}
                                    />
                                )
                            })}
                        </View>
                    </View>

                    {/* Created Within */}
                    <View
                        style={{
                            marginTop: SIZES.radius,
                        }}
                    >
                        <Text style={{
                            ...FONTS.h3,
                        }}>
                            Created Within
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            {constants.created_within.map((item, index) => {
                                return (
                                    <TextButton
                                        key={`CreatedWithin-${index}`}
                                        label={item.label}
                                        contentContainerStyle={{
                                            height: 45,
                                            paddingHorizontal: SIZES.radius,
                                            marginLeft: index % 3 == 0 ? 0 : SIZES.radius,
                                            marginTop: SIZES.radius,
                                            borderWidth: 1,
                                            borderRadius: SIZES.radius,
                                            borderColor: COLORS.gray20,
                                            backgroundColor: item.id == selectedCreatedWithin ? COLORS.primary3 : null
                                        }}
                                        labelStyle={{
                                            color: item.id == selectedCreatedWithin ? COLORS.white : COLORS.black,
                                            ...FONTS.body3
                                        }}
                                        onPress={() => setSelectedCreatedWithin(item.id)}
                                    />
                                )
                            })}
                        </View>
                    </View>

                    {/* Class Length */}
                    <View
                        style={{
                            marginTop: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3
                            }}
                        >
                            Created Within
                        </Text>

                        <View>
                            <TwoPointSlider
                                values={[20, 50]}
                                min={15}
                                max={60}
                                postfix="min"
                                onValuesChange={(values) => console.log(values)}
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Footer */}
                {renderFooter()}
            </Animated.View>
        </Animated.View>
    )
}

export default FilterModal;