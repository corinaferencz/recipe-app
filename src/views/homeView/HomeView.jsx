import React, { useState } from 'react';
import {Image, TextInput, Text, View, FlatList, TouchableOpacity} from "react-native";
import {homeViewStyles as styles} from "./homeView.style"
import {EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import recipeDummyData from "../../dummyData/recipeDummyData";


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Image style={styles.image} source={require("../../../assets/images/tiramisu.jpg")}/>
        <View style={styles.columnContainer}>
            <Text style={styles.title}>{item.headerTitle}</Text>
            <View style={styles.stars}>
                {new Array(5).fill(false).fill(true, 0, recipeDummyData.noOfStars)
                    .map(e => <MaterialIcons name={e === true ? "star-rate" : "star-border"} size={18}
                                            color="#fa724c"/>)}
            </View>
            <View style={styles.rowContainer}>
                    <View style={styles.food}>
                        <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                        <Text style={{fontWeight: "600", marginTop: 5}}>{recipeDummyData.preparationTime}</Text>
                    </View>
                    <View style={styles.food}>
                        <FontAwesome name="fire" size={18} color="#fa724c"/>
                        <Text style={{fontWeight: "600", marginTop: 5}}>{recipeDummyData.cookingTime}</Text>
                    </View>
            </View>
        </View>
    </TouchableOpacity>
);

function HomeView({ navigation }) {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ?  "lightgray" : "#fff";

        return (
            <Item item={item}
                  onPress={() => {setSelectedId(item.id); navigation.navigate('MainRecipe');}}
                      style={{ backgroundColor }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <EvilIcons name="search" size={24} color="gray" />
                <TextInput color="gray">SEARCH</TextInput>
            </View>
            <FlatList data={[recipeDummyData]}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      extraData={selectedId}
            />
            <AddRecipeButton title="Add recipe"/>
        </View>
    );
}

const AddRecipeButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export default HomeView;