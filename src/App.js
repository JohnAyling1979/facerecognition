import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''        
  }  
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (userIn) => {
    this.setState({user: {
        id: userIn.id,
        name: userIn.name,
        email: userIn.email,
        entries: userIn.entries,
        joined: userIn.joined        
    }})
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height -(data.bottom_row * height)
    }
  }

  setFaceBox = (box) => {
    console.log(this.state.box)
    this.state.box.push(box)
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = (event) => {
    this.setState({imageUrl: this.state.input})
    this.setState({box:[]})

    fetch('http://localhost:3000/imageUrl', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
      .then(response =>  {
        console.log(response.outputs[0].data.regions)
        response.outputs[0].data.regions.forEach(region => {
          const face = region.region_info.bounding_box
          console.log(face)
          this.setFaceBox(this.calculateFaceLocation(face))
          if(response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries:count}))
            })
            .catch(console.log)
          }          
        })
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({route: route})

    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
  }

  render() {
    const {imageUrl, box, route, user} = this.state
    return (
      <div className="App">
        <Particles className='particles'/>
        <Navigation onRouteChange={this.onRouteChange} state={route}/>
        {
          route === 'signin' 
          ?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : route === 'home' 
          ?
            <div>
              <Logo />  
              <Rank name={user.name} rank={user.entries}/>
              <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App
