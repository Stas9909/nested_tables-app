import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

const Header = () => {
	return (
		<header className={classes.header}>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
