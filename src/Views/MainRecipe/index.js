import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Button,
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
import recipeStore from "../../Stores/RecipeStore";
import * as ImagePicker from 'expo-image-picker';

function MainRecipe({route, navigation}) {
    const {newItem, recipe, editItem} = route?.params;

    const [state, setState] = useState(recipe ||
        {imgUri: "", headerTitle: "", contentText: "", ingredients: [], preparationTime: "", cookingTime: ""});

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
                {newItem || editItem ?
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
                        {newItem || editItem ?
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
                                    {newItem || editItem ?
                                        <TextInput style={{fontWeight: "600",
                                            marginTop: 5}}
                                                   placeholder={"0 min"}
                                                   onSubmitEditing={e => setState({...state, preparationTime: e.nativeEvent.text})}
                                                   blurOnSubmit={true}
                                        >{editItem ? state.preparationTime : "0 min"}</TextInput> :
                                        <Text style={{
                                            fontWeight: "600",
                                            marginTop: 5
                                        }}>{recipe?.preparationTime || 0}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View stype={{flex: 1, alignItems: "flex-end"}}>
                                <View style={styles.columnContainer}>
                                    <FontAwesome name="fire" size={18} color="#fa724c"/>
                                    {newItem || editItem ?
                                        <TextInput style={{fontWeight: "600",
                                            marginTop: 5}}
                                                   placeholder={"0 min"}
                                                   onSubmitEditing={e => setState({...state, cookingTime: e.nativeEvent.text})}
                                                   blurOnSubmit={true}
                                        >{editItem ? state.cookingTime : "0 min"}</TextInput> :
                                        <Text style={{
                                            fontWeight: "600",
                                            marginTop: 5
                                        }}>{recipe?.cookingTime || 0}</Text>}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.sectionContainer}>
                        <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                        {newItem || editItem ?
                                <View>
                                    {state.ingredients.map(ingredient => <RenderBulletRow ingredient={ingredient} state={state} setState={setState} newItem={newItem} editItem={editItem}/>)}
                                    <View style={{flexDirection: "row", width: 100}}>
                                        <Text style={{color: "#fa724c", paddingRight: 5}}>{'\u2022'}</Text>
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
                {newItem || editItem ?
                    <Button title={"Save recipe"} onPress={e => {
                        const {imgUri, contentText, headerTitle, ingredients} = {...state};
                        if (imgUri && contentText && headerTitle && ingredients.length) {
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
                                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                                ],
                                {cancelable: false}
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


const RenderBulletRow = ({ingredient, state, setState, newItem, editItem}) => {

    function onDeleteIngredient() {
        let ingredients = [...state.ingredients];
        let index = ingredients.indexOf(ingredient);
        ingredients.splice(index,1);
        setState({...state, ingredients: ingredients});
    }

    return (
        <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={{color: "#fa724c"}}>{'\u2022'}</Text>
            <Text style={{paddingLeft: 5, color: "#99a2ab", fontSize: 13}}>{ingredient}</Text>
            {newItem || editItem ?
                <TouchableOpacity onPress={onDeleteIngredient} style={{marginLeft: 10}}>
                    <AntDesign name="delete" size={16} color="gray"/>
                </TouchableOpacity> :
                null
            }
        </View>
    );
}


export default MainRecipe;
