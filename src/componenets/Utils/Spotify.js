
/* */

import axios from 'axios';

const clientId = '59ad0d0d7d00426a9d79bbd3a9f4d257'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    // to resolve un-caught-error agar search bar ma kuch na likha ho aur search kr ra hon
    if (term === '') {
      return Promise.resolve('Enter song');
    }
    //-------------------------------------------
    const accessToken = Spotify.getAccessToken();
    return axios.get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.data;
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return Promise.resolve(console.log("no data"));

    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return axios.get('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.data
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
        { name: name },
        { headers: headers }
      ).then(response => response.data
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          { uris: trackUris }, { headers: headers });
      });
    });
  },



  getPopularTracks() {
    const country = 'ES';
    const limit = 15;
    const trackIds = "7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B";
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    const url = `https://api.spotify.com/v1/tracks?ids=${trackIds}&limit=${limit}&market=${country}`;

    return axios.get(url, { headers: headers })
      .then(response => {
        return response.data.tracks;
      
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        console.log(jsonResponse, "jsonResponse")
        return jsonResponse?.data?.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          // album: track.album.name,
          uri: track.uri
        }));
      });
  }



};

export default Spotify;
