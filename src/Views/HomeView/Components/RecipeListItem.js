import React, {Fragment} from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from "react-native";
import {homeViewStyles as styles} from "../HomeView.style";
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

const RecipeListItem = ({
                            item: {imgUri, headerTitle, noOfStars, preparationTime, cookingTime, id},
                            onPress, itemIndex, setRecipes
                        }) => {

    function onLongPressDelete() {
        setRecipes((prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));
            newState.splice(itemIndex, 1);
            return newState
        })
    }

    return (
        <Fragment key={id}>
            <TouchableOpacity onPress={onPress} onLongPress={onLongPressDelete}
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
                            <Text style={{fontWeight: "600", marginTop: 5}}>{preparationTime}</Text>
                        </View>
                        <View style={styles.food}>
                            <FontAwesome name="fire" size={18} color="#fa724c"/>
                            <Text style={{fontWeight: "600", marginTop: 5}}>{cookingTime}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Fragment>
    )
};

export default RecipeListItem

const style = StyleSheet.create({
    listItemContainer: {backgroundColor: "#fff"},
})
