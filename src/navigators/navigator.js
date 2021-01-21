import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRecipe from "../views/mainRecipe/MainRecipe";
import {createStackNavigator} from "@react-navigation/stack";
import {Text, Button, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Main Recipe"
                onPress={() => navigation.navigate('MainRecipe')}
            />
        </View>
    );
}

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
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


