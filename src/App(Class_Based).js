//EIS APP MEIN SAARA KAAM CLASS BASED COMPONENT SE HOGA NA KI TEXTUTILS KI TARAH FUNCTION BASED COMPONENT SE.
//Basic structure rce se aa jayega

import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News(Class_Based)';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

   pageSize = 16;
   apiKey=process.env.REACT_APP_NEWS_API;
  // apiKey='9226ac64931349f7ad03f6b8fadce119';

  state={
    progress:0
  }

  //Method ke through state set kr rhe hain
  setProgress=(progress)=>
  {
    this.setState({progress:progress});
  }
  render() {

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={2}
        color='#f11946'
        progress={this.state.progress}
      />

          <Routes><Route exact path='/' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='general' />} /></Routes>
          <Routes><Route exact path='/business' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='business' />} /></Routes>
          {/* // exact path='/business' se matlab hai ki jab Bussiness(Navbar mein) par click karega to category business pass ho jayegi,same sab me aiesa hi hoga // */}
          <Routes><Route exact path='/entertainment' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='entertainment' />} /></Routes>
          <Routes><Route exact path='/health' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='health' />} /></Routes>
          <Routes><Route exact path='/science' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='science' />} /></Routes>
          <Routes><Route exact path='/sports' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='sports' />} /></Routes>
          <Routes><Route exact path='/technology' element={<News apiKEY={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='technology' />} /></Routes>


          {/* key="" element lgane se force rendering ho jayegi //// ye commented cheeze react ke previous versions ke liye theek h,but ab kaam nhi krti
          <Routes><Route exact path='/' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="general"  pageSize={this.pageSize} country='in' category='general' /></Routes>
          <Routes><Route exact path='/business' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="general"  pageSize={this.pageSize} country='in' category='general' /></Routes>
          {/* exact path='/business' se matlab hai ki jab Bussiness(Navbar mein) par click karega to category business pass ho jayegi,same sab me aiesa hi hoga */}
          {/* <Routes><Route exact path='/entertainment' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="entertainment"  pageSize={this.pageSize} country='in' category='entertainment' /></Routes>
          <Routes><Route exact path='/general' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="general"  pageSize={this.pageSize} country='in' category='general' /></Routes>
          <Routes><Route exact path='/health' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="health"  pageSize={this.pageSize} country='in' category='health' /></Routes>
          <Routes><Route exact path='/science' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="science"  pageSize={this.pageSize} country='in' category='science' /></Routes>
          <Routes><Route exact path='/sports' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="sports"  pageSize={this.pageSize} country='in' category='sports' /></Routes>
          <Routes><Route exact path='/technology' /><News apiKEY={this.apiKey} setProgress={this.setProgress}key="technology"  pageSize={this.pageSize} country='in' category='technology' /></Routes> */}

        </Router>
      </div>

    )
  }
}

