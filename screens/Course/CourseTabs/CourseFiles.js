import React from 'react';
import {View, StyleSheet,Text,Image,ScrollView} from 'react-native';
import { COLORS, FONTS, icons, SIZES, images, dummyData } from "../../../constants"; 
import {
    IconButton,TextButton
} from "../../../components";
const CourseFiles = () => {

    function renderStudents(){
        let students = [];
        if(dummyData?.course_details?.students.length > 3)
        {
            students = dummyData?.course_details?.students.slice(0,3)
        }else{
            students = dummyData?.course_details?.students
        }
        return (
            <View>
                <Text style={{...FONTS.h2,fontSize:25}}>Student</Text>
                {/* Students */}
                <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.radius,
                    alignItems: 'center',
                }}
                >

                {students.map((item, index) => {
                    return(
                        <View
                        key={`Students-${index}`}

                        style={{
                            marginLeft:index > 0?
                            SIZES.radius :0 
                        }}
                        >
                        <Image 
                            source ={item?.thumbnail}
                            style={{
                                width:80,
                             height:80,
                             
                            }}
                        />

                        </View>
                    )
                } )}
                    {dummyData?.course_details?.students.length > 3 &&
                        <TextButton 
                            label="View All"
                            labelStyle={{
                                color:COLORS.primary,
                                ...FONTS.h3
                            }}

                            contentContainerStyle={{
                                marginLeft:SIZES.base + 15,
                                backgroundColor:null
                            }}
                        />
                    }

                </View>
            </View>
        )
    }

    function renderFiles(){
        return(
            <View
            style={{
                marginTop:SIZES.padding
            }}
            >
                {/* Section Title */}
                <Text style={{...FONTS.h2, fontSize:25}}>Files</Text>


                {/* Files */}
                {dummyData?.course_details?.files.map((item, index) => {
                    return(
                        <View key={`Files-${index}`}
                        style={{flexDirection:'row',marginTop:SIZES.radius}}
                        >
                        {/* Thumbnail */}
                        <Image 
                            source={item?.thumbnail}
                            style={{
                                width:80,
                                height:80
                            }}
                        />

                        {/* Name, author & Data */}
                        <View style={{flex:1,marginLeft:SIZES.padding}}>
                            <Text style={{...FONTS.h2}}>{item?.name}</Text>
                            <Text style={{color:COLORS.gray30, ...FONTS.body3}}>{item?.author}</Text>
                            <Text style={{...FONTS.body4}}>{item?.upload_date}</Text>
                        </View>

                        {/* Menu */}

                        <IconButton 
                            icon={icons?.menu}
                            iconStyle={{
                                width:25,
                                height:25,
                                tintColor:COLORS.black
                            }}

                            containerStyle={{
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:25
                            }}
                        />
                        </View>
                    )
                })}
            </View>
        )
    }
    return (
        <ScrollView
        contentContainerStyle={{
            padding:SIZES.padding
        }}
        >
        {/* Students */}
        {renderStudents()}

        {/* Files */}
        {renderFiles()}

        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default CourseFiles;
