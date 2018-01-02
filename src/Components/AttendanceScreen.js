import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import io from 'socket.io-client';
import { ROOT_URL } from '../Constants'

import { getTodaysStudents, signinStudent, signoutStudent, lateStudent } from '../api'

const socket = io(ROOT_URL, {pingTimeout: 30000});

export default class AttendanceScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { navigate } = navigation
		return {
		    title: 'Attendance',
		    headerStyle: { backgroundColor: '#3498db' },
		    headerTitleStyle: { color: 'white' },
		}
	}

	constructor() {
		super()
		this.state = {
			students: {}
		}
	}

	componentDidMount() {
		getTodaysStudents().then((json) => {
			let students = {}
			json.forEach((s) => students[s.id] = s)
			this.setState({ students })
		})

		socket.on('message', (json) => {
			let sArray = {...this.state.students}
			sArray[json.id] = json
			this.setState({students: sArray})
		})
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<StatusBar barStyle="light-content" />
				{this.renderStudents()}
			</ScrollView>
		)
	}

	renderStudents() {
		let students = Object.keys(this.state.students)

		students.sort((s1, s2) => {
			var nameA = this.state.students[s1].firstname.toUpperCase(); // ignore upper and lowercase
			var nameB = this.state.students[s2].firstname.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
			return -1;
			}
			if (nameA > nameB) {
			return 1;
			}

			// names must be equal
			return 0;
		})

		return students.map((key) => {
			let student = this.state.students[key]
			let backgroundColor = '#fff'
			let textColor = '#000'
			let noteText = 'Absent'
			let noteColor = '#AAA'
			if(student.date !== null) {
				backgroundColor = !student.late ? '#27ae60' : '#e74c3c'
				noteColor = !student.late ? '#27ae60' : '#e74c3c'
				textColor = '#FFF'
				noteText = !student.late ? 'On Time' : 'Late'
			} 

			return (
				<TouchableOpacity key={student.id} style={[styles.studentContainer, {borderColor: backgroundColor}]} onPress={this.studentPressed.bind(this, student)}>
					<Text style={[styles.studentName, {backgroundColor: backgroundColor, color: textColor}]}>{student.firstname} {student.lastname}</Text>
					<View style={[styles.background, styles.triangle, {borderBottomColor: backgroundColor}]}></View>
					<Text style={[styles.note, {color: noteColor}]}>{noteText}</Text>
				</TouchableOpacity>
			)
		})
	}

	studentPressed(student) {
		let students = {...this.state.students}
		if(student.date === null) {
			students[student.id] = {...student, date: new Date().toString(), late: false, sid: student.id}
			this.setState({ students })

			signinStudent(student)
				.then((json) => {
					if(!json.error) {
						let sArray = {...this.state.students}
						sArray[student.id] = {...sArray[student.id], ...json}
						this.setState({students: sArray})
					}
				})
		}else if(!student.late) {
			students[student.id] = {...student, late: true}
			this.setState({ students })

			lateStudent(student)
				.then((json) => {
					if(!json.error) {
						let sArray = {...this.state.students}
						sArray[student.id] = {...sArray[student.id], ...json}
						this.setState({students: sArray})
					}
				})
		}else {
			students[student.id] = {...student, date: null, late: null, sid: null}
			this.setState({ students })

			signoutStudent(student)
				.then((json) => {
					if(!json.error) {
						let sArray = {...this.state.students}
						sArray[student.id] = {...sArray[student.id], ...json}
						this.setState({students: sArray})
					}
				})
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	studentContainer: {
		flexDirection: 'row',
		backgroundColor: '#FFF',
		borderBottomWidth: 0,
		borderColor: '#EEE',
	},
	studentName: {
		padding: 14,
		fontSize: 16,
		backgroundColor: 'green',
		color: 'white',
		width: 200,
	},
	background: {
		marginLeft: -24
	},
	note: {
		fontSize: 16,
		flex: 1,
		textAlign: 'right',
		alignSelf: 'center',
		marginRight: 14,
	},
	triangle: {
	    width: 0,
	    height: 0,
	    backgroundColor: 'transparent',
	    borderStyle: 'solid',
	    borderLeftWidth: 24,
	    borderRightWidth: 24,
	    borderBottomWidth: 48,
	    borderLeftColor: 'transparent',
	    borderRightColor: 'transparent',
	    borderBottomColor: 'green',
	    transform: [
	      {rotate: '180deg'}
	    ]
	},
})