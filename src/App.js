//EIS APP MEIN SAARA KAAM CLASS BASED COMPONENT SE HOGA NA KI TEXTUTILS KI TARAH FUNCTION BASED COMPONENT SE.
//Basic structure rce se aa jayega

import './App.css';

import React, { useState } from 'react'
import Navbar from './component/Navbar';
import News from './component/News(Class_Based)';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

const App = () => {

   const pageSize = 16;
   const apiKey=process.env.REACT_APP_NEWS_API;
  // apiKey='9226ac64931349f7ad03f6b8fadce119';


  const[progress,setProgress]=useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={2}
        color='#f11946'
        progress={progress}
      />

          <Routes><Route exact path='/' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='general' />} /></Routes>
          <Routes><Route exact path='/business' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='business' />} /></Routes>
          {/* // exact path='/business' se matlab hai ki jab Bussiness(Navbar mein) par click karega to category business pass ho jayegi,same sab me aiesa hi hoga // */}
          <Routes><Route exact path='/entertainment' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='entertainment' />} /></Routes>
          <Routes><Route exact path='/health' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='health' />} /></Routes>
          <Routes><Route exact path='/science' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='science' />} /></Routes>
          <Routes><Route exact path='/sports' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='sports' />} /></Routes>
          <Routes><Route exact path='/technology' element={<News apiKEY={apiKey} setProgress={setProgress} pageSize={pageSize} country='in' category='technology' />} /></Routes>


          {/* key="" element lgane se force rendering ho jayegi //// ye commented cheeze react ke previous versions ke liye theek h,but ab kaam nhi krti
          <Routes><Route exact path='/' /><News apiKEY={apiKey} setProgress={setProgress}key="general"  pageSize={pageSize} country='in' category='general' /></Routes>
          <Routes><Route exact path='/business' /><News apiKEY={apiKey} setProgress={setProgress}key="general"  pageSize={pageSize} country='in' category='general' /></Routes>
          {/* exact path='/business' se matlab hai ki jab Bussiness(Navbar mein) par click karega to category business pass ho jayegi,same sab me aiesa hi hoga */}
          {/* <Routes><Route exact path='/entertainment' /><News apiKEY={apiKey} setProgress={setProgress}key="entertainment"  pageSize={pageSize} country='in' category='entertainment' /></Routes>
          <Routes><Route exact path='/general' /><News apiKEY={apiKey} setProgress={setProgress}key="general"  pageSize={pageSize} country='in' category='general' /></Routes>
          <Routes><Route exact path='/health' /><News apiKEY={apiKey} setProgress={setProgress}key="health"  pageSize={pageSize} country='in' category='health' /></Routes>
          <Routes><Route exact path='/science' /><News apiKEY={apiKey} setProgress={setProgress}key="science"  pageSize={pageSize} country='in' category='science' /></Routes>
          <Routes><Route exact path='/sports' /><News apiKEY={apiKey} setProgress={setProgress}key="sports"  pageSize={pageSize} country='in' category='sports' /></Routes>
          <Routes><Route exact path='/technology' /><News apiKEY={apiKey} setProgress={setProgress}key="technology"  pageSize={pageSize} country='in' category='technology' /></Routes> */}

        </Router>
      </div>

    )
  }

  export default App;

