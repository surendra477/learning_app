
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native';
import {connect} from 'react-redux';
import {toggleTheme} from '../../stores/themeActions'
import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../../constants";
import { IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard, HorizontalCourselCard, ProgressBar, ProfileValue, ProfileRadioButton } from "../../components";


const Profile = ({appTheme,toggleTheme}) => {
    const [newCourseNotification, setNewCourseNotification] = React.useState(false);
    const [studyReminder, setStudyReminder] = React.useState(false);

    function toggleThemeHandler() {
        if (appTheme.name === 'light') {
            toggleTheme('dark')
        } else {
            toggleTheme('light')
        }
    }
    function renderProfileCard() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: appTheme?.backgroundColor2,
                }}
            >
                {/* Profile Image */}

                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 80
                    }}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: COLORS.white
                        }}
                    />
                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }}
                    >
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                marginBottom: -15,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 15,
                                backgroundColor: COLORS.primary
                            }}
                        >
                            <Image

                                source={icons.camera}
                                resizeMode="contain"
                                style={{
                                    width: 17,
                                    height: 17,
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Details */}

                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >Programmers</Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >Full Stack Developer</Text>

                    {/* Progress */}
                    <ProgressBar
                        progress="58%"
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                    }}>
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body4,
                                flex: 1
                            }}
                        >
                            Overall Progress
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body4,
                            }}
                        >58%</Text>
                    </View>

                    {/* Member */}

                    <TextButton 
                        label="+ Become a Member"
                        contentContainerStyle={{
                            height:35,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 20,
                            backgroundColor: appTheme?.backgroundColor4,
                            marginTop: SIZES.padding
                        }}

                        labelStyle={{
                            color: appTheme?.textColor2,
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between',
                    marginTop: 50
                }}
            >
                <Text style={{
                    ...FONTS.h1,
                    color: appTheme?.textColor,
                }}>
                    Profile
                </Text>

                <IconButton
                    icon={icons.sun}
                    iconStyle={{
                        tintColor: appTheme?.tintColor,
                    }}
                    onPress={toggleThemeHandler}
                />
            </View>
        )
    }


    function renderProfileSection1()
    {
        return(
            <View style={styles.profileSectionContainer}>
                    <ProfileValue 
                        icon={icons.profile}
                        label="Name"
                    value="surendra ediga"
                    />
                    <LineDivider />
                <ProfileValue
                    icon={icons.email}
                    label="Email"
                    value="surendraediga477@gmail.com"
                />
                <LineDivider />
                <ProfileValue
                    icon={icons.password}
                    label="Name"
                    value="Updated 2 weeks ago"
                />

                <LineDivider />
                <ProfileValue
                    icon={icons.call} 
                    label="Contact Number"
                    value="+91 7977318133"
                />
                
            </View>
        )
    }

    function renderProfileSection2()
    {
        return(
            <View style={styles.profileSectionContainer}>
                <ProfileValue 
                    icon={icons.star_1}
                    value="Pages"
                />

                <LineDivider />
                <ProfileRadioButton 
                    icon={icons.new_icon}
                    label="New Course Notifications"
                    isSelected={newCourseNotification}
                    onPress={() => setNewCourseNotification(!newCourseNotification)}
                />

                <LineDivider />

                <ProfileRadioButton
                    icon={icons.reminder}
                    label="Study Reminder"
                    isSelected={studyReminder}
                    onPress={() => setStudyReminder(!studyReminder)}
                />
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme.backgroundColor1,
            }}
        >
            {/* Header */}
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                {/* Profile Card */}

                {renderProfileCard()}


                {/* Profile Selection 1 */}

                {renderProfileSection1()}

                {/* Profile Selection 2 */}

                {renderProfileSection2()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSectionContainer:{
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth:1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20,
    }
})


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
export default connect(mapStateToProps,mapDispatchToProps)(Profile);