import React, {useState} from 'react';
import {
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {observer} from "mobx-react";
import {SimpleLineIcons} from "@expo/vector-icons";
import {homeViewStyles as styles} from "../HomeView/HomeView.style";
import recipeStore from "../../Stores/RecipeStore";

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
        <KeyboardAvoidingView style={{flex:1, backgroundColor: "#7cc6e6", justifyContent:"center", alignItems:"center"}} behavior="padding"
                              keyboardVerticalOffset={-35}>
            <View style={{width:"80%", height:"80%"}}>
                <Text style={{fontSize: 36, color: "white", marginBottom:"20%"}}>Welcome!</Text>
                <View style={{alignSelf: 'center', width:"80%", height:"50%", alignItems: 'center', justifyContent: 'center',
                    backgroundColor: "lightgray", marginBottom:"10%"}}>
                    {state.imgUri ?
                        <ImageBackground resizeMode="cover" style={{width:"100%", height:"100%", alignItems: 'center', justifyContent: 'center'}} source={{uri: state.imgUri}}>
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
                <TextInput style={{color:"white", marginBottom:"2%"}}
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
        </KeyboardAvoidingView>
    )
}

const NextButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={{position:"absolute", bottom:20, borderWidth:2, width:"70%", height:"10%", justifyContent:"center"}}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export default observer(OnBoard);
