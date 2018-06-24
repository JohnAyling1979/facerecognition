import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';

const app = new Clarifai.App({
 apiKey: 'c4ff12cfd4f94dfbacf32c51116aad21'
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
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
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = (event) => {
    this.setState({imageUrl: this.state.input})

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response =>  {
        // do something with response
        const faceOne = response.outputs[0].data.regions[0].region_info.bounding_box
        this.setFaceBox(this.calculateFaceLocation(faceOne))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render() {
    const {imageUrl, box, route} = this.state
    return (
      <div className="App">
        <Particles className='particles'/>
        <Navigation onRouteChange={this.onRouteChange} state={route}/>
        {
          route === 'signin' 
          ?
            <Signin onRouteChange={this.onRouteChange}/>
          : route === 'in' 
          ?
            <div>
              <Logo />  
              <Rank />
              <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          :
            <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App
