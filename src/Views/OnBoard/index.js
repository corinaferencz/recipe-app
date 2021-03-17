import React, {useState} from 'react';
import {
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {SimpleLineIcons} from "@expo/vector-icons";
import {recipeStore} from "../../Stores/RecipeStore";
import {onBoardStyle as styles} from "./OnBoard.style"

function OnBoard({navigation}) {

    const [state, setState] = useState({username:"", imgUri:""});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setState({...state, imgUri: result.uri});
        }
    };

    return (
        <KeyboardAvoidingView style={styles.main} behavior="padding"
                              keyboardVerticalOffset={-35}>
            <ImageBackground source={require("../../../assets/images/onboarding.png")} style={{flex: 1}}>
                <View style={styles.welcomeView}>
                    <Text style={{fontSize: 36, color: "white", fontWeight:"600"}}>Welcome!</Text>
                    <Text style={{fontSize: 18, color: "white", marginBottom:"20%"}}>Next up, pick a username.</Text>
                    <View style={styles.userView}>
                        {state.imgUri ?
                            <ImageBackground resizeMode="cover" style={styles.userImage} source={{uri: state.imgUri}}>
                                <TouchableOpacity onPress={pickImage}>
                                    <SimpleLineIcons name="picture" size={48} color="white"/>
                                </TouchableOpacity>
                            </ImageBackground> :
                            <TouchableOpacity onPress={pickImage}>
                                <SimpleLineIcons name="picture" size={48} color="white"/>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{flexDirection: "column", width: "100%"}}>
                        <TextInput style={styles.userText}
                                   placeholder={"@ your_username"}
                                   placeholderTextColor="#fff"
                                   onSubmitEditing={e => setState({...state, username: e.nativeEvent.text})}/>
                        <View style={{height: 1, backgroundColor:"white"}}/>
                    </View>
                </View>
                <NextButton title="Next" onPress={() => {
                    recipeStore.addUser({...state})
                    navigation.navigate('HomeView')
                }}/>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const NextButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default OnBoard;
