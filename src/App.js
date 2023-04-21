import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import ModelSelection from './components/ModelSelection/ModelSelection';
import AgeRecognition from './components/AgeRecognition/AgeRecognition';
import { Component } from 'react';
import ParticlesBg from 'particles-bg';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  model: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  ageRanges: {
    first: ['', 0],
    second: ['', 0],
    third: ['', 0]
  }
}

const initialAgeRanges = {
  first: ['', 0],
  second: ['', 0],
  third: ['', 0]
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      model: '',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
      ageRanges: {
        first: ['', 0],
        second: ['', 0],
        third: ['', 0]
      }
    }
  }

  componentDidMount = () => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.loadUser(foundUser);
      this.setState({isSignedIn: true})

      const lastRoute = localStorage.getItem('route')
      if (lastRoute) {
        this.setState({route: lastRoute})
      } else {
        this.setState({route: 'home'})
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
    localStorage.setItem('user', JSON.stringify(data))
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState()
    this.setState({ imageUrl: this.state.input, box: {}, ageRanges: initialAgeRanges });
    
    if (this.state.model === 'face-recognition') {
      this.submitFaceDetection();
    } else if (this.state.model === 'age-recognition') {
      this.submitAgeDetection();
    } else {
      console.log('oops!')
    }
    
  }

  submitFaceDetection = () => {
    fetch(process.env.REACT_APP_URL + '/facedetection', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response))
        if (response) {
          fetch(process.env.REACT_APP_URL + '/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
              localStorage.setItem('user', JSON.stringify(this.state.user))
            })
            .catch(console.log)
        }
      })
      .catch(err => console.log(err));
  }

  submitAgeDetection = () => {
    fetch(process.env.REACT_APP_URL + '/agedetection', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setAgeRangeData(response)
        if (response) {
          fetch(process.env.REACT_APP_URL + '/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
              localStorage.setItem('user', JSON.stringify(this.state.user))
            })
            .catch(console.log)
        }
      })
      .catch(err => console.log(err));
  }

  setAgeRangeData = (response) => {
  const newAgeRanges = {
    first: [response.outputs[0].data.concepts[0].name, response.outputs[0].data.concepts[0].value],
    second: [response.outputs[0].data.concepts[1].name, response.outputs[0].data.concepts[1].value],
    third: [response.outputs[0].data.concepts[2].name, response.outputs[0].data.concepts[2].value]
  }
  this.setState({ageRanges: newAgeRanges })
}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      localStorage.clear();
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: route })
      localStorage.setItem('route', route)
    } else {
      this.setState({ route: route })
      localStorage.setItem('route', route)
    }
  }

  onSubmitDelete = () => {
    fetch(process.env.REACT_APP_URL + '/deleteaccount', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.user.email
      })
    })
      .then(response => response.json())
      .then(this.onRouteChange('signout'))
    .catch(err => console.log)
  }

  setModelDetection = (model) => {
    this.setState({model: model})
  }

  render() {
    const { isSignedIn, imageUrl, route, box, user, model, ageRanges } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" color="#ffffff" num={200} type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? 
            <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ModelSelection setModelDetection={this.setModelDetection} />
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            {model === 'face-recognition'
            ?
              <FaceRecognition box={box} imageUrl={imageUrl} />
            : 
              <AgeRecognition ageRanges={ageRanges} imageUrl={imageUrl} />
            }
            </div>
          : route === 'signin'
          ? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : route === 'profile'
          ?
            <Profile user={user} onSubmitDelete={this.onSubmitDelete} />
          :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
