import {StyleSheet, Dimensions} from "react-native";
import React from "react";

export const { width, height } = Dimensions.get("window");

export const mainRecipeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection:"column"
    },
    upperContainer: {
        flex: 2,
    },
    recipeContainer: {
        flex: 3,
        justifyContent: "space-between",
    },
    text: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
    },
    sectionContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    addIngredientTextInput: {
        width: "100%",
    },
    descriptionText: {
        color: "#99a2ab",
        marginBottom: 10,
        fontSize: 13,
        textAlign: 'justify',
    },
    isHighlighted: {
        borderWidth: 1,
        borderColor: "blue",
        height: "50%",
    },
    image: {
        width,
        height: "100%",
        backgroundColor: "lightgray",
        alignItems: "center",
        justifyContent: "center"
    },
    userImage:{
        width: 24,
        height: 24,
    },
    mainRecipe: {
        width,
        position: 'absolute',
        bottom: '3%',
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
        marginBottom: 10
    },
    cookTimeContainer: {
        padding: 15
    },
    columnContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
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
    },
    saveRecipeButton: {
        width: "100%",
        height: "11%",
        justifyContent: "center",
        backgroundColor: "#7fb33d",
        alignSelf: "center",
        borderTopLeftRadius: 10,
        borderTopEndRadius: 10
    },
    saveRecipeText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
