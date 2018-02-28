
import React, { Component } from 'react';
import { Segment, Header, Message } from 'semantic-ui-react';
import PageHead from './components/PageHead';
import Search from './components/Search';
import Results from './components/Results';
import Saved from './components/Saved';
import {search, save, fetchSaved, deleteSaved} from './utils/API';


class App extends Component {
  state = {
    topic: '',
    start: 1900,
    end: 2050,
    results: [],
    saved: []
  }

  searchNYT = (query, start, end) => {
    search(query, start, end)
      .then(res => {
        this.setState({ results: res })
      })
      .catch(err => this.setState({ error: err.message }));
  }

  getSaved = event => {
    fetchSaved()
      .then(res => {
      this.setState({  })
      })
      .catch(err => this.setState({ error: err.message }));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchNYT(this.state.topic, this.state.start, this.state.end)
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSave = id => {
    const { article_id, title, url, date } = this.state.results.find(el => el.article_id === id)
    save(article_id, title, url, date)
      .then(res => this.getSaved())
      .catch(err => this.setState({ error: err.message }));
  }

  removeSaved = id => {
    deleteSaved(id)
      .then(res => this.getSaved())
      .catch(err => this.setState({ error: err.message }));
  }

  componentDidMount() {
    this.getSaved()
  }

  render() {
    return (
      <div>
      <Segment>
        <PageHead />
        <Search handleFormSubmit={"hello"/*this.handleFormSubmit*/} handleInputChange={this.handleInputChange} />
        <Results results={this.state.results} saved={this.state.saved} handleSave={this.handleSave} />
        <Saved saved={this.state.saved} removeSaved={this.removeSaved} />
      </Segment>
      </div>
    );
  }
}


export default App;



















// import React, { Component } from 'react';
// // import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
