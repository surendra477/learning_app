import React from 'react';
import {
    View, StyleSheet,
    Text,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import {
    IconLabel, TextButton,
    HorizontalCourselCard, LineDivider
} from "../../../components";
import { COLORS, FONTS, icons, SIZES, images, dummyData } from "../../../constants";
import { connect } from "react-redux";
import { toggleTheme } from "../../../stores/themeActions"
import appTheme from '../../../constants/theme';

const CourseChapters = ({ appTheme }) => {

    function renderHeader() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.h2
                    }}
                >{dummyData?.course_details.title}</Text>

                {/* Students & Duration */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginRight: SIZES.base
                    }}
                >
                    <Text
                        style={{

                            color: COLORS.gray30,
                            ...FONTS.body4
                        }}
                    >
                        {dummyData?.course_details?.number_of_students}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={dummyData?.course_details?.duration}
                        containerStyle={{
                            marginLeft: SIZES.radius
                        }}
                        iconStyle={{
                            width: 15,
                            height: 15
                        }}

                        labelStyle={{
                            ...FONTS.body4
                        }}
                    />
                </View>

                {/* Instructor */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                >
                    {/* Profile Photo */}
                    <Image
                        source={images.profile}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />
                    {/* Name Title */}

                    <View
                        style={{
                            flex: 1,
                            marginLeft: SIZES.base,
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ ...FONTS.h3, fontSize: 18 }}>{dummyData?.course_details?.instructor?.name}</Text>

                        <Text style={{ ...FONTS.body4, color: COLORS.gray30 }}>
                            {dummyData?.course_details?.instructor?.title}
                        </Text>
                    </View>

                    {/* Text Button */}
                    <TextButton
                        label="Follow +"
                        contentContainerStyle={{
                            width:80,
                            height:35,
                            borderRadius:20
                        }}

                        labelStyle={{
                            ...FONTS.h3
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderChapter(){

        return(
            <View>
                {dummyData?.course_details?.videos.map((item,index) => {
                    return(
                        <View
                        key={`Videos-${index}`}
                        style={{
                            alignItems:'center',
                            height:70,
                            backgroundColor:item?.is_playing? COLORS.additionalColor11 :null
                        }}
                        >
                            <View
                            style={{
                                flexDirection:'row',
                                paddingHorizontal:SIZES.padding,
                                alignItems:'center',
                                height:70
                            }}
                            >

                            {/* Icon */}
                            <Image
                                source={
                                    item?.is_complete ? icons.completed : item?.is_playing ? icons.play_1 :icons.lock
                                }

                                style={{
                                    width:40,
                                    height:40
                                }}
                            />

                            {/* Title & Duration */}
                            <View
                            style={{
                                flex:1,
                                marginLeft:SIZES.radius
                            }}
                            >
                                <Text style={{...FONTS.h3}}>{item?.title}</Text>
                                <Text style={{
                                    color:COLORS.gray30,
                                    ...FONTS.body4
                                }}>{item?.duration}</Text>
                            </View>

                            {/* Size */}

                                <Text
                                style={{
                                    color:COLORS.gray30,
                                    ...FONTS.body4
                                }}
                                >{item?.size}</Text>

                            {/* Status */}
                                <Image
                                    source={item?.is_downloaded ? icons.completed : icons.download}

                                    style={{
                                        marginLeft:SIZES.base,
                                        width:25,
                                        height:25,
                                        tintColor:item?.is_lock ? COLORS.additionalColor4 : null
                                    }}
                                />
                            </View>


                            {/* Progress Bar */}

                            {item?.is_playing && <View
                                style={{
                                    position:'absolute',
                                    bottom:0,
                                    left:0,
                                    height:5,
                                    width: item?.progress,
                                    backgroundColor:COLORS.primary
                                }}
                            />}
                        </View>
                    )
                })}
            </View>
        )
    }

    function renderPopularCourses(){
        return (
            <View

            style={{
                marginTop:SIZES.padding
            }}>
                    {/* Section Header */}
                        <View
                        style={{
                            flexDirection:'row',
                            paddingHorizontal:SIZES.padding
                        }}
                        >
                        <Text style={{flex:1,...FONTS.h2}}>
                            Popular Courses
                        </Text>

                        <TextButton
                        contentContainerStyle={{
                            width:80,
                            borderRadius:30,
                            backgroundColor:COLORS.primary
                        }}
                        label="See All"
                        />

                        </View>
                    {/* Popular Cources List */}

                    <FlatList
                        data={dummyData.courses_list_2}
                        listKey="PopularCourses"
                        scrollEnabled={false}
                        keyExtractor={item => `PopularCourses-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginTop:SIZES.radius,
                            paddingHorizontal:SIZES.padding
                        }}
                        renderItem={({item, index}) => (
                            <HorizontalCourselCard
                                course={item}
                                containerStyle={{
                                    marginVertical:SIZES.padding,
                                    marginTop:index === 0 ? SIZES.radius : SIZES.padding
                                }}
                               
                            />
                            
                        )}

                    ItemSeparatorComponent={() => (
                        <LineDivider
                            
                        />
                    )}
                    />
            </View>
        )
    }
    return (
        // <View>
        //     <Text style={{color:appTheme?.textColor}}>CourseChapters</Text>
        // </View>

        <ScrollView>
            {/* Header */}
            {renderHeader()}
            {/* Line Divider */}
            <LineDivider
                lineStyle={{
                    height:1,
                    marginVertical:SIZES.radius
                }}
            />

            {/* Chapters */}
            {renderChapter()}

            {/* Popular Course */}
            {renderPopularCourses()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({})
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
export default connect(mapStateToProps, mapDispatchToProps)(CourseChapters);
