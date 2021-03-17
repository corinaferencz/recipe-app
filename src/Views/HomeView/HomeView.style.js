import {Dimensions, StyleSheet} from "react-native";

export const { width, height } = Dimensions.get("window");

export const homeViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-between",
        width: "60%"
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
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10
    },
    item: {
        flex: 1,
        flexDirection: "row",
        padding: 14,
        marginVertical: 6,
        marginHorizontal: 16,
        borderWidth: 4,
        borderColor: '#f4f4f4',
        borderRadius: 10,
        backgroundColor: "#fff"
    },
    search: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 3,
        borderColor: '#f4f4f4',
        borderRadius: 10
    },
    image:{
        height: "100%",
        width: "30%",
        borderRadius: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "200"
    },
    buttonContainer: {
        width: "90%",
        height: "8%",
        justifyContent: "center",
        backgroundColor: "#7fb33d",
        alignSelf: "center",
        marginBottom: "4%",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    listEmptyContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    verticalDivider: {
        borderLeftColor: "#ededed",
        borderLeftWidth: 1,
        height:"60%",
        alignSelf: "center"
    },
    longPressView: {
        position: "absolute",
        flexDirection: "row",
        right: 0,
        backgroundColor: "#f4f4f4"
    }
});
