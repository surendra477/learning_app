import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Animated
} from 'react-native';

import { Home, Profile, Search } from "../../screens";
import { COLORS, SIZES, FONTS, constants } from "../../constants";
import { Shadow } from "react-native-shadow-2";
import { connect } from "react-redux";

const bottom_tabs = constants.bottom_tabs.map((bottom_tabs) => ({
    ...bottom_tabs,
    ref: React.createRef()
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
    const inputRange = bottom_tabs.map((_, i) => i * SIZES.width);

    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((measure) => measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((measure) => measure.x)
    })
    return (
        <Animated.View
            style={{
                position: "absolute",
                left: 0,
                height: "100%",
                width: indicatorWidth,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX, onBottomTabPress }) => {
    const containerRef = React.useRef();
    const [measureLayout, setMeasureLayout] = React.useState([]);
    React.useEffect(() => {
        let ml = [];
        bottom_tabs.forEach((tab) => {
            tab.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    });
                    if (ml.length === bottom_tabs.length) {
                        setMeasureLayout(ml);
                    }
                }
            )
        }
        )

    }, [containerRef.current])

    return (
        <View ref={containerRef} style={{ flexDirection: 'row' }}>

            {measureLayout.length > 0 &&
                <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
            }

            {bottom_tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                    onPress={() => onBottomTabPress(index)}
                        key={`BottomTab-${index}`}
                        ref={item.ref}
                        style={{
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 20,
                            paddingBottom: 20,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />

                        <Text style={{
                            marginTop: 3,
                            color: COLORS.white,
                            ...FONTS.h3
                        }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
const MainLayout = ({appTheme}) => {
    const flatListRef = React.useRef();
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onBottomTabPress = React.useCallback((bottomTabIndex) => {
        flatListRef?.current?.scrollToOffset({
            offset: bottomTabIndex * SIZES.width
        })
    });
    function renderContent() {
        return (
            <View style={{ flex: 1 }}>
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment={"center"}
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    data={constants.bottom_tabs}
                    keyExtractor={item => `Main-${item.id}`}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}

                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: SIZES.width, height: SIZES.height }}>
                                {item.label === constants.screens.home && <Home />}
                                {item.label === constants.screens.profile && <Profile />}
                                {item.label === constants.screens.search && <Search />}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    function renderBottomTab() {
        return (
            <View style={{
                paddingBottom: SIZES.height > 800 ? 20 : 0,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appTheme?.backgroundColor1
            }}>
                <Shadow>
                    <View
                        style={{
                            flexDirection: "row",
                            borderRadius: SIZES.radius,
                            backgroundColor: appTheme?.backgroundColor2,
                        }}
                    >
                        <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress}/>
                    </View>
                </Shadow>
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Content */}
            {renderContent()}

            {/* Bottom Tab */}
            {renderBottomTab()}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
     
    }
}

function mapDispatchToProps(dispatch) {
    return {
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);