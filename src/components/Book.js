import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class Book extends Component {

   state = {
    isVisible : false
  }

   onClickEvent = (e) =>{
    
    this.setState({
      isVisible : !this.state.isVisible
    })
  }

 onDeleteBook = () => {
  
  const {id,deleteBook} = this.props;

  deleteBook(id);

 }


  render() {
    
    const {id,name,writer,publisher,hh} = this.props;
    const {isVisible} = this.state;
    
    return (
      <div className="col-md-8 mb-3">

      <div className="card">
	      <div className="card-header d-flex">
	        <h5 onClick={this.onClickEvent} style={{cursor:"pointer"}} >Kitap Adı : {name}</h5> 
          <div className="ml-auto">
          <Link to={`update/${id}`} style={{color:"black"}}><i className="far fa-edit mr-1" style={{cursor:"pointer",fontSize:"1.5em"}}></i></Link> 
          <i onClick={this.onDeleteBook} className="far fa-trash-alt" style={{cursor:"pointer",fontSize:"1.5em"}}></i>
          </div>
	      </div>

         {
                isVisible ?
	      <div className="card-body">

	      <p className="card-text">Kitap Yazarı : {writer} </p>
		  <p className="card-text">Yayın Evi : {publisher} </p>
  
	      </div> : null

	     }

      </div>

    


      </div>
    );

  }
}

export default Book;