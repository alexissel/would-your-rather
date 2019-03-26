import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
	render() {
		return (
			<div className="text-center">
				<h1>404</h1>

				<h2>Page Not Found</h2>

				<Link to="/" className="btn btn-primary m-t-70">Got Back to Dashboard</Link>
			</div>
		)
	}
}

export default NotFound