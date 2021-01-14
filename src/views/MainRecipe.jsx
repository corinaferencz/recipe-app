import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from "react-native";
import {SafeAreaView} from "react-native";
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";

class MainRecipe extends Component {

    renderBulletRow(data) {
        return (
            <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{color: "#fa724c"}}>{'\u2022'}</Text>
                <Text style={{paddingLeft: 5, color: "#99a2ab", fontSize: 13}}>{data}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.image}>
                    <SafeAreaView>
                        <View style={styles.menuBar}>
                            <View style={styles.back}>
                                <AntDesign name="arrowleft" size={22} color="#fff"></AntDesign>
                            </View>
                            <AntDesign name="download" size={22} color="#fff"></AntDesign>
                        </View>
                        <View style={styles.mainRecipe}>
                            <Text style={styles.text}>Most Practical and Softest Tiramisu</Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
                <View style={styles.bookmarkContainer}>
                    <View sytyle={styles.columnContainer}>
                        <View style={styles.rowContainer}>
                            <FontAwesome name="bookmark-o" size={18}></FontAwesome>
                            <Text style={{fontSize: 13, paddingLeft: 5}}>115 added</Text>
                        </View>
                        <Text style={{fontSize: 13, color: "#fa724c"}}>You add too!</Text>
                    </View>
                    <View sytyle={styles.columnContainer}>
                        <View style={styles.rowContainer}>
                            <FontAwesome name="user-circle" size={24} color="#808080"></FontAwesome>
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
                <View style={styles.horizontalDivider}></View>
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
                        <View style={styles.verticalDivider}></View>
                        <View style={styles.columnContainer}>
                            <MaterialCommunityIcons name="rice" size={18} color="#fa724c"/>
                            <Text style={{fontWeight: "600", marginTop: 5}}>20 min</Text>
                        </View>
                        <View style={styles.verticalDivider}></View>
                        <View style={styles.columnContainer}>
                            <FontAwesome name="fire" size={18} color="#fa724c"/>
                            <Text style={{fontWeight: "600", marginTop: 5}}>25 min</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.horizontalDivider}></View>
                <View style={styles.descriptionText}>
                    <Text style={{fontSize: 15, fontWeight: "600", marginBottom: 10}}>Ingredients</Text>
                    <Text>{this.renderBulletRow("255 g kidney beans")}</Text>
                    <Text>{this.renderBulletRow("120 g maple syrup")}</Text>
                    <Text>{this.renderBulletRow("75 g walnuts")}</Text>
                    <Text>{this.renderBulletRow("1/2 tsp baking powder")}</Text>
                    <Text>{this.renderBulletRow("3 eggs")}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
    },
    descriptionText: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        backgroundColor: "#C8C8C8",
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
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 10,
        marginEnd: 10,
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