import React, {useState, Fragment} from 'react';
import {TouchableOpacity, Image, Text, View} from "react-native";
import {homeViewStyles as styles} from "../HomeView.style";
import {FontAwesome, MaterialCommunityIcons, MaterialIcons, AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";
import {REMOVE_RECIPE} from "../../../Stores/RecipeItems";
import { useDispatch } from 'react-redux'


const RecipeListItem = ({item, onPress, itemIndex, setRecipes}) => {

    const {
        imgUri, headerTitle, noOfStars,
        preparationTime, cookingTime, id
    } = item;
    const [isPressed, setIsPressed] = useState({itemIndex: itemIndex, value: false});
    const {navigate} = useNavigation();

    const dispatch = useDispatch();

    const removeItemFromList = item =>
        dispatch({
            type: REMOVE_RECIPE,
            payload: item
        })

    function onDelete() {
        setRecipes((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));
            newState.splice(itemIndex, 1);
            removeItemFromList(itemIndex);
            return newState
        })
    }

    return (
        <Fragment key={id}>
            <View>
                <TouchableOpacity onPress={onPress} onLongPress={() => {
                    setIsPressed({...isPressed, value: true})
                }}
                                  style={[styles.item]}>
                    <Image style={styles.image} source={{uri: imgUri}}/>
                    <View style={styles.columnContainer}>
                        <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={1}>{headerTitle}</Text>
                        <View style={styles.stars}>
                            {new Array(5).fill(false).fill(true, 0, noOfStars)
                                .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"} size={16}
                                                         color="#ff0003"/>)}
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.food}>
                                <MaterialCommunityIcons name="rice" size={15} color="#7fb33d"/>
                                <Text style={{fontSize: 13, marginTop: 5, marginLeft: 4, color: "gray"}}>{preparationTime ? `${preparationTime} min` : `0 min`}</Text>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View style={styles.food}>
                                <FontAwesome name="fire" size={15} color="#7fb33d"/>
                                <Text style={{fontSize: 13, marginTop: 5, marginLeft: 4, color: "gray"}}>{cookingTime ? `${cookingTime} min` : `0 min`}</Text>
                            </View>
                        </View>
                    </View>
                    {(isPressed.value) ?
                        <View style={styles.longPressView}>
                            <TouchableOpacity style={{marginRight: 5}} onPress={() => {
                                navigate('MainRecipe', {
                                    itemIndex, recipe: item, editItem: true
                                })
                            }}>
                                <AntDesign name="edit" size={24} color="gray"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight: 5}} onPress={onDelete}>
                                <AntDesign name="delete" size={24} color="gray"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setIsPressed({...isPressed, value: false})
                            }}>
                                <AntDesign name="closesquareo" size={24} color="gray"/>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </TouchableOpacity>
            </View>
        </Fragment>
    )
};

export default RecipeListItem;
