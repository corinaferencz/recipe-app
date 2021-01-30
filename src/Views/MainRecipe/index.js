import React from 'react';
import {Text, View, ImageBackground, Image, StatusBar, ScrollView, TextInput} from "react-native";
import {FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {mainRecipeStyle as styles} from "./MainRecipe.style"
import recipeStore from "../../Stores/RecipeStore";

function MainRecipe({route}) {

    const {newItem, recipe} = route?.params;

    if (!!newItem) {
        console.log("Add New Recipe");
    } else {

    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.upperContainer}>
                {newItem ?
                    <View></View> :
                    <ImageBackground resizeMode="cover"
                                     style={styles.image}
                                     source={{uri: recipe.imgUri}}>
                        <View style={styles.mainRecipe}>
                            <Text style={[styles.text]}>{recipe?.headerTitle}</Text>
                        </View>
                    </ImageBackground>}
            </View>
            <View style={styles.recipeContainer}>
                <ScrollView>
                    <View style={styles.bookmarkContainer}>
                        <View sytyle={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <FontAwesome name="bookmark-o" size={18}/>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        paddingLeft: 5
                                    }}>{recipe?.noOfBookmarks || 0} added</Text>
                            </View>
                            <Text style={{fontSize: 13, color: "#fa724c"}}>You add too!</Text>
                        </View>
                        <View sytyle={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <Image style={styles.userImage}
                                       source={require("../../../assets/images/user.png")}/>
                                <Text
                                    style={{paddingLeft: 5}}>{recipeStore.userDetails.firstName + " " + recipeStore.userDetails.surname}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                {new Array(5).fill(false)
                                    .fill(true, 0, recipe?.noOfStars || 0)
                                    .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"} size={18}
                                                             color="#fa724c"/>)}
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.descriptionText}>
                        {/* TO DO : Separate in two text components and import and format the dat from recipe.originalPostDate*/}
                        <Text style={{color: "#99a2ab", marginBottom: 10, fontSize: 13, textAlign: 'justify'}}>21
                            March
                            2019{"\n"} {"\n"}
                            {recipe?.contentText}
                        </Text>
                        {/*https://reactnative.dev/docs/textinput*/}
                        {recipe?.contentText ? <Text>{recipe?.contentText}</Text> : <TextInput></TextInput>}
                        <View style={styles.rowContainer}>
                            <View stype={{flex: 1, alignItems: "flex-start"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome5 name="user-circle" size={18} color="#fa724c"/>
                                    <Text style={{
                                        fontWeight: "600",
                                        marginTop: 5
                                    }}>{recipe?.noOfServings}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "center"}}>
                                <View style={styles.columnContainer}>
                                    <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                                    <Text style={{
                                        fontWeight: "600",
                                        marginTop: 5
                                    }}>{recipe?.preparationTime}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "flex-end"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome name="fire" size={18} color="#fa724c"/>
                                    <Text style={{
                                        fontWeight: "600",
                                        marginTop: 5
                                    }}>{recipe?.cookingTime}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.descriptionText}>
                        <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                        {recipe?.ingredients?.map(ingredient => (
                            <RenderBulletRow ingredient={ingredient}/>))}
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
