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
        }
      ]
      
    };

    

    
  }

  

      
  

 render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults />
      <Playlist />
    </div>
  </div>
</div>
    );
  }
};

export default App;
