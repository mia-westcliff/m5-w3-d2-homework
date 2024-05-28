import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        singledata: {
          title: "",
          author: ""
        }
      };
    }
    getList = (event, id) => {
      this.setState(
        {
          singledata: {
            title: "Loading...",
            author: "Loading..."
          }
        },
        () => {
          fetch("http://localhost:5000/posts" + id)
          .then(res => res.json())
          .then(result => 
              this.setState({
                  singledata: {
                    title: result.title,
                    author: result.author ? result.author: ""
                  }
              })
          )
          .catch(console.log);
        }
      )
      
  }  
  handleChange = (event) => {
    let title = this.state.singledata.title;
    let author = this.state.singledata.author;
  
    if (event.target.name === "title") {
      title = event.target.value;
    } else {
      author = event.target.value;
    }
  
    this.setState({
      singledata: {
        title: title,
        author: author
      }
    });
  };

  createList = () => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
    .then(
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      })
    );
  }
  
  updateList = (event, id) => {
    fetch("http://localhost:5000/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      });
      this.getLists();
    });
  };

  deleteList = (event, id) => {
    fetch("http://localhost:5000/posts/" + id, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      });
      this.getLists();
    });
  };
  
  
    render() {
      const listTabke = this.state.loading ? 
      (<span>Loading Data......Please be patience</span>) : 
      (<Lists alldata={
        this.state.alldata}
        singledata={this.state.singledata}
        getList={this.getList}
        updateList={this.updateList}
        deleteList={this.deleteList}
        handleChange={this.handleChange}
 />);
      return (
          <div className="container">
              <span className="title-bar">
                  <button 
                      type="button"
                      className="btn btn-primary"
                      onClick={this.getLists}
                  >
                      Get Lists
                  </button>
                  <CreateList 
                    singledata={this.state.singledata} 
                    handleChange={this.handleChange}
                    createList={this.createList}
                  />
              </span>
              {listTabke}
          </div>
      );
  }
  
  }

export default App;