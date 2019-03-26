import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'

class Menu extends Component {
	handleLogout = (e) => {
		e.preventDefault()

		const { dispatch } = this.props

		dispatch(setAuthedUser(null))
	}

	render() {
		const authedUser = this.props.users[this.props.authedUser]

		return (
			<div>
				<Navbar color="dark" dark expand="lg">
					<NavbarBrand href="/">
						<img src="/logo.png" height="30" alt="logo" className="d-inline-block align-top" />
					</NavbarBrand>

					<NavbarToggler aria-controls="responsive-navbar-nav" />

					<Collapse navbar>
						<Nav className="mr-auto">
							<Link to="/" className="nav-link">Dashboard</Link>

							<Link to="/leaderboard" className="nav-link">Leaderboard</Link>

							<Link to="/add" className="nav-link">New Question</Link>

							<UncontrolledDropdown>
								<DropdownToggle nav caret>
									{authedUser.name}
				                </DropdownToggle>

				                <DropdownMenu right>
									<DropdownItem onClick={this.handleLogout}>
										Logout
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

function mapStateToProps ({ authedUser, users }) {
	return {
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Menu)