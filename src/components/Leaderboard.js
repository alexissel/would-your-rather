import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, Container, CardBody } from 'reactstrap'

class Leaderboard extends Component {
	render() {
		const { users } = this.props
		const allUsers = Object.keys(users)
		let sortUsers = {}

		allUsers.map((user) => (users[user]["totalscores"] = Object.keys(users[user].answers).length + users[user].questions.length))

		for (let name in users) {
			sortUsers[name] = users[name]["totalscores"]
		}

		var sortedUsers = Object.keys(sortUsers).sort(function(a, b) {
			return sortUsers[b] - sortUsers[a]
		})

		return (
			<div>
				{sortedUsers.map(user => (
					<Card key={user}>
						<CardHeader className="active">
							<img src={users[user].avatarURL} alt={users[user].name} height="30" className="rounded" />

							&nbsp;&nbsp;&nbsp;{users[user].name}
						</CardHeader>

						<Container>
							<CardBody className="row">
								<div className="col-md-4">
									<p className="m-t-0">Answered Questions: {Object.keys(users[user].answers).length}</p>
								</div>

								<div className="col-md-4 text-center">
									<p className="m-t-0">Asked Questions: {users[user].questions.length}</p>
								</div>

								<div className="col-md-4 text-right">
									<p className="m-t-0"><b>Score: {Object.keys(users[user].answers).length + users[user].questions.length}</b></p>
								</div>
							</CardBody>
						</Container>
					</Card>
				))}
			</div>
		)
	}
}

function mapStateToProps ({ users }) {
	return {
		users
	}
}

export default connect(mapStateToProps)(Leaderboard)