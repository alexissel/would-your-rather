import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardHeader, CardBody, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
	constructor(props) {
		super(props)

		this.state = { activeTab: "1" }

		this.toggle = this.toggle.bind(this)
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			})
		}
	}

	render() {
		const { users, answeredQuestions, unansweredQuestions, questions } = this.props

		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink className={classnames({ active: this.state.activeTab === "1" })} onClick={() => { this.toggle("1") }}>
							Unanswered Questions
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink className={classnames({ active: this.state.activeTab === "2" })} onClick={() => { this.toggle("2") }}>
							Answered Questions
						</NavLink>
					</NavItem>
				</Nav>

				{/* Unanswered questions */}
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<Col md={12}>
								{unansweredQuestions.map((id) => (
									<Card key={id}>
										<CardHeader>
											<img src={users[questions[id].author].avatarURL} alt={users[questions[id].author].name} height="30" className="rounded" />

											&nbsp;&nbsp;&nbsp;{users[questions[id].author].name}'s question:
										</CardHeader>

										<CardBody className="row">
											<div className="col-md-10">
												<p>Would you rather... {questions[id].optionOne.text} or {questions[id].optionTwo.text}?</p>
											</div>

											<div className="col-md-2 text-right">
												<Link to={`/questions/${id}`} className="btn btn-primary" answered="false">View</Link>
											</div>
										</CardBody>
									</Card>
								))}
							</Col>
						</Row>
					</TabPane>

					{/* Answered questions */}
					<TabPane tabId="2">
						<Row>
							<Col md={12}>
								{answeredQuestions.map((id) => (
									<Card key={id}>
										<CardHeader>
											<img src={users[questions[id].author].avatarURL} alt={users[questions[id].author].name} height="30" className="rounded" />

											&nbsp;&nbsp;&nbsp;{users[questions[id].author].name}'s question:
										</CardHeader>

										<CardBody className="row">
											<div className="col-md-10">
												<p>Would you rather... {questions[id].optionOne.text} or {questions[id].optionTwo.text}?</p>
											</div>

											<div className="col-md-2 text-right">
												<Link to={`/questions/${id}`} className="btn btn-primary" answered="true">View</Link>
											</div>
										</CardBody>
									</Card>
								))}
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		)
	}
}

function mapStateToProps ({ questions, authedUser, users }) {
	const answeredQuestions = Object.keys(users[authedUser].answers).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp
	)

	const unansweredQuestions = Object.keys(questions)
		.filter((id) => !answeredQuestions.includes(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

	return {
		answeredQuestions,
		unansweredQuestions,
		questions,
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Dashboard)