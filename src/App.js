import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios'
import Search from './Components/Search';
import Navigation from './Components/Navigation'
import PhotoList from './Components/PhotoList'
import apiKey from './config';

export default class App extends Component {

  constructor() {

    super();
    this.state = {
      photos: [],
      catPhotos: [],
      dogPhotos: [],
      computerPhotos: [],
      loading: true,
      title: ''
    };
  }

  componentDidMount(){
    this.performSearch();

    this.getPhotos('cat')
    .then(response => this.setState({
      catPhotos: response.data.results
    }))

    this.getPhotos('dog')
    .then(response => this.setState({
      dogPhotos: response.data.results
    }))

    this.getPhotos('computer')
    .then(response => this.setState({
      computerPhotos: response.data.results
    }))
  }


  performSearch = (query = 'home') => {
    this.setState({
      loading: true
    })
    axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=16&query=${query}&client_id=${apiKey}`)
      .then(response => {
        this.setState({
          photos: response.data.results,
          loading: false,
          title: query
        })
        .catch(err => {
          console.log('Something went wrong while fetching data!', err)
        })
      })
  }

  getPhotos = (query) => {
    return axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=16&query=${query}&client_id=${apiKey}`)
        .catch(err => {
          console.log('Something went wrong while fetching data!', err)
        })
      }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Search onSearch={this.performSearch} />
            <Navigation />
           {/*}<Route path={"/"} render={(props) => <Search onSearch={this.performSearch} />} />
           <Route path={"/"} render={(props) => <Navigation onSearch={this.performSearch} />} /> */}
          {
            (this.state.loading)
            ? <p>Loading...</p>
            :
              <Switch>
                <Route exact path="/" render={() =><PhotoList data={this.state.photos} title={this.state.title} />} />
                <Route path="/cats" render={() =><PhotoList data={this.state.catPhotos} title={'Cats'} />} />
                <Route path="/dogs" render={() =><PhotoList data={this.state.dogPhotos} title={'Dogs'} />} />
                <Route path="/computers" render={() =><PhotoList data={this.state.computerPhotos} title={'Computers'} />} />
                <Route path="/search/:query" render={() =><PhotoList data={this.state.photos} title={this.state.title} />} />
              </Switch>
          }
        </div>
      </BrowserRouter>
  )
  }
}
