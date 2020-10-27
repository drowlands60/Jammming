import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

  
class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      
      searchResults: [
      {
        artist: 'Oasis',
        name: 'Masterplan',
        album: 'Masterplan',
        id: 1
      },
      {
        artist: 'No Doubt',
        name: 'Dont Speak',
        album: 'Tragic Kingdom',
        id: 2
      },
      {
        artist: 'Verve',
        name: 'The Drugs Dont Work',
        album: 'Urban Hymms',
        id: 3
      }
      ],

      playlistName: "PLAYLIST",

      playlistTracks: [
        {
          artist: 'Oasis1',
          name: 'Masterplan1',
          album: 'Masterplan1',
          id: 11
        },
        {
          artist: 'No Doubt1',
          name: 'Dont Speak1',
          album: 'Tragic Kingdom1',
          id: 21
        },
        {
          artist: 'Verve1',
          name: 'The Drugs Dont Work1',
          album: 'Urban Hymms1',
          id: 31
        },
        {
          artist: 'Cast',
          name: 'Sandstorm',
          album: 'All Change',
          id: 41
        }
      ]
    }; 
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let newList = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    newList.push(track);
    this.setState ({ playlistTracks: newList }); 
  }

  removeTrack(track){
    let newList = this.state.playlistTracks;
    newList = newList.filter(savedTrack => savedTrack.id !== track.id);
    this.setState  ({ playlistTracks: newList });
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name });
  }

  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.map(track => {
      trackURIs.push(track.uri);
    });
  }

  search(term){
    console.log(term);
  }  
  

 render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
      <Playlist 
        playlist={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}  
        onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
};

export default App;

