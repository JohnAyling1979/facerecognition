import React from 'react'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			registerName: '',
			registerInEmail: '',
			registerInPassword: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({registerInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({registerInPassword: event.target.value})
	}

	onRegister = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerInEmail,
				password: this.state.registerInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id)
			{
				this.props.loadUser(user)
				this.props.onRouteChange('home')
			}else
				alert("Could not register")
		})
	}


	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" forhtml="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onRegister}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      	type="submit"
				      	value="Register"
				      />
				    </div>
				  </div>
				</main>
			</article>
		)		
	}
}

export default Register