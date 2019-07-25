import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Splash from './src/Splash';
import HomeScreen from './src/HomeScreen';
import MusicScreen from './src/MusicScreen';
console.disableYellowBox = true;

const Navigation = StackNavigator({
  Splash: {
    screen: Splash,
  },
  HomeScreen: {
    screen: HomeScreen,
  },
  MusicScreen: {
    screen: MusicScreen,
  }

})

export default Navigation
  
