import React, {useState, useEffect} from 'react';
import {TextInput, Text, View, FlatList, TouchableOpacity} from "react-native";
import {homeViewStyles as styles} from "./HomeView.style"
import {EvilIcons, FontAwesome5} from '@expo/vector-icons';
import RecipeListItem from "./Components/RecipeListItem";
import {recipeStore} from "../../Stores/RecipeStore";
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SET_INITIAL} from "../../Stores/RecipeItems";

function HomeView({navigation}) {

    const recipes = useSelector(state => state);
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [textInput, setTextInput] = useState('');

    function handleChange(e) {
        const result = recipes
            .filter(({headerTitle}) => {
                headerTitle = headerTitle.toUpperCase();
                e = e.toUpperCase();
                return headerTitle.includes(e)
            });
        setTextInput(e)
        setFilteredRecipes(result)
    }

    useEffect(() => {
        AsyncStorage.getItem("recipeList").then((res) => {
            const parsedResponse = JSON.parse(res) || [];
            recipeStore.recipes = parsedResponse
            setInitial(parsedResponse)
            setFilteredRecipes(parsedResponse)
        }).catch((error) => {console.log('async error constructor',error)})
    },[])
    useEffect(() => {
        console.log(textInput);
        if(!textInput) { setFilteredRecipes(recipes); }
    },[recipes])

    const dispatch = useDispatch()
    const setInitial = item => dispatch({ type: SET_INITIAL, payload: item })

    const listEmptyComponent = () => (
        <View style={styles.listEmptyContainer}>
            <FontAwesome5 name="window-close" size={40} color="lightgray"/>
        </View>
    );

    console.log("It renders whenever an item is added");

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <EvilIcons name="search" size={24} color="gray"/>
                <TextInput color="gray"
                           placeholder={"SEARCH"}
                           onChangeText={handleChange}
                />
            </View>
            <FlatList data={filteredRecipes}
                      renderItem={({item, index}) => (
                          <RecipeListItem item={item}
                                          setRecipes={setFilteredRecipes}
                                          itemIndex={index}
                                          key={item.id}
                                          onPress={() => navigation.navigate('MainRecipe', {
                                              itemIndex: index,
                                              recipe: item,
                                              key: 'MainRecipe'
                                          })}/>)}
                      keyExtractor={(item) => item.id}
                      contentContainerStyle={{flexGrow: 1}}
                      ListEmptyComponent={() => listEmptyComponent()}
            />
            <AddRecipeButton title="Add recipe" onPress={() => navigation.push('MainRecipe', {newItem: true})}/>
        </View>
    );
}

const AddRecipeButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export default HomeView;

