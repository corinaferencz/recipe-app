import React, {useState} from 'react';
import {
    Text,
    View,
    ImageBackground,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import {
    FontAwesome,
    MaterialIcons,
    FontAwesome5,
    MaterialCommunityIcons,
    SimpleLineIcons,
    AntDesign
} from "@expo/vector-icons";
import {mainRecipeStyle as styles} from "./MainRecipe.style"
import {recipeStore} from "../../Stores/RecipeStore";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import {ADD_RECIPE, UPDATE} from "../../Stores/RecipeItems";

function MainRecipe({route, navigation}) {

    const {newItem, recipe, editItem, itemIndex} = route?.params;

    const [state, setState] = useState(recipe ||
        {imgUri: "", headerTitle: "", contentText: "", ingredients: [], preparationTime: "", cookingTime: "", noOfStars: 0});

    const [isHighlighted, setIsHighlighted] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setState({...state, imgUri: result.uri});
        }
    };

    const dispatch = useDispatch()
    const addRecipe = item => dispatch({ type: ADD_RECIPE, payload: item })
    const updateRecipe = item => dispatch({ type: UPDATE, payload: item})

    const checkIfNewOrEditItem = newItem || editItem;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={-35}
        >
            <StatusBar barStyle="light-content"/>
            <View style={styles.upperContainer}>
                {checkIfNewOrEditItem ?
                    <View style={[styles.image, editItem ? {backgroundColor: "transparent"} : {}]}>
                        {state.imgUri ?
                            <ImageBackground resizeMode="cover" style={styles.image} source={{uri: state.imgUri}}>
                                {editItem ? <TouchableOpacity onPress={pickImage}
                                                              style={{alignItems: "center", backgroundColor: "rgba(1,1,1,0.5)", padding: 10}}>
                                    <SimpleLineIcons name="picture" size={48} color="white"/>
                                    <Text style={{color: "white"}}>Press here to change the image</Text>
                                </TouchableOpacity> : null}
                                <View style={styles.mainRecipe}>
                                    <TextInput style={styles.text}
                                               placeholder={"Add Title"}
                                               onSubmitEditing={e => setState({...state, headerTitle: e.nativeEvent.text})}
                                    >{editItem ? state.headerTitle : null}</TextInput>
                                </View>
                            </ImageBackground> :
                            <TouchableOpacity onPress={pickImage}>
                                <SimpleLineIcons name="picture" size={48} color="gray"/>
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
                            <Text style={{fontSize: 13, color: "#7fb33d"}}>You add too!</Text>
                        </View>
                        <View sytyle={styles.columnContainer}>
                            <View style={{flexDirection: "row",
                                marginTop: 5}}>
                                <ImageBackground style={styles.userImage}
                                                 source={{uri: recipeStore.userDetails.imgUri}}/>
                                <Text style={{marginLeft: 5}}>{recipeStore.userDetails.username}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                {checkIfNewOrEditItem ? [...Array(5)].map((e, i) =>
                                        <TouchableOpacity onPress={() => setState({...state, noOfStars: i + 1})}>
                                            <MaterialIcons name={ i < state.noOfStars ? "star-rate" : "star-border"}
                                                           size={18}
                                                           color="#ff0003"/>
                                        </TouchableOpacity>
                                    ) :
                                    new Array(5).fill(false)
                                        .fill(true, 0, state.noOfStars)
                                        .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"}
                                                                 size={18}
                                                                 color="#ff0003"/>)}
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
                        {checkIfNewOrEditItem ?
                            <TextInput style={[styles.descriptionText, isHighlighted && styles.isHighlighted]}
                                       placeholder={"Write the description here"}
                                       multiline
                                       onFocus={() => {
                                           setIsHighlighted(true)
                                       }}
                                       onBlur={() => {
                                           setIsHighlighted(false)
                                       }}
                                       onSubmitEditing={e => setState({...state, contentText: e.nativeEvent.text})}
                                       blurOnSubmit={true}
                            >{editItem ? state.contentText : null}</TextInput> :
                            <Text style={styles.descriptionText}>{state.contentText}</Text>
                        }
                        <View style={[styles.rowContainer, styles.cookTimeContainer]}>
                            <View stype={{flex: 1}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome5 name="user-circle" size={18} color="#7fb33d"/>
                                    <Text style={{
                                        fontWeight: "500",
                                        marginTop: 5
                                    }}>{recipe?.noOfServings || 0}</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "center"}}>
                                <View style={styles.columnContainer}>
                                    <MaterialCommunityIcons name="rice" size={18} color="#7fb33d"/>
                                    {checkIfNewOrEditItem ?
                                        <View style={{flexDirection: "row", marginTop: 5}}>
                                            <TextInput style={{fontWeight: "500", marginRight: 5}}
                                                       placeholder={"0"}
                                                       onSubmitEditing={e => setState({...state, preparationTime: e.nativeEvent.text})}
                                                       blurOnSubmit={true}
                                                       keyboardType={"numbers-and-punctuation"}
                                            >{editItem ? state.preparationTime : null}</TextInput>
                                            <Text>min</Text>
                                        </View> :
                                        <Text style={{
                                            fontWeight: "500",
                                            marginTop: 5
                                        }}>{recipe?.preparationTime || 0} min</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome name="fire" size={18} color="#7fb33d"/>
                                    {checkIfNewOrEditItem ?
                                        <View style={{flexDirection: "row", marginTop: 5}}>
                                            <TextInput style={{fontWeight: "500", marginRight: 5}}
                                                       placeholder={"0"}
                                                       onSubmitEditing={e => setState({...state, cookingTime: e.nativeEvent.text})}
                                                       blurOnSubmit={true}
                                                       keyboardType={"numbers-and-punctuation"}
                                            >{editItem ? state.cookingTime : null}</TextInput>
                                            <Text>min</Text>
                                        </View>    :
                                        <Text style={{
                                            fontWeight: "500",
                                            marginTop: 5
                                        }}>{recipe?.cookingTime || 0} min</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.sectionContainer}>
                        <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                        {checkIfNewOrEditItem ?
                            <View>
                                {state.ingredients.map(ingredient => <RenderBulletRow ingredient={ingredient} state={state} setState={setState} checkIfNewOrEditItem={checkIfNewOrEditItem} />)}
                                <View style={{flexDirection: "row", width: 100}}>
                                    <Text style={{color: "#7fb33d", paddingRight: 5}}>{'\u2022'}</Text>
                                    <TextInput style={styles.addIngredientTextInput} onSubmitEditing={
                                        (e) => {
                                            setState({
                                                ...state,
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
                {checkIfNewOrEditItem ?
                    <TouchableOpacity style={styles.saveRecipeButton} onPress={e => {
                        const {imgUri, contentText, headerTitle, ingredients} = {...state};
                        if (imgUri && contentText && headerTitle && ingredients.length) {
                            newItem ? addRecipe({...state}) : updateRecipe({itemIndex, newItem: {...state}});
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
                                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                                ],
                                {cancelable: false}
                            );
                        }
                    }
                    }>
                        <Text style={styles.saveRecipeText}>Save Recipe</Text>
                    </TouchableOpacity> :
                    null
                }
            </View>
        </KeyboardAvoidingView>
    );
}


const RenderBulletRow = ({ingredient, state, setState, checkIfNewOrEditItem}) => {

    function onDeleteIngredient() {
        let ingredients = [...state.ingredients];
        let index = ingredients.indexOf(ingredient);
        ingredients.splice(index,1);
        setState({...state, ingredients: ingredients});
    }

    return (
        <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={{color: "#7fb33d"}}>{'\u2022'}</Text>
            <Text style={{paddingLeft: 5, color: "#99a2ab", fontSize: 13}}>{ingredient}</Text>
            {checkIfNewOrEditItem ?
                <TouchableOpacity onPress={onDeleteIngredient} style={{marginLeft: 10}}>
                    <AntDesign name="delete" size={16} color="gray"/>
                </TouchableOpacity> :
                null
            }
        </View>
    );
}


export default MainRecipe;
