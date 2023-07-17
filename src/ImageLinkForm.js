import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
  	<div>
	  	<div className = 'zoidberg center w-70 br3 shadow-2'>
	  		<div className = 'w-60' >
			  	<input className = 'w-70 pa2'
			  		   type = 'text' 
					   placeholder = {`Enter your image's url`}
					   onChange = {onInputChange} />
				<button className = 'w-30 pa2 white pointer grow bg-light-purple link dib'
						onClick = {onButtonSubmit}>Detect</button>
			</div>
		</div>
	</div>
  );
}

export default ImageLinkForm;
