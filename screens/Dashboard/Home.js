/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';


import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../../constants";

import { IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard, HorizontalCourselCard } from "../../components";
import { FlatList } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';


const Home = ({ appTheme }) => {
    const navigation = useNavigation(); 

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                    
                }}
            >

                {/* Greeting */}
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h2, color: appTheme?.textColor, }}>Hello, Programmers!</Text>
                    <Text style={{
                        color: appTheme?.textColor,
                        ...FONTS.body3
                    }}>
                        Thursday, 9th Sept 2021
                    </Text>
                </View>
                <IconButton
                    icon={icons.notification}
                    iconStyle={{
                        tintColor: appTheme?.tintColor
                    }}
                />


            </View>
        )
    }

    const Section = ({ containerStyle, title, onPress, children }) => {

        return (
            <View
                style={{
                    ...containerStyle,

                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                    }}
                >

                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h2,
                            color: appTheme?.textColor,
                        }}
                    >
                        {title}
                    </Text>

                    <TextButton
                        contentContainerStyle={
                            {
                                width: 80,
                                borderRadius: 30,
                                backgroundColor: COLORS.primary,
                            }
                        }

                        label="See All"
                        onPress={onPress}
                    >

                    </TextButton>

                    <TextButton


                    />

                </View>
                {children}
            </View>
        )
    }
    function renderStartLearning() {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 15

                }}

                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >

                {/* Info */}

                <View>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body2
                        }}
                    >HOW TO</Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        Make your brand more visible with our checklist
                    </Text>
                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >By Surendra Ediga</Text>
                </View>
                {/* Image */}

                <Image
                    source={images.start_learning}
                    style={{
                        width: "100%",
                        height: 110,
                        marginTop: SIZES.padding
                    }}
                />

                {/* Button */}

                <TextButton
                    label="Start Learning"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: 20,
                        backgroundColor: COLORS.white,
                    }}

                    labelStyle={{
                        color: COLORS.black,
                    }}
                />
            </ImageBackground>
        )
    }

    function renderCourses() {

        return (
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding,
                }}
                renderItem={({ item, index }) => (
                    <VerticalCourseCard
                        containerStyle={{
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
                        }}
                        course={item}
                    />
                )}


            />
        )
    }


    function renderPopularCourses() {
       return(
        <Section 
        title="Popular Courses"
        containerStyle={{
            marginTop:30
        }}
        >
            <FlatList 
            data={dummyData.courses_list_2}
            listKey="PopularCourses"
            keyExtractor={item => `PopularCourses-${item.id}`}
            scrollEnabled={false}
            contentContainerStyle={{
                marginTop:SIZES.radius,
                paddingHorizontal:SIZES.padding
            }}
            renderItem={({item,index}) => (
                <HorizontalCourselCard
                    course={item}
                    containerStyle={{
                        marginVertical:SIZES.padding,
                        marginTop: index == 0 ? SIZES.radius : SIZES.padding,
                    }}
                 />
            )}

            ItemSeparatorComponent={() => (
                <LineDivider 
                    lineStyle={{
                        backgroundColor:COLORS.gray20,
                    }}
                />
            )}
            />
        </Section>
       )
    }

    const renderCategories = () => {
        return (
            <Section title="Categories" >
                <FlatList
                    horizontal
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={item => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                    }}

                    renderItem={({ item, index }) => (
                        <CategoryCard
                            sharedElementPrefix="Home"
                            category={item}
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                                marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            }}

                            onPress={() => navigation.navigate('CourseListing',{category:item,
                                sharedElementPrefix:"Home"})}
                        />
                    )}
                />
            </Section>
        )
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: appTheme?.backgroundColor1
        }}>

            {/* Header */}
            {renderHeader()}

            {/* Content */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >

                {/* Start Learning */}
                {renderStartLearning()}

                {/* Coureses */}
                {renderCourses()}

                <LineDivider

                    lineStyle={{
                        marginVertical: SIZES.padding,
                    }}

                />

                {/* Categories */}

                {renderCategories()}


                {/* Popular Courses */}

                {renderPopularCourses()}
            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);