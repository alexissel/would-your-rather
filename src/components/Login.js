import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

class Login extends Component {
	// Load default state/user
	state = {
		selectedUser: 'sarahedo'
	}

	handleChange = (e) => {
		const selectedUser = e.target.value

		this.setState(() => ({ selectedUser }))
	}

	handleLogin = (e) => {
		e.preventDefault()

		const { selectedUser } = this.state
		const { dispatch } = this.props

		dispatch(setAuthedUser(selectedUser))
	}

	render() {
		const { allUsers, users } = this.props

		return (
			<Row className="justify-content-center">
				<Col md={5} lg={5} className="text-center">
					<Form className="form-wrapper">
						<FormGroup className="text-center">
							<img src="/logo.png" width="150" alt="logo" />
						</FormGroup>

						<FormGroup>
							<Label>Select user to sign in:</Label>

							<Input type="select" onChange={this.handleChange}>
								{allUsers.map((user) => (
									<option key={user} value={user}>{users[user].name}</option>
								))}
							</Input>
						</FormGroup>

						<FormGroup>
							<Button type="submit" color="primary" onClick={this.handleLogin}>Sign In</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		)
	}
}

function mapStateToProps ({ users }) {
	return {
		users,
		allUsers: Object.keys(users)
	}
}

export default connect(mapStateToProps)(Login)