import {StyleSheet, Dimensions} from "react-native";

export const { width, height } = Dimensions.get("window");

export const mainRecipeStyle = StyleSheet.create({
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
        width,
        height: "100%"
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
