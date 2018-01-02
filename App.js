import React, { Component }  from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { Provider, connect } from "react-redux";
import getStore from "./store";

import HomeScreen from './src/Components/HomeScreen'
import AttendanceScreen from './src/Components/AttendanceScreen'

console.disableYellowBox = true;

const AppNavigator = StackNavigator({
  Attendance: { screen: AttendanceScreen },
  Home: { screen: HomeScreen },
})

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

connect(state => ({
    nav: state.nav
}))

class AppWithNavigationState extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const store = getStore(navReducer);

export default function NCAP() {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}