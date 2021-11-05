
import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { CrossText, CrossButton, CrossInput } from 'mini-cross-components';

import AsyncStorage from "@react-native-async-storage/async-storage";



const Gameboard = (props) => {

    const screenHeight = Dimensions.get('screen').height;
    const screenWidth = Dimensions.get('screen').width;

    const [state, setState] = useState({
        playerScore: 0,
        computerScore: 0,
        playerChoice: "",
        computerChoice: "",
        draw: '',
    });

    useEffect(() => {
        const player = props.route.params.playerName;
        console.log(player);
        if (!player) {
            props.navigation.navigate('Home');
        }
    }, []);

    let winner = '';
    const cpuOptions = [
        'lizard',
        'spock',
        'paper',
        'rock',
        'scissors'
    ];

    //function to calculate a rondom integer between 0 and 4
    const randomNumber = () => {
        return Math.floor(Math.random() * 5);
    };

    const pickWinner = (player, cpu, userChoice, iaChoice) => {
        let objRules = {
            paper: {
                rock: player,
                spock: player,
                lizard: cpu,
                scissors: cpu,
                paper: "draw",
            },
            rock: {
                scissors: player,
                lizard: player,
                spock: cpu,
                paper: cpu,
                rock: "draw",
            },
            scissors: {
                lizard: player,
                paper: player,
                spock: cpu,
                rock: cpu,
                scissors: "draw",
            },
            spock: {
                rock: player,
                scissors: player,
                lizard: cpu,
                paper: cpu,
                spock: "draw",
            },
            lizard: {
                spock: player,
                paper: player,
                rock: cpu,
                scissors: cpu,
                lizard: "draw",
            },
        }
        return objRules[userChoice][iaChoice]
    };

    const logStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('players');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (e) {
            // error reading value
        }
    };

    const getPlayerButtonValue = (value) => () => {
        console.log(value);
    };

    return (
        <View style={styles.container}>
            {/* CPU CHOICE */}
            <View>
                <CrossButton
                    label='CPU'
                    style={styles.circularButton}
                />
            </View>

            <CrossText 
                text='0 / 0'
            />

            {/* PLAYER OPTIONS */}
            <View style={styles.playerOptions}>
                {/* FIRST ROW */}
                <View style={styles.playerOptionsRow1}>
                    <CrossButton
                        label='lizard'
                        onPress={getPlayerButtonValue('lizard')}
                        style={styles.circularButton}
                    />
                </View>
                {/* SECOND ROW */}
                <View style={styles.playerOptionsRow2}>
                    <CrossButton
                        label='spock'
                        onPress={getPlayerButtonValue('spock')}
                        style={styles.circularButton}
                    />
                    <CrossButton
                        label='paper'
                        onPress={getPlayerButtonValue('paper')}
                        style={styles.circularButton}
                    />
                </View>
                {/* THIRD ROW */}
                <View style={styles.playerOptionsRow3}>
                    <CrossButton
                        label='rock'
                        onPress={getPlayerButtonValue('rock')}
                        style={styles.circularButton}
                    />
                    <CrossButton
                        label='scissors'
                        onPress={getPlayerButtonValue('scissors')}
                        style={styles.circularButton}
                    />
                </View>
            </View>
        </View>
    )
}
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1
    },
    playerOptions: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: '40%',
        width: screenWidth
    },
    playerOptionsRow1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: screenWidth,
    },
    playerOptionsRow2: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: screenWidth,
    },
    playerOptionsRow3: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: screenWidth,
    },
    circularButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        height: 75,
        width: 75,
        borderRadius: 50,
    }
});

export default Gameboard;