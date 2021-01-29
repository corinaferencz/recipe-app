import React, {useState} from 'react';
import {TextInput, Text, View, FlatList, TouchableOpacity} from "react-native";
import {homeViewStyles as styles} from "./HomeView.style"
import {EvilIcons, FontAwesome5} from '@expo/vector-icons';
import recipeDummyData from "../../DummyData/recipeDummyData";
import RecipeListItem from "./Components/RecipeListItem";


function HomeView({navigation}) {
    const [recipes, setRecipes] = useState(recipeDummyData);

    function inputOnChange(e) {
        const result = recipeDummyData
            .filter(({headerTitle}) => {
                headerTitle = headerTitle.toUpperCase();
                e = e.toUpperCase();
                return headerTitle.includes(e)
            });
        setRecipes(result)
    }

    const listEmptyComponent = () => (
        <View style={styles.listEmptyContainer}>
            <FontAwesome5 name="window-close" size={40} color="lightgray" />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <EvilIcons name="search" size={24} color="gray"/>
                <TextInput color="gray"
                           placeholder={"SEARCH"}
                           onChangeText={inputOnChange}
                />
            </View>
            <FlatList data={recipes}
                      renderItem={({item, index}) => (
                          <RecipeListItem item={item}
                                          setRecipes={setRecipes}
                                          itemIndex={index}
                                          key={item.id}
                                          onPress={() => navigation.navigate('MainRecipe', {itemIndex: index})}/>)}
                      keyExtractor={(item) => item.id}
                      contentContainerStyle={{ flexGrow: 1 }}
                      ListEmptyComponent={() => listEmptyComponent()}
            />
            <AddRecipeButton title="Add recipe"/>
        </View>
    );
}


const AddRecipeButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export default HomeView;
