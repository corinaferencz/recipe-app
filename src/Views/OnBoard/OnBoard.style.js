import {StyleSheet} from "react-native";
import React from "react";

export const onBoardStyle = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center"
    },
    welcomeView: {
        width: "80%",
        height: "80%",
        alignSelf: "center",
        justifyContent: "center"
    },
    userView: {
        alignSelf: "center",
        width: "80%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgray",
        marginBottom: "10%"
    },
    userImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    userText: {
        color: "white",
        marginBottom: "2%",
        fontWeight: "600",
        fontSize: 18
    },
    nextButton: {
        position:"absolute",
        bottom: 20,
        borderWidth: 2,
        width: "70%",
        height: "10%",
        justifyContent: "center",
        alignSelf: "center",
        borderColor: "white"
    },
    nextButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})