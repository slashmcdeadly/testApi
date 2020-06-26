import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      recipes: [],
      ingredients: [],
      ingredientShowing: false
    }
  }
  
  
  componentDidMount(){
    axios({
      url: "https://api.edamam.com/search",
      method: "GET",
      responseType: "json",
      params: {
        app_id: '5dd355ea',
        app_key: '53f90bf85dc64c3b10c76408bbdee8e2',
        q: "chicken"
      }
    }).then ((r) => {
      console.log(r)
      this.setState({
        recipes: r.data.hits,
      })
    })
  }

  handleClick = (e) => {
    this.setState({
      ingredientShowing: this.state.ingredientShowing ? false : true
    })
  }

  render(){
    return (
      <div className="App">
        <h1>What's for Dinner?</h1>
        <div>
          

          { this.state.recipes.map((recipe, index) => {
              return (
                <div>
                  <button key={index} onClick={this.handleClick}>{recipe.recipe.label}</button>
                  
                  { this.state.ingredientShowing ?
                  (recipe.recipe.ingredientLines.map( (ing) => {
                    return <p key={index}>{ing}</p>
                  })):null}

                </div>
             )
          })
          }
        </div>
      </div>
    );
  }
}

export default App;
