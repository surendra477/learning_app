import React from 'react';
import {View,Text,TextInput,Keyboard,FlatList,Image, StyleSheet} from 'react-native';

import { IconButton, IconLabelButton } from '../../../components';
import { COLORS, FONTS, icons, SIZES, images, dummyData } from "../../../constants"; 

const CommentSection = ({commentItem,commentOption,replies}) => {
    return (
        <View
        style={{flexDirection:'row',marginTop:SIZES.padding}}
        >
            {/* Profile Photo */}
                <Image 
                    source={commentItem?.profile}
                    style={{
                        width:40,
                        height:40,
                        borderRadius:20
                    }}
                />
            {/* Name & Comment */}

            <View
            style={{
                flex:1,
                marginTop:3,
                marginLeft:SIZES.radius
            }}
            >
                {/* Name */}
                    <Text style={{...FONTS.h3}}>{commentItem?.name}</Text>
                {/* Comment */}

                <Text style={{ ...FONTS.body4 }}>{commentItem?.comment}</Text>

                {/* Comment Options */}
                {commentOption}

                {/* replies */}
                {replies}
            </View>
        </View>
    )
}

const CourseDisscussions = () => {

    const [footerPosition,setFooterPosition] = React.useState(0);
 const [footerHeight, setFooterHeight] = React.useState(60);
    React.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {setFooterPosition(e.endCoordinates.height)})

        const hideSubscription = Keyboard.addListener("keyboardWillHide", (e) => { setFooterPosition(0) })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    },[])
    function renderDisscussions(){
        return(
            <View
            style={{flex:1}}
            >
<FlatList 
    data={dummyData?.course_details?.discussions}
    keyExtractor={item => `Disscussions-main-${item.id}`}
    contentContainerStyle={{
        paddingHorizontal:SIZES.padding,
        paddingBottom:70
    }}
    renderItem={({item,index}) => (
        <CommentSection 
            commentItem={item}
            commentOption={
                <View
                style={{
                    flexDirection:"row",
                    marginTop:SIZES.radius,
                    paddingVertical:SIZES.base,
                    borderTopWidth:1,
                    borderBottomWidth:1,
                    borderColor:COLORS.gray20
                }}
                >
                    {/* Comment */}
                    <IconLabelButton 
                    icon={icons.comment}
                    label={item?.no_of_comments}
                        iconStyle={{
                           
                            tintColor:COLORS.black,

                        }}

                        labelStyle={{
                            marginLeft:3,
                            color:COLORS.black,
                            ...FONTS.h4
                        }}


                    />

                    {/* Like */}
                    <IconLabelButton 
                        icon={icons.heart}
                        label={item?.no_of_likes}
                        containerStyle={{
                            marginLeft:SIZES.radius
                        }}
                        labelStyle={{
                            marginLeft:3,
                            color:COLORS.black,
                            ...FONTS.h4
                        }}
                    />

                    {/* Date */}
                    <Text
                    style={{
                        flex:1,
                        textAlign:'right',
                        ...FONTS.h4
                    }}
                    >
                        {item?.posted_on}
                    </Text>
                </View>
            }
            replies={
                <FlatList 
                    data={item?.replies}
                    scrollEnabled={false}
                    keyExtractor={item => `Disscussions-replies-${item.id}`}
                    renderItem={({item,index}) => (
                        <CommentSection 
                            commentItem={item}
                            commentOption={
                                    <View
                                   style={{
                                    flexDirection:'row',
                                    marginTop:SIZES.radius,
                                    paddingVertical:SIZES.base,
                                    borderTopWidth:1,
                                    borderBottomWidth:1,
                                    borderColor:COLORS.gray20
                                   }} 
                                    >


                                    {/* Reply */}
                                    <IconLabelButton 
                                        icon={icons.reply}
                                        label="Reply"
                                        labelStyle={{
                                            marginLeft:5,
                                            color:COLORS.black,
                                            ...FONTS.h4
                                        }}
                                    />

                                    {/* Like */}
                                    <IconLabelButton
                                        icon={icons.heart_off}
                                        label="Like"
                                        labelStyle={{
                                            marginLeft: 3,
                                            color: COLORS.black,
                                            ...FONTS.h4
                                        }}
                                        containerStyle={{
                                            marginLeft:SIZES.radius
                                        }}
                                    />

                                    {/* Date */}
                                    <Text
                                    style={{
                                        flex:1,
                                        textAlign:'right',
                                        ...FONTS.h4,
                                    }}
                                    >
{item?.posted_on    }
                                    </Text>
                                    </View>
                            }
                        />
                    )}
                />
            }
        />
    )}
/>
            </View>
        )
    }
    function renderFooter(){
        return(
            <View
            style={{
                flexDirection:'row',
                position:'absolute',
                    bottom: footerPosition,
                left:0,
                right:0,
                    height: footerHeight,
                paddingHorizontal:SIZES.padding,
                paddingVertical:SIZES.radius,
                backgroundColor:COLORS.gray10
            }}
            >

                <TextInput 
                    style={{
                        flex:1,
                        marginRight:SIZES.base,
                        ...FONTS.body3
                    }}
                    multiline
                    placeholder='Type Something'
                    placeholderTextColor={COLORS.gray80}
                    onContentSizeChange={(event) => {
                        const height = event.nativeEvent.contentSize.height
                        if(height <= 60)
                        {
                            setFooterHeight(60)
                        }else if(height > 60 && height <= 100){
                            setFooterHeight(height)
                        }else if(height > 100)
                        {
                            setFooterHeight(100)
                                                        }
                    }}
                />
<View style={{
    justifyContent:'center',
    alignItems:"center"
}}>
                    <IconButton
                        icon={icons.send}
                        iconStyle={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.primary
                        }}
                    />
</View>
               
            </View>
        )
    }
    return (
        <View
        style={{
            flex:1,
            backgroundColor:COLORS.white
        }}
        >
                     {/* Disscussions */}
                        {renderDisscussions()}
                     {/* Footer */}
                     {renderFooter()}
        </View>
    );
}

const styles = StyleSheet.create({})

export default CourseDisscussions;
