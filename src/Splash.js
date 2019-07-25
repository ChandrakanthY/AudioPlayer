import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class Splash extends Component {
    static navigationOptions = {
        header: null
    }
    componentWillMount(){
        setTimeout(()=>{this.props.navigation.navigate('HomeScreen');},2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Icon size={100} color="white" name="headset" />
                <Text style={styles.textStyle}>Music Player</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#26AF90"
    },
    textStyle: {
        marginTop: 10,
        fontSize: 22,
        color: 'white'
    }
});