import React, {Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
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
      loading: true,
      title: ''
    };
  }

  componentDidMount(){
    this.performSearch();
  }

  performSearch = (query = 'home') => {
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

  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Search onSearch={this.performSearch} />
            <Navigation onSearch={this.performSearch}/>
          {/*            <Route path={"/"} render={(props) => <Search onSearch={this.performSearch} />} />
                      <Route path={"/"} render={(props) => <Navigation onSearch={this.performSearch} />} />*/}
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <PhotoList data={this.state.photos} title={this.state.title} />
          }
        </div>
      </BrowserRouter>
  )
  }
}
