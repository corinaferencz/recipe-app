import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {AntDesign} from "@expo/vector-icons";
import MainRecipe from "../Views/MainRecipe";
import HomeView from "../Views/HomeView";

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeView}/>
                <Stack.Screen name="MainRecipe"
                              component={MainRecipe}
                              options={{
                                  title : "",
                                  headerShown: true,
                                  headerTransparent: true,
                                  headerBackTitleVisible: false,
                                  headerBackImage: ()=>(<AntDesign name="arrowleft" size={22} color="#fff"/>),
                                  headerLeftContainerStyle: {marginLeft: 10},
                                  headerRight: ()=>(<AntDesign name="download" size={22} color="#fff"/>),
                                  headerRightContainerStyle: {marginEnd: 10}
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


