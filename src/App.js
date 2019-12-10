import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Search from "./Components/Search";
import Navigation from "./Components/Navigation";
import PhotoList from "./Components/PhotoList";
import Page404 from "./Components/Page404";
import apiKey from "./config";
var S3 = require("aws-sdk/clients/s3");

export default class App extends Component {
  /* stores all of the state that the app requires to run */
  constructor() {
    super();
    this.state = {
      photos: [],
      travelPhotos: [],
      hikingPhotos: [],
      campingPhotos: [],
      loading: true,
      title: ""
    };
  }

  /* component runs when page starts or refrehses.
   * logic checks for parameters to keep UI and URL in line
   * gets all 3 sets of photos when page loads and stores them in State
   */

  componentDidMount() {
    if (document.location.pathname === "/") {
      this.performSearch("home");
    } else if (document.location.pathname.indexOf("/search/") === 0) {
      this.performSearch(
        document.location.pathname
          .split("/search/")
          .pop()
          .toString()
      );
    }

    this.getPhotos("travel").then(response =>
      this.setState({
        travelPhotos: response.data.results
      })
    );

    this.getPhotos("hiking").then(response =>
      this.setState({
        hikingPhotos: response.data.results
      })
    );

    this.getPhotos("camping").then(response =>
      this.setState({
        campingPhotos: response.data.results
      })
    );

    this.setState({
      loading: false
    });
    console.log(S3.apiKey);
  }

  // performSearch sends api request for photos from search input

  performSearch = query => {
    this.setState({
      loading: true
    });
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&per_page=16&query=${query}&client_id=${apiKey}`
      )
      .then(response => {
        this.setState({
          photos: response.data.results,
          loading: false,
          title: query
        });
      })
      .catch(err => {
        console.log("Something went wrong while fetching data!", err);
      });
  };

  //getPhotos gets three sets of photos for topic photos

  getPhotos = query => {
    return axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&per_page=16&query=${query}&client_id=${apiKey}`
      )
      .catch(err => {
        console.log("Something went wrong while fetching data!", err);
      });
  };

  /*renders Search and Nav as unchanging. Switch tracks path and renders relevant
  content by passing data via props
*/
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Search onSearch={this.performSearch} />
          <Navigation />

          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <PhotoList
                    data={this.state.photos}
                    title={this.state.title}
                  />
                )}
              />
              <Route
                path="/travel"
                render={() => (
                  <PhotoList data={this.state.travelPhotos} title={"Travel"} />
                )}
              />
              <Route
                path="/hiking"
                render={() => (
                  <PhotoList data={this.state.hikingPhotos} title={"Hiking"} />
                )}
              />
              <Route
                path="/camping"
                render={() => (
                  <PhotoList
                    data={this.state.campingPhotos}
                    title={"Camping"}
                  />
                )}
              />
              <Route
                path="/search/:query"
                render={() => (
                  <PhotoList
                    data={this.state.photos}
                    title={this.state.title}
                  />
                )}
              />
              <Route component={Page404} />
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}
