import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import Book from './Book';
import axios from "axios";
import {BrowserRouter , Router, Route} from "react-router-dom";


class Books extends Component {

  state = {

        books: [],
        limit : 2,
        count : 0,
        page_count:0,
        search: ""
      }

  componentDidMount = async () => {

    const response = await axios.get("http://localhost:3004/books?_page=1&_limit="+this.state.limit)

    this.setState({

      books : response.data,
      count : response.headers['x-total-count'],
      page_count : Math.ceil(response.headers['x-total-count']/this.state.limit),
      current_page : 1

    })

  }

  getPages = (count,limit) =>{
    
    let pages = []
    let page_count = Math.ceil(count/limit)

    if(page_count > 1)
    {
        for (let j = 1; j < page_count+1; j++) {
 
        pages.push(<li className="page-item"><a className="page-link" onClick={() => this.paginationData(j,limit)} href="#">{j}</a></li>)
      
      }

    }
    
      return pages
  }

  paginationData = async (page,limit) => {
    
    const {search} = this.state;
    let search_text = "";

    if(search !== '')
    search_text = "&q="+search;
       
    const response = await axios.get("http://localhost:3004/books?_page="+page+"&_limit="+limit+""+search_text)

     this.setState({

      books: response.data,
      count : response.headers['x-total-count'],
      current_page : page,
      page_count : Math.ceil(response.headers['x-total-count']/limit),

    })
     
 
  }


  onDeleteBook = async (id) =>{
    
    await axios.delete(`http://localhost:3004/books/`+id);

    this.setState({

      books:this.state.books.filter(book => id !== book.id) 

    })

    if(this.state.books.length == 0 && this.state.current_page  >= 2 )
    {
        this.paginationData(this.state.current_page-1,this.state.limit);
    }

  }


  searchBook = async (e) => {
    
    const {limit} = this.state; 
    const value = e.target.value;
       
    const response = await axios.get("http://localhost:3004/books?q="+value+"&_limit="+limit);

       this.setState({

      books: response.data,
      count : response.headers['x-total-count'],
      page_count : Math.ceil(response.headers['x-total-count']/limit),
      search : value 
       })

  }
    

  render() {

    const {count,books,limit,page_count} = this.state;

    return (

      <div className="container">

       <div className="row">
             <div className="col-md-8">
               
   
                          <form className="mt-2" >
                                  <div className="form-group" style={{ paddingLeft:"15px"}}>
                                      <input onChange = {this.searchBook} type="text" name="search" id="search" className="form-control" placeholder="Ara" />
                                  </div>
                          </form>   
                   
              </div>
          </div>

      <div style={{minHeight:"135px"}}>
      {  

         books.map(book => {
                        return (
                            <Book 
                                key = {book.id}
                                id = {book.id} 
                                name = {book.name}
                                writer = {book.writer}
                                publisher = {book.publisher}
                                deleteBook = {this.onDeleteBook}
                              
                                                    
                            />
                        )

                    }
                    )
         

      }
      </div>
 
       <div className="col-md-8">

           <ul className="pagination d-flex justify-content-center">
               {
                 
                 page_count > 1 ? this.getPages(count,limit) : null
                  
               }
               
           </ul>

       </div>
      

      </div>
    );

  }
}

export default Books;
