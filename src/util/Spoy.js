savePlaylist(name, trackUris) {
    if (!name || !trackUris || trackUris.length === 0) return;
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId = undefined;
    let playlistId = undefined;
    fetch(userUrl, {
      headers: headers 
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        .then(() => {
          const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  }