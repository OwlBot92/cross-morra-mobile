import React, {useState} from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { CrossText, CrossButton, CrossInput } from 'mini-cross-components';

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = (props) => {

    const [state, setState] = useState({
        playerName: '',
    });

    const handleChange = (value) => {
        setState({
            ...state,
            playerName : value.trim(),
        });
    };

    const goToGameBoard = async () => {
        let name = state.playerName;
        let storage = await AsyncStorage.getItem('players');

        if(name.length > 0) {
            if (storage === null) {
                AsyncStorage.setItem('players', JSON.stringify({ [name] : 0 }));
            }
            else {
                storage = JSON.parse(storage);
                if (storage[name] === undefined) {
                    storage[name] = 0;
                }
                AsyncStorage.setItem('players', JSON.stringify(storage));
            }
            setState({
                ...state,
                playerName: '',
            });
            props.navigation.navigate('Gameboard', {playerName: name});
        }
    }

    return (
        <View style={{flex: 1}}>
            <CrossText
                text="Carta Forbice sasso"
            />

            <View>
                <CrossInput 
                    placeholder='Insert your name'
                    onChangeText={handleChange}
                    value={state.playerName}
                />
                <CrossButton 
                    label="Play"
                    onPress={goToGameBoard}
                />
            </View>
        </View>
    );
};

export default Home;
