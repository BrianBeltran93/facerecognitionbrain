import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
import ParticlesBg from 'particles-bg';

const setupClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'd3ba2de3e74c4b19ac4a849af65e8e4c';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'brianb93';       
  const APP_ID = 'my-first-application';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'home',
      isSignedIn: false,
      user: {
      }
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(response => {
        console.log('hi', response.outputs[0].data.regions[0].region_info.bounding_box)
        // if (response) {
        //     fetch('http://localhost:3000/image', {
        //         method: 'put',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({
        //             id: this.state.user.id
        //         })
        //     })
        //     .then(response => response.json())
        //     .then(count => {
        //         this.setState(Object.assign(this.state.user, { entries: count}))
        //     })
        // }
    })
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg className="particles" color="#ffffff" num={200} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
