import React, { Component } from 'react'
import posed from 'react-pose';
import axios from "axios";

const Animation = posed.div({
    visible : {
        opacity: 1,
        applyAtStart : {
            display : "block"
        }
    },
    hidden : {
        opacity : 0,
        applyAtEnd : {
            display : "none"
        }
    }
});

class AddBook extends Component {

  state = {
      visible : false,
      name : "",
      writer :"",
      publisher : "",
      error : false
  } 
  changeVisibility = (e) => {
      this.setState({
          visible : !this.state.visible
      })
  } 
  validateForm = () => {

      const {name,writer,publisher} = this.state;

      if (name === "" || writer === "" || publisher === "") {
          return false;
      }
      return true;
      
  }
  changeInput = (e) => {
      this.setState({
          
          [e.target.name] : e.target.value
      })
  }
  
  addBook = async (e) => {
    
      e.preventDefault();
      
      const {name,writer,publisher } = this.state;

      const newBook = {
          
          name,
          writer,
          publisher
      }
      
      if (!this.validateForm()) {
          this.setState({
              error :true
          })
          return;
      }
      
      
      const response = await axios.post("http://localhost:3004/books",newBook);

      // Redirect
      this.props.history.push("/");
      
  } 
  render() {
    const {visible,name,writer,publisher,error} = this.state;
   
                return (
     
                    <div className = "col-md-8 mb-4">
              
                      <button onClick = {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Formu Gizle" : "Formu Göster"}</button>
                      <Animation pose = {visible ? "visible" : "hidden"}>
                      <div className="card">
                          <div className="card-header">
                          <h4>Kitap Ekle</h4>
                          </div>
                          
                          <div className="card-body">
                             {
                                 error ? 
                                 <div className = "alert alert-danger">
                                    Lütfen bilgilerinizi kontrol edin.
                                 </div>
                                 :null
                             }

                              <form onSubmit = {this.addBook.bind(this)}>
                                  <div className="form-group">
                                      <label htmlFor="name">Kitap Adı</label>
                                      <input 
                                      type="text"
                                      name = "name"
                                      id = "id"
                                      placeholder = "Kitap"
                                      className ="form-control"
                                      value = {name}
                                      onChange = {this.changeInput}
              
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="writer">Yazar</label>
                                      <input 
                                      type="text"
                                      name = "writer"
                                      id = "writer"
                                      placeholder = "Yazar"
                                      className ="form-control"
                                      value = {writer}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="publisher">Yayın Evi</label>
                                      <input 
                                      type="text"
                                      name = "publisher"
                                      id = "publisher"
                                      placeholder = "Yayın Evi"
                                      className ="form-control"
                                      value = {publisher}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                  <button className = "btn btn-danger btn-block" type = "submit">Kitap Ekle</button>
                              
                              
                              </form>
                          </div>
                      
                      </div>
                      </Animation>
                    </div>
     
         )
  }
}
export default AddBook;

