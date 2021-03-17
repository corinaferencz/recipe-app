import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {AntDesign} from "@expo/vector-icons";
import MainRecipe from "../Views/MainRecipe";
import HomeView from "../Views/HomeView";
import OnBoard from "../Views/OnBoard";
import {recipeStore} from "../Stores/RecipeStore";

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!recipeStore.selectors.userRegistered ?
                    <Stack.Screen name="OnBoard" component={OnBoard}
                                  options={{
                                      title: "",
                                      headerShown: true,
                                      headerTransparent: true,
                                      headerBackTitleVisible: false
                                  }}/>
                    : null }
                <Stack.Screen name="HomeView" component={HomeView}
                              options={{
                                  headerTitleAlign: "center",
                                  headerRight: null,
                                  headerLeft: null,
                                  gestureEnabled: false,
                                  title: 'My Recipes'
                              }}/>
                <Stack.Screen name="MainRecipe"
                              component={MainRecipe}
                              options={{
                                  title: "",
                                  headerShown: true,
                                  headerTransparent: true,
                                  headerBackTitleVisible: false,
                                  headerBackImage: () => (
                                      <AntDesign name="arrowleft" size={22} color="#fff"/>),
                                  headerLeftContainerStyle: {marginLeft: 10},
                                  headerRight: () => (<AntDesign name="download" size={22} color="#fff"/>),
                                  headerRightContainerStyle: {marginEnd: 10}
                              }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


