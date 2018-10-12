import React from 'react'
import './Navigation.css'

const Navigation = ({onRouteChange,state}) => {
	if(state==='home')
		return (
			<nav>
				<p
					onClick={() => onRouteChange('signout')}
					className='f3 link dim black pa3 pointer'>
						Sign out
				</p>
			</nav>
		)
	else
		return (
			<nav>
				<p
					onClick={() => onRouteChange('signin')}
					className='f3 link dim black pa3 pointer'>
						Sign in
				</p>
				<p
					onClick={() => onRouteChange('register')}
					className='f3 link dim black pa3 pointer'>
						Register
				</p>			
			</nav>
		)
}

export default Navigation