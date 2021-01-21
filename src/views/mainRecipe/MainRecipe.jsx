import React from 'react';
import {Text, View, ImageBackground, Image, StatusBar, ScrollView} from "react-native";
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {mainRecipeStyle as styles} from "./mainRecipe.style"
import recipeDummyData from "../../dummyData/recipeDummyData";

function MainRecipe() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.upperContainer}>
                <ImageBackground resizeMode="cover"
                                 style={styles.image}
                                 source={require("../../../assets/images/tiramisu.jpg")}>
                    <View style={styles.headerContainer}>
                        <View style={styles.menuBar}>
                            <View style={styles.back}>
                                <AntDesign name="arrowleft" size={22} color="#fff"/>
                            </View>
                            <AntDesign name="download" size={22} color="#fff"/>
                        </View>
                        <View style={styles.mainRecipe}>
                            <Text style={[styles.text]}>{recipeDummyData.headerTitle}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.recipeContainer}>
                <ScrollView>
                    <View style={styles.bookmarkContainer}>
                        <View sytyle={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <FontAwesome name="bookmark-o" size={18}/>
                                <Text
                                    style={{fontSize: 13, paddingLeft: 5}}>{recipeDummyData.noOfBookmarks} added</Text>
                            </View>
                            <Text style={{fontSize: 13, color: "#fa724c"}}>You add too!</Text>
                        </View>
                        <View sytyle={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <Image style={styles.userImage}
                                       source={require("../../../assets/images/user.png")}/>
                                <Text style={{paddingLeft: 5}}>{recipeDummyData.creatorName}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                {new Array(5).fill(false).fill(true, 0, recipeDummyData.noOfStars)
                                    .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"} size={18}
                                                             color="#fa724c"/>)}
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.descriptionText}>
                        <Text style={{color: "#99a2ab", marginBottom: 10, fontSize: 13, textAlign:'justify'}}>21 March 2019{"\n"} {"\n"}
                            {recipeDummyData.contentText}
                        </Text>
                        <View style={styles.rowContainer}>
                            <View stype={{flex: 1, alignItems: "flex-start"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome5 name="user-circle" size={18} color="#fa724c"/>
                                    <Text style={{fontWeight: "600", marginTop: 5}}>{recipeDummyData.noOfServings}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "center"}}>
                                <View style={styles.columnContainer}>
                                    <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                                    <Text style={{fontWeight: "600", marginTop: 5}}>{recipeDummyData.preparationTime}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "flex-end"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome name="fire" size={18} color="#fa724c"/>
                                    <Text style={{fontWeight: "600", marginTop: 5}}>{recipeDummyData.cookingTime}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.descriptionText}>
                        <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                        {recipeDummyData.ingredients.map(ingredient => (<RenderBulletRow ingredient={ingredient}/>))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


const RenderBulletRow = ({ingredient}) => {
    return (
        <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={{color: "#fa724c"}}>{'\u2022'}</Text>
            <Text style={{paddingLeft: 5, color: "#99a2ab", fontSize: 13}}>{ingredient}</Text>
        </View>
    );
}


export default MainRecipe;
