import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			entries: 0			
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onSubmit = (e) => {
		e.preventDefault();
		fetch('https://smart-brain-api-0tsz.onrender.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id){
				this.props.signinChange('home');
				this.props.loadUser(this.state);
			}
		})
	}
	render(){
		return (
		  	<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			 	<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	   type="name"
				        	   name="name" 
				        	   id="name" 
				        	   onChange = {this.onNameChange} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6">Email</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				               type="email"
				               name="email"
				               id="email"
				               onChange = {this.onEmailChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">Password</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	   type="password"
				        	   name="password" 
				        	   onChange = {this.onPasswordChange} />
				      </div>
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				             type="submit"
				             value="Register"
				             onClick = {this.onSubmit}/>
				    </div>
				  </form>
				</main>
			</article>
  		);
	}
}

export default Register;
