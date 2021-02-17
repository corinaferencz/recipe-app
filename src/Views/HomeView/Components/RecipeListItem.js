import React, {useState, Fragment} from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from "react-native";
import {homeViewStyles as styles} from "../HomeView.style";
import {FontAwesome, MaterialCommunityIcons, MaterialIcons, AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";
import recipeStore from "../../../Stores/RecipeStore";
import {observer} from "mobx-react";

const RecipeListItem = ({item, onPress, itemIndex, setRecipes}) => {
    const {
        imgUri, headerTitle, noOfStars,
        preparationTime, cookingTime, id
    } = item;
    const [isPressed, setIsPressed] = useState({itemIndex: itemIndex, value: false});
    const {navigate} = useNavigation();

    function onDelete() {
        setRecipes((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));
            newState.splice(itemIndex, 1);
            recipeStore.deleteItem(itemIndex);
            return newState
        })
    }

    return (
        <Fragment key={id}>
            <View>
                <TouchableOpacity onPress={onPress} onLongPress={() => {
                    setIsPressed({...isPressed, value: true})
                }}
                                  style={[styles.item, style.listItemContainer]}>
                    <Image style={styles.image} source={{uri: imgUri}}/>
                    <View style={styles.columnContainer}>
                        <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={1}>{headerTitle}</Text>
                        <View style={styles.stars}>
                            {new Array(5).fill(false).fill(true, 0, noOfStars)
                                .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"} size={18}
                                                         color="#fa724c"/>)}
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.food}>
                                <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                                <Text style={{fontWeight: "600", marginTop: 5}}>{preparationTime ? `${preparationTime} min` : `0 min`}</Text>
                            </View>
                            <View style={styles.food}>
                                <FontAwesome name="fire" size={18} color="#fa724c"/>
                                <Text style={{fontWeight: "600", marginTop: 5}}>{cookingTime ? `${cookingTime} min` : `0 min`}</Text>
                            </View>
                        </View>
                    </View>
                    {(isPressed.value) ?
                        <View style={{
                            position: "absolute",
                            flexDirection: "row",
                            right: 0,
                            backgroundColor: "lightgray"
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigate('MainRecipe', {
                                    itemIndex, recipe: item, editItem: true
                                })
                            }}>
                                <AntDesign name="edit" size={24} color="gray"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDelete}>
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

export default observer(RecipeListItem);

const style = StyleSheet.create({
    listItemContainer: {backgroundColor: "#fff"},
})
