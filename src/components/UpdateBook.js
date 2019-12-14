import React, { Component } from 'react'
import axios from "axios";

class UpdateBook extends Component {

 state = {
      name : "",
      writer :"",
      publisher : "",
      error : false
  }
   
  changeInput = (e) => {
      this.setState({
          
          [e.target.name] : e.target.value
      })
  }
  componentDidMount = async () => {

    const {id} = this.props.match.params;
    const response = await axios.get(`http://localhost:3004/books/${id}`);

    const {name,writer,publisher } = response.data;

    this.setState({
        name,
        writer,
        publisher
    });

  }

  validateForm = () => {

      const {name,writer,publisher} = this.state;

      if (name === "" || writer === "" || publisher === "") {
          return false;
      }
      return true;
      
  }

  updateUser = async (e) => {
      e.preventDefault();

      // Update User
      const {name,writer,publisher } = this.state;
      const {id} = this.props.match.params;

      const updatedUser = {
        name,
        writer,
        publisher
      };

      if (!this.validateForm()) {
        this.setState({
            error :true
        })
        return;
        }

      const response = await axios.put(`http://localhost:3004/books/${id}`,updatedUser);

      // Redirect
      this.props.history.push("/");
  } 
  render() {

    const {name,writer,publisher,error} = this.state;

   
                return (
     
            <div className = "col-md-8 mb-4">
               <div className="card">
                          <div className="card-header">
                          <h4>Kitap Güncelle</h4>
                          </div>
                          <div className="card-body">
                          {
                            error ? 
                            <div className = "alert alert-danger">
                               Lütfen bilgilerinizi kontrol edin.
                            </div>
                            :null
                         }
                              <form onSubmit = {this.updateUser.bind(this)}>
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
                                  <button className = "btn btn-danger btn-block" type = "submit">Kitap Güncelle</button>
                              
                              
                              </form>
                          </div>
                      
                      </div>
                      
                    </div>
                  )
  }
}
export default UpdateBook;
