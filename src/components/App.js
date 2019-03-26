import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { Container } from 'reactstrap'
import Menu from './Menu'
import Dashboard from './Dashboard'
import Login from './Login'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Question from './Question'
import NotFound from './NotFound'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar style={{ backgroundColor: '#66c8ed' }} />

					<Container>
						{this.props.signedIn ? <Menu authedUser={this.props.authedUser} /> : ''}

						{this.props.signedIn === false
						? <Login />
						: <div>
							<Route path="/" exact component={Dashboard} />
							<Route path="/leaderboard" component={Leaderboard} />
							<Route path="/add" component={NewQuestion} />
							<Route path="/questions/:id" component={Question} />
							<Route path="/404" component={NotFound} />
						</div>}
					</Container>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ authedUser, users }) {
	return {
		signedIn: authedUser !== null,
		users: users
	}
}

export default connect(mapStateToProps)(App)
