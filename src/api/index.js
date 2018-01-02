import { ROOT_URL } from '../Constants'
const API_URL = `${ROOT_URL}/api/`

export function getTodaysStudents() {
	let url = `${API_URL}students/today`
	return fetch(url, {
		method: 'GET'
	}).then((resp) => {
		console.log(resp)
		return resp.json()
	})
}

export function signinStudent(student) {
	let url = `${API_URL}students/${student.id}/signin`
	return fetch(url, {
		method: 'POST'
	}).then((resp) => {
		return resp.json()
	})	
}

export function signoutStudent(student) {
	let url = `${API_URL}students/${student.id}/signout`
	return fetch(url, {
		method: 'POST'
	}).then((resp) => {
		return resp.json()
	})	
}

export function lateStudent(student) {
	let url = `${API_URL}students/${student.id}/late`
	return fetch(url, {
		method: 'POST'
	}).then((resp) => {
		return resp.json()
	})	
}