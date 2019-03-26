import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		redirect: false
	}

	handleOptionOneChange = (e) => {
		const inputValue = e.target.value

		this.setState(() => ({
			optionOne: inputValue
		}))
	}

	handleOptionTwoChange = (e) => {
		const inputValue = e.target.value

		this.setState(() => ({
			optionTwo: inputValue
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOne, optionTwo } = this.state
		const { dispatch } = this.props

		dispatch(handleAddQuestion(optionOne, optionTwo))

		this.setState(() => ({
			redirect: true
		}))
	}

	render() {
		const { optionOne, optionTwo, redirect } = this.state

		if (redirect === true) {
			return <Redirect to="/" />
		}

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Row className="justify-content-center">
						<Col md={5} lg={5}>
							<FormGroup>
								<Label>Would you rather...</Label>

								<Input type="text" placeholder="Give $10" value={optionOne} onChange={(e) => (this.handleOptionOneChange(e))} />
							</FormGroup>
						</Col>

						<Col md={2} lg={2} className="text-center">
							<h4 className="m-t-70">OR</h4>
						</Col>

						<Col md={5} lg={5}>
							<FormGroup>
								<Label>&nbsp;</Label>

								<Input type="text" placeholder="Receive $10" value={optionTwo} onChange={(e) => (this.handleOptionTwoChange(e))} />
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col md={12} lg={12} className="text-center">
							<Button type="submit" color="primary" disabled={optionOne === "" || optionTwo === ""}>Save Question</Button>
						</Col>
					</Row>
				</Form>
			</div>
		)
	}
}

export default connect()(NewQuestion)