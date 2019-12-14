import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Books from './components/Books';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import axios from "axios";
import {BrowserRouter as Router, Route,Link} from "react-router-dom";



class App extends Component {



  render() {


    return (

      <div className="container">
      <Navbar title="Kütüphane" />
      
      <Router>

             <Route exact path='/' component={Books} />
             <Route exact path='/add' component={AddBook} />
             <Route exact path='/update/:id' component={UpdateBook} />
             
      </Router>
 
      

      </div>
    );

  }
}

export default App;
