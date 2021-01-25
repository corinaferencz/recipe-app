import {Dimensions, StyleSheet} from "react-native";

export const { width, height } = Dimensions.get("window");

export const homeViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-between",
        width: "100%"
    },
    columnContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 10,
    },
    stars: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-between",
    },
    food: {
        flexDirection: "column",
        alignItems: "center",
        marginLeft: 10,
    },
    item: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    search: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    image:{
        height: "100%",
        width: "40%"
    },
    title: {
        fontSize: 15,
    },
    buttonContainer: {
        width,
        height: "7%",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    buttonText: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
