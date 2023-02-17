/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, BackHandler } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/themeActions"

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { HorizontalCourselCard, IconButton, LineDivider, FilterModal } from "../../components";

import { COLORS, FONTS, icons, SIZES, images, dummyData } from "../../constants";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_HEIGHT = 250;  
const CourseListing = ({ navigation, route, appTheme }) => {

    function backHandler(){
        navigation.goBack();
    }
    const { category, sharedElementPrefix } = route.params;

    const flatListRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })

    const headerSharedValue = useSharedValue(80);
    const filterModalSharedValue1 = useSharedValue(SIZES.height);
    const filterModalSharedValue2 = useSharedValue(SIZES.height);
    const renderHeader = () => {

        const inputRange = [0, HEADER_HEIGHT -50]
        headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }));

        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
            }
        })

        const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: headerSharedValue.value
                    }
                ]
            }
        })


        const headerHeightAnimatedStyle= useAnimatedStyle(() => {
            return{
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolate.CLAMP)
            }
        });

        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0],[0,1], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolate.CLAMP)
                    }
                ]
            }
        });

        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0],[1,0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [50, 130], Extrapolate.CLAMP)
                    }
                ]
            }
        });
        return (
            <Animated.View
                style={[{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: "hidden",
                }, headerHeightAnimatedStyle]}
            >
                {/* Background Image */}
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${category.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image source={category?.thumbnail}
                        resizeMode="cover"
                        style={[{
                            width: "100%",
                            height: "100%",
                            borderBottomLeftRadius: 60
                        }]}
                    />
                </SharedElement>

                {/* Title */}

                <Animated.View
                style={[{
                    position: "absolute",
                    top:-80,
                    left: 0,
                    right: 0,
                    }, headerShowOnScrollAnimatedStyle]}
                >
                    <Text
                    style={{
                            color: appTheme?.textColor,
                        ...FONTS.h2,
                        textAlign: "center",
                    }}
                    >{category?.title}</Text>
                </Animated.View>
                <Animated.View
                    style={[{
                        position: "absolute",
                        bottom: 70,
                        left: 30,
                    }, headerHideOnScrollAnimatedStyle]}
                >
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Title-${category.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text style={{
                            position: "absolute",
                            color: appTheme?.textColor,
                            ...FONTS.h1,
                        }}>
                            {category?.title}
                        </Text>
                    </SharedElement>

                </Animated.View>

                {/* Back Button */}
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: appTheme?.textColor,
                        }}
                        containerStyle={{
                            position: "absolute",
                            top: 40,
                            left: 20,
                            width: 50,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 25,
                            backgroundColor: appTheme.backgroundColor1,
                        }}
                        onPress={() => {

                            if(scrollY.value > 0 && scrollY.value <= 200){
                            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                                setTimeout(() => {
                                    headerSharedValue.value = withTiming(80, { duration: 500 }, () => {
                                        runOnJS(backHandler)()
                                    })
                                }, 100);
                            }else{
                                backHandler()
                            }
                            
                        }}
                    />
                </Animated.View>

                {/* Category Image */}

                <Animated.Image
                    source={images.mobile_image}
                    resizeMode="contain"
                    style={[{
                        position: "absolute",
                        right: 40,
                        bottom: -40,
                        width: 100,
                        height: 200,
                    }, headerFadeAnimatedStyle, headerTranslateAnimatedStyle, headerHideOnScrollAnimatedStyle]}
                >

                </Animated.Image>
            </Animated.View>
        )
    }

    const renderResults = () => {
        return (
            <AnimatedFlatList
                ref={flatListRef}
                data={dummyData.courses_list_2}
                keyExtractor={item => `Results-${item.id}`}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                keyboardDismissMode="on-drag"
                ListHeaderComponent={
                    <View style={{
                        flexDirection: "row",
                        marginTop: 270,
                        marginBottom: SIZES.base,
                        alignItems: "center",
                    }}>

                        {/* Results */}
                        <Text
                            style={{
                                flex: 1,
                                ...FONTS.body3,
                                color: appTheme?.textColor
                            }}
                        >
                            5,761 Results
                        </Text>

                        {/* Filter Button */}
                        <IconButton
                            icon={icons.filter}
                            containerStyle={{
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: COLORS.primary,
                            }}
                            onPress={() => {
                                filterModalSharedValue1.value = withTiming(0, { duration: 100 })
                                filterModalSharedValue2.value = withDelay(100, withTiming(0, { duration: 500 }))
                            }}
                        />
                    </View>
                }
                renderItem={({ item, index }) => (
                    <HorizontalCourselCard 
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop: index == 0 ? SIZES.radius : SIZES.padding,
                        }}
                        onPress={() => navigation.navigate("CourseDetails",{selectedCourse: item})}
                    />
                )}

                ItemSeparatorComponent={() => (
                    <LineDivider 
                        lineStyle={{
                            backgroundColor: appTheme?.textColor
                        }}
                    />
                )}
            />
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme.backgroundColor1
            }}
        >

            {/* Results */}

            {renderResults()}
            {/* Header */}
            {renderHeader()}

            {/* Filter Modal */}

            <FilterModal 
                filterModalSharedValue1={filterModalSharedValue1}
                filterModalSharedValue2={filterModalSharedValue2}
            />
        </View>
    )
}


CourseListing.sharedElements = (route, otherRoute, showing) => {
    const { category, sharedElementPrefix } = route.params;

    return [
        {
            id: `${sharedElementPrefix}-CategoryCard-Bg-${category.id}`,
            animation: 'move',
            resize: 'auto',
            align: 'auto'

        }
        , {
            id: `${sharedElementPrefix}-CategoryCard-Title-${category.id}`,
            animation: 'move',
        }
    ];

}

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
export default connect(mapStateToProps, mapDispatchToProps)(CourseListing);