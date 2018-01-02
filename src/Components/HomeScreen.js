import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class HomeScreen extends Component {
	static navigationOptions = {
	    title: 'Dashboard',
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.row]}>
					<View style={[styles.square, styles.borderRight, styles.borderBottom]}>
						<Text>Home Screen</Text>
					</View>
					<View style={styles.square}>
						<Text>Home Screen</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={[styles.square, styles.borderRight]}>
						<Text>Home Screen</Text>
					</View>
					<View style={styles.square}>
						<Text>Home Screen</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
		padding: 7,
	},
	row: {
		flexDirection: 'row',
		flex: 1,
	},
	square: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',
		marginHorizontal: 20,
	},
	borderRight: {
		borderRightWidth: 1,
		borderRightColor: '#DDD',
		marginVertical: 20,
	},
})