import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import { Card, CardHeader, CardBody, Label, Button, Progress } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'

class Question extends Component {
	state = {
		value: '',
		selected: '',
		id: this.props.location.pathname.split('/questions/')[1],
		showPercentage: this.props.users[this.props.authedUser].answers.hasOwnProperty(
			this.props.location.pathname.split('/questions/')[1]
		)
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value,
			selected: true
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { dispatch } = this.props

		dispatch(handleAddQuestionAnswer(this.state.id, this.state.value))

		this.setState(() => ({
			showPercentage: true
		}))
	}

	render() {
		const { questions, users, authedUser } = this.props
		const { id, showPercentage } = this.state

		if (questions[id] === undefined || questions[id] === null) {
			return <Redirect to='/404' />
		}

		const getQuestion = questions[id]
		const allVotes = getQuestion.optionOne.votes.length + getQuestion.optionTwo.votes.length
		const optionOneVotes = getQuestion.optionOne.votes.length
		const optionTwoVotes = getQuestion.optionTwo.votes.length
		const optionOnePercentage = ((optionOneVotes / allVotes) * 100).toFixed(2)
		const optionTwoPercentage = ((optionTwoVotes / allVotes) * 100).toFixed(2)

		const optionIncluded = Object.keys(users[authedUser]['answers']).includes(getQuestion['id'])
		let showOwnerVote = null

		if (optionIncluded) {
			showOwnerVote = users[authedUser]['answers'][getQuestion['id']]
		}

		return (
			<div>
				<Card>
					<CardHeader className="active">
						<img src={users[getQuestion.author].avatarURL} alt={users[getQuestion.author].name} height="30" className="rounded" />

						&nbsp;&nbsp;&nbsp;{users[getQuestion.author].name}'s question:

						<span className="float-right"><Link to="/" className="btn btn-secondary btn-sm">Back</Link></span>
					</CardHeader>

					{showPercentage ? (
						<div>
							<CardBody className="row">
								<div className="col-md-2">
									<p>Results:</p>
								</div>

								<div className="col-md-5">
									<p>Would you rather {getQuestion.optionOne.text}?</p>

									<Progress color="success" value={optionOnePercentage}>{optionOnePercentage}%</Progress>

									<p>Votes: {optionOneVotes} out of {allVotes} <span className="float-right">{showOwnerVote === "optionOne" ? "(Your vote)" : ""}</span></p>
								</div>

								<div className="col-md-5">
									<p>Would you rather {getQuestion.optionTwo.text}?</p>

									<Progress color="success" value={optionTwoPercentage}>{optionTwoPercentage}%</Progress>

									<p>Votes: {optionTwoVotes} out of {allVotes} <span className="float-right">{showOwnerVote === "optionTwo" ? "(Your vote)" : ""}</span></p>
								</div>
							</CardBody>
						</div>
					) : (
						<div>
							<CardBody className="row">
								<div className="col-md-10">
									<p>
										Would you rather:

										&nbsp;&nbsp;&nbsp;<input type="radio" id="optionOne" name="questions" value={"optionOne"} onChange={this.handleChange} />&nbsp;&nbsp;

										<Label htmlFor="optionOne">{getQuestion.optionOne.text}</Label>&nbsp;&nbsp;&nbsp; <b>or</b>&nbsp;

										&nbsp;&nbsp;&nbsp;<input type="radio" id="optionTwo" name="questions" value={"optionTwo"} onChange={this.handleChange} />&nbsp;&nbsp;

										<Label htmlFor="optionTwo">{getQuestion.optionTwo.text}</Label>
									</p>
								</div>

								<div className="col-md-2 text-right">
									<Button color="primary" onClick={this.handleSubmit} disabled={this.state.selected !== true}>Vote</Button>
								</div>
							</CardBody>
						</div>
					)}
				</Card>
			</div>
		)
	}
}

function mapStateToProps ({ questions, authedUser, users, id }) {
	return {
		questions,
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Question)