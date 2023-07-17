import React from 'react';

const FaceRecognition = ({imageUrl, box}) => {
  return (
  	<div className = 'face'>
	  	<div className = 'absolute mt3'>
			  	<img style = {{width: "400px"}}
			  		 alt = 'face' 
			  		 id = 'face'
			  	     src = {imageUrl}
			  	 />
			  	<div className ='box'
			  		 style = {{top: box.top,
			  				   right: box.right,
			  				   bottom: box.bottom,
			  				   left: box.left}}>
		  		</div>
		</div>
	</div>
  );
}

export default FaceRecognition;
