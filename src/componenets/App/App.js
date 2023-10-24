import React, { useState, useCallback } from "react";
import './App.css'

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../Utils/Spotify";


/*

const dummyData = [
  { id: 1, name: 'Song 1', artist: 'Artist 1' },
  { id: 2, name: 'Song 2', artist: 'Artist 2' },
  { id: 3, name: 'Song 3', artist: 'Artist 3' },
];


const dummyData = {
  "Song 1": [
    { id: 1, artist: "Artist 1" },
  ],
  "Song 2": [
    { id: 2, artist: "Artist 2" },
    { id: 3, artist: "Artist 3" },
  ],
  "Song 3": [
    { id: 4, artist: "Artist 4" },
  ],
};
*/

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

/**************************************************************/
/**************************************************************/
/**************************************************************/

/*
  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);*/

  /*
  const search = useCallback((term) => {
    // Filter the dummyData array to simulate the search
    const results = dummyData.filter((track) =>
      track.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  }, []);

  const search = useCallback((term) => {
    // Filter the songs based on the search term
    const results = Object.keys(dummyData)
      .filter(title => title.toLowerCase().includes(term.toLowerCase()))
      .map(title => dummyData[title])
      .flat();
  
    setSearchResults(results);
  }, []);
  */
  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);


/**************************************************************/
/**************************************************************/
/**************************************************************/


  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>
        Ja<span className="text-purple-600">mmm</span>ing
      </h1>
      <div
        className="App">
        <SearchBar onSearch={search} />
        <div className="flex justify-between w-full">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
