import React, { useState, useCallback } from "react";
import './App.css'

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../Utils/Spotify";
import TrackList from "../TrackList/TrackList";
import { useEffect } from "react";



const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [popularTracks, setPopularTracks] = useState([])


  const Tracks = () => {
    Spotify.getPopularTracks()
      .then(response => {
        console.log(response, "res in app")
        // setPopularTracks(response)
      });


  };
  useEffect(() => {
    Tracks();
  }, [])

  console.log("Tracks", popularTracks)
  const search = useCallback((term) => {
    Spotify.search(term)

      // .then(setSearchResults);
      .then(response => {

        setSearchResults(response)
      });


  }, []);



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

        {searchResults ?
          <div className=" w-full p-1 m-1 bg-opacity-70 bg-blue-900 shadow-md border-solid
       border-2 border-neutral-950 me-4 rounded-md" >
            <p>cards

            </p>
            <TrackList tracks={popularTracks} onAdd={addTrack} />
          </div>
          :
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
        }


      </div>
    </div>
  );
};

export default App;
