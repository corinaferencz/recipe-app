import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, StatusBar} from "react-native";
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";


const renderBulletRow = (data) => {
    return (
        <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={{color: "#fa724c"}}>{'\u2022'}</Text>
            <Text style={{paddingLeft: 5, color: "#99a2ab", fontSize: 13}}>{data.ingredient}</Text>
        </View>
    );
}

function MainRecipe() {
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <StatusBar barStyle="light-content" />
                    <ImageBackground resizeMode= "cover"
                                    style={styles.image}
                                    source={require("../../assets/images/tiramisu.jpg")}>
                        <SafeAreaView>
                            <View style={styles.menuBar}>
                                <View style={styles.back}>
                                    <AntDesign name="arrowleft" size={22} color="#fff"/>
                                </View>
                                <AntDesign name="download" size={22} color="#fff"/>
                            </View>
                        </SafeAreaView>
                        <View style={styles.mainRecipe}>
                            <Text style={styles.text}>Most Practical and Softest Tiramisu</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.recipeContainer}>
                    <View style={styles.bookmarkContainer}>
                        <View sytyle={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <FontAwesome name="bookmark-o" size={18}/>
                                <Text style={{fontSize: 13, paddingLeft: 5}}>115 added</Text>
                            </View>
                            <Text style={{fontSize: 13, color: "#fa724c"}}>You add too!</Text>
                        </View>
                        <View sytyle={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <Image style={styles.userImage}
                                       source={require("../../assets/images/user.png")}/>
                                <Text style={{paddingLeft: 5}}>Joss Sticks</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <MaterialIcons name="star-rate" size={18} color="#fa724c"/>
                                <MaterialIcons name="star-rate" size={18} color="#fa724c"/>
                                <MaterialIcons name="star-rate" size={18} color="#fa724c"/>
                                <MaterialIcons name="star-rate" size={18} color="#fa724c"/>
                                <MaterialIcons name="star-border" size={18} color="#fa724c"/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.descriptionText}>
                        <Text style={{color: "#99a2ab", marginBottom: 10,  fontSize: 13}}>21 March 2019{"\n"} {"\n"}Aliquam tinicidunt leo eu aliquam pretium. Donec
                            in risus arcu. Aliq uam
                            quis trist ique nisi, quis viver ra tortor. Donesc mauris orci, max imus ac tortor in accumsan
                            quis, ullamcorper eget velit.
                        </Text>
                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <FontAwesome5 name="user-circle" size={18} color="#fa724c"/>
                                <Text style={{fontWeight: "600", marginTop: 5}}>8-12</Text>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View style={styles.columnContainer}>
                                <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                                <Text style={{fontWeight: "600", marginTop: 5}}>20 min</Text>
                            </View>
                            <View style={styles.verticalDivider}/>
                            <View style={styles.columnContainer}>
                                <FontAwesome name="fire" size={18} color="#fa724c"/>
                                <Text style={{fontWeight: "600", marginTop: 5}}>25 min</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider}/>
                    <View style={styles.descriptionText}>
                        <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                        {["255 g kidney beans","120 g maple syrup","75 g walnuts","1/2 tsp baking powder","3 eggs"].map(ingredient =>
                            renderBulletRow({ingredient})
                        )}
                    </View>
                </View>
            </View>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    upperContainer: {
        flex: 2,
    },
    recipeContainer: {
        flex: 3,
        justifyContent: "space-between",
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
    },
    descriptionText: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    image: {
        flex: 1,
        justifyContent: "space-between",
    },
    userImage:{
        width: 24,
        height: 24,
    },
    menuBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    back: {
        flexDirection: "row",
        alignItems: "center",
    },
    mainRecipe: {
        paddingLeft: 0,
        paddingTop: 50,
        marginLeft: 10,
        marginBottom: 20,
    },
    bookmarkContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 20,
        marginEnd: 10,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    columnContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",

    },
    horizontalDivider: {
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        marginLeft: 10,
        marginEnd: 10,
    },
    verticalDivider: {
        borderLeftColor: "#ededed",
        borderLeftWidth: 1,
    }
});

export default MainRecipe;