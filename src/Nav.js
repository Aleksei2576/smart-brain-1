import React from 'react';

const Nav = ({isSignin, signinChange}) => {
  	if(isSignin)
  		return(
  			<p className = 'link nav underline f3 pointer white mr4 dim'
  			   onClick = {() => signinChange('signout')} >Sign out</p>
  		)
	else 
		return(
			<div>
	  			<p className = 'link nav underline f3 pointer white mr4 dim'
	  			   onClick = {() => signinChange('signin')} >Sign in</p>
	  			<p className = 'link nav underline f3 pointer white mr4 dim'
	  			   onClick = {() => signinChange('register')} >Register</p>
  			</div>
  	    )
}
export default Nav;
