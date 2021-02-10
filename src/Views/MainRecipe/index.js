import React, {useState, useEffect} from 'react';
import {Text, View, ImageBackground, Image, StatusBar, ScrollView, TextInput, TouchableOpacity, Button, Alert, KeyboardAvoidingView} from "react-native";
import {FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import {mainRecipeStyle as styles} from "./MainRecipe.style"
import recipeStore from "../../Stores/RecipeStore";
import * as ImagePicker from 'expo-image-picker';

function MainRecipe({route, navigation}) {

    const {newItem, recipe} = route?.params;

    const [state, setState] = useState({imgUri: "", headerTitle:"", contentText: "", ingredients: []});

    const [isHighlighted, setIsHighlighted] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setState({...state, imgUri: result.uri});
        }
    };

    useEffect(() => {
        // console.log(recipeStore.recipes);
        }, [])

            return (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    keyboardVerticalOffset={-35}
                >
                    <StatusBar barStyle="light-content"/>
                    <View style={styles.upperContainer}>
                        {newItem ?
                            <View style={styles.image}>
                                {state.imgUri ?
                                    <ImageBackground resizeMode="cover"
                                                     style={styles.image}
                                                     source={{uri: state.imgUri}}>
                                        <View style={styles.mainRecipe}>
                                            <TextInput style={styles.text}
                                                       placeholder={"Add Title"}
                                                       onChangeText={e => setState({...state, headerTitle: e})}
                                            />
                                        </View>
                                    </ImageBackground> :
                                    <TouchableOpacity onPress={pickImage}>
                                        <View>
                                            <SimpleLineIcons name="picture" size={48} color="gray"/>
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
                                            .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"}
                                                                     size={18}
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
                                    <TextInput style={[styles.descriptionText, isHighlighted && styles.isHighlighted]}
                                               placeholder={"Write the description here"}
                                               multiline
                                               onFocus={() => { setIsHighlighted(true)}}
                                               onBlur={() => {setIsHighlighted(false)}}
                                               onSubmitEditing={e => setState({...state, contentText: e.nativeEvent.text})}
                                               blurOnSubmit={true}
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
                                {
                                    newItem ?
                                        <View>
                                            {state.ingredients.map(ingredient => <RenderBulletRow ingredient={ingredient}/>)}
                                            <View style={{flexDirection: "row", width: 100}}>
                                                <Text style={{color: "#fa724c", paddingRight: 5}}>{'\u2022'}</Text>
                                                <TextInput style={styles.addIngredientTextInput} onSubmitEditing={
                                                    (e) => {
                                                        setState({...state,
                                                            ingredients: [...state.ingredients, e.nativeEvent.text]
                                                        })
                                                        e.currentTarget.clear()
                                                    }
                                                } placeholder={"Add new"}/>
                                            </View>
                                        </View>
                                        :
                                        recipe?.ingredients?.map(ingredient => (<RenderBulletRow ingredient={ingredient}/>))
                                }
                            </View>
                        </ScrollView>
                        {newItem ?
                            <Button title={"Save recipe"} onPress={e =>
                                {
                                    console.log(state.ingredients);
                                    if (state.imgUri !== "" && state.contentText !==""  && state.headerTitle !== "" && state.ingredients.length !== 0) {
                                        console.log({...state});
                                        recipeStore.addItem({...state});
                                        navigation.goBack();
                                    } else {
                                        Alert.alert(
                                            'All data fields are mandatory',
                                            'Before saving please complete the fields',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                },
                                                { text: 'OK', onPress: () => console.log('OK Pressed') }
                                            ],
                                            { cancelable: false }
                                        );
                                    }
                                }
                            }/> :
                            null
                        }
                    </View>
                </KeyboardAvoidingView>
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
