import React, {Component} from 'react';
import Nav from './Nav';
import Rank from './Rank';
import ImageLinkForm from './ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import SignIn from './SignIn';
import Register from './Register';
import './App.css';

// const PAT = '9b35a24d8d174e648eb033c6164a0acc';
// const USER_ID = 'aleksei';       
// const APP_ID = 'aleksei';

// function returnFaceBox(imgUrl){
//   const raw = JSON.stringify({
//           "user_app_id": {
//               "user_id": USER_ID,
//               "app_id": APP_ID
//           },
//           "inputs": [
//               {
//                   "data": {
//                       "image": {
//                           "url": imgUrl
//                       }
//                   }
//               }
//           ]
//       });

//     return {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key ' + PAT
//         },
//         body: raw
//     };
// }

const intitialState = {
      input: '',
      imageUrl: '',
      box: {},
      isSignin: false,
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state = intitialState
  }

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

  calculateBox = (data) => {
    const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('face');
    const height = Number(image.height);
    const width = Number(image.width);
    fetch('https://smart-brain-qqks.onrender.com/image', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      id: this.state.user.id
      })
    })
    .then(res => res.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries : count}))
    }) 

    let box = {
              top: boundingBox.top_row*height,
              left: boundingBox.left_col*width,
              bottom: height - boundingBox.bottom_row*height,
              right: width - boundingBox.right_col*width
              }

    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input});
    fetch('https://smart-brain-qqks.onrender.com/image', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input
      })
    })
    .then(res => res.json())
    .then(data => this.calculateBox(data))

  }

  // onButtonSubmit = (event) => {
  //   this.setState({imageUrl: this.state.input});
  //   fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnFaceBox(this.state.input))
  //   .then(response => response.json())
  //   .then(data => this.calculateBox(data))
  //   .catch(error => console.log('error', error));
  // }

  signinChange = (route) => {
    if (route === 'home'){
      this.setState({isSignin: true})
    }
    this.setState({route: route}) 
    if (route === 'signout'){
      this.setState({isSignin: intitialState})
      this.setState({route: 'signin'})
    }  
  }

  render(){
      return (
        <div>
          <Nav isSignin = {this.state.isSignin} 
               signinChange = {this.signinChange} />
          {this.state.route === 'home'
            ?<div>
               <Rank name = {this.state.user.name} 
                     entries = {this.state.user.entries} />
               <ImageLinkForm onInputChange = {this.onInputChange}
                              onButtonSubmit = {this.onButtonSubmit} />
               <FaceRecognition imageUrl = {this.state.imageUrl}
                                box = {this.state.box} />
              </div>
            :(
              this.state.route === 'signin'
                ?<SignIn signinChange = {this.signinChange} 
                         loadUser = {this.loadUser} />
                :<Register signinChange = {this.signinChange} 
                           loadUser = {this.loadUser}/>
              )

          }
        </div>
      );
  }
}

export default App;
