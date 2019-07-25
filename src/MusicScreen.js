import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, Slider, BackHandler, ToastAndroid } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import dataSet from './JsonData';

var Sound = require('react-native-sound');

export default class MusicScreen extends Component {
    state = {
        icon: "pause-circle-outline",
        image: this.props.navigation.state.params.rowData.image,
        title: this.props.navigation.state.params.rowData.title,
        activeIndex: this.props.navigation.state.params.rowData.id,

    }
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        console.log("data", this.props.navigation.state.params.rowData.id);
        var url = 'http://storage.googleapis.com/automotive-media/' + this.props.navigation.state.params.rowData.source
        this.track = new Sound(url, null, (e) => {
            if (e) {
                ToastAndroid.showWithGravityAndOffset(
                    'Please check your network connection',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                this.props.navigation.navigate('HomeScreen');
            } else {
                this.track.play()
            }
        })


    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.track.stop();
        this.props.navigation.navigate('HomeScreen');
        return true;
    }

    changeIcon = () => {

        if (this.state.icon == "pause-circle-outline") {
            this.track.pause();
            this.setState({
                icon: "play-circle-outline"
            })
        }
        else {
            this.track.play();
            this.setState({
                icon: "pause-circle-outline"
            })
        }

    }


    previousSong = () => {
        this.track.stop();
        let activeIndex = this.state.activeIndex;
        let title = this.state.title;
        let image = this.state.image; 

        if (activeIndex == 0) {
            activeIndex = dataSet.length - 1;
        }
        else {
            activeIndex--;
        }
        this.setState({
            activeIndex,
            title: dataSet[activeIndex]['title'],
            image: dataSet[activeIndex]['image']
        })

        this.track = new Sound('http://storage.googleapis.com/automotive-media/' + dataSet[activeIndex]['source'], null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                this.track.play()
            }
        })
    }

    nextSong = () => {
        this.track.stop();
        let activeIndex = this.state.activeIndex;
        let title = this.state.title;
        let image = this.state.image; 
        if (activeIndex == dataSet.length - 1) {
            activeIndex = 0;

        }
        else {
            activeIndex++;
        }
        this.setState({
            activeIndex,
            title: dataSet[activeIndex]['title'],
            image: dataSet[activeIndex]['image']
        });

       
        this.track = new Sound('http://storage.googleapis.com/automotive-media/' + dataSet[activeIndex]['source'], null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                this.track.play()
            }
        })
    }


    render() {
        return (
            <ImageBackground source={{uri:'http://storage.googleapis.com/automotive-media/' + this.state.image}} style={styles.container}>
                <Text style={styles.textStyle}>{this.state.title}</Text>

                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => this.previousSong()}>
                        <Icon size={80} color="white" name="skip-previous" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.changeIcon()}>
                        <Icon size={80} color="white" name={this.state.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.nextSong()}>
                        <Icon size={80} color="white" name="skip-next" />
                    </TouchableOpacity>

                </View>
                
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        height: '100%'
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    }
});