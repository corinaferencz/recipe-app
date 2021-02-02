import React, {useState} from 'react';
import {Text, View, ImageBackground, Image, StatusBar, ScrollView, TextInput, TouchableOpacity, Button} from "react-native";
import {FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import {mainRecipeStyle as styles} from "./MainRecipe.style"
import recipeStore from "../../Stores/RecipeStore";
import * as ImagePicker from 'expo-image-picker';

function MainRecipe({route}) {

    const {newItem, recipe} = route?.params;

    const [image, setImage] = useState(null);

    const [state, setState] = useState({imgUri: "", headerTitle:"", contentText: ""});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setState({...state, imgUri: result.uri});
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.upperContainer}>
                {newItem ?
                    <View style={styles.image}>
                        {image ?
                            <ImageBackground resizeMode="cover"
                                             style={styles.image}
                                             source={{ uri: image }}>
                                <View style={styles.mainRecipe}>
                                    <TextInput style={styles.text}
                                            placeholder={"Add Title"}
                                            onChangeText = {e=>setState({...state, headerTitle:e})}
                                    />
                                </View>
                            </ImageBackground>:
                            <TouchableOpacity onPress={pickImage}>
                                <View>
                                    <SimpleLineIcons name="picture" size={48} color="gray" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View> :
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
                    <View style={styles.sectionContainer}>
                        <Text style={styles.descriptionText}>
                            {recipe?.originalPostDate ?
                                new Date(recipe?.originalPostDate).toUTCString() :
                                new Date().toUTCString()}
                        </Text>
                        {recipe?.contentText ?
                            <Text style={styles.descriptionText}>{recipe?.contentText}</Text> :
                            <TextInput style={styles.descriptionText}
                                       placeholder={"Write the description here"}
                                       onChangeText = {e=>setState({...state,contentText:e})}
                            />}
                        <View style={styles.rowContainer}>
                            <View stype={{flex: 1, alignItems: "flex-start"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome5 name="user-circle" size={18} color="#fa724c"/>
                                    <Text style={{
                                        fontWeight: "600",
                                        marginTop: 5
                                    }}>{recipe?.noOfServings || 0}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "center"}}>
                                <View style={styles.columnContainer}>
                                    <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                                    <Text style={{
                                        fontWeight: "600",
                                        marginTop: 5
                                    }}>{recipe?.preparationTime || 0}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "flex-end"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome name="fire" size={18} color="#fa724c"/>
                                    <Text style={{
                                        fontWeight: "600",
                                        marginTop: 5
                                    }}>{recipe?.cookingTime || 0}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.sectionContainer}>
                        <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                        {recipe?.ingredients?.map(ingredient => (
                            <RenderBulletRow ingredient={ingredient}/>))}
                    </View>
                </ScrollView>
                {newItem ?
                    <Button title={"Save recipe"} onPress={recipeStore.addItem(state)}/> :
                    console.log("")
                }
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
