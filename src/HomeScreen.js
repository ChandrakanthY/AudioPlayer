import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, FlatList, TouchableOpacity, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import dataSet from './JsonData';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      data: ''
    }
  }

  static navigationOptions = {
    headerTitle: 'Music Player',
    headerLeft: null,
    headerTitleStyle: { flex:1 ,color: 'white',textAlign:'center' },
    headerStyle: { backgroundColor: '#26AF90' },
    headerTintColor: '#fff',
  }

  componentWillMount() {
    this.setState({
      data: dataSet
    })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  }

  secondsToMinutes = (time) => {
    return (
      <View>
        <Text style={styles.timeStyle}>{Math.floor(time / 60) + ':' + Math.floor(time % 60)}</Text>
      </View>
    )
  }


  render() {
    console.log(this.state.data)
    return (
      <FlatList
        data={this.state.data}
        extraData={this.state}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('MusicScreen', { "rowData": item })}>
                <Icon style={styles.iconStyle} size={40} color="#26AF90" name="ios-musical-notes" />
                <View style={styles.viewStyle}>
                  <Text style={styles.textStyle}>{item.title}</Text>
                  <Text style={styles.textStyle}>{item.artist}</Text>
                </View>
                {this.secondsToMinutes(item.duration)}
              </TouchableOpacity>
              <View style={styles.borderLine} />
            </View>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textStyle: {
    marginLeft: 10,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 5
  },
  iconStyle: {
    marginTop: 5,
    marginLeft: 5
  },
  timeStyle: {
    marginRight: 10,
    marginTop: 18
  },
  borderLine: {
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    marginTop: 15,
    marginRight: 5
  }
});

export default HomeScreen;

