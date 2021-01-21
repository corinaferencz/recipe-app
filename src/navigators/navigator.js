import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainRecipe from "../views/mainRecipe/MainRecipe";

export default function Navigator() {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="MainRecipe" component={MainRecipe} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
