import SearchBar from "../Components/SearchBar/SearchBar";

let accessToken;
const clientId = '1406c5171b6448219567ace77f607b55';
const redirectURI = "daves_jammming.surge.sh";

let Spotify = {
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
            }).then(response => {
              return response.json()
            }).then( jsonResponse => {
                if (!jsonResponse.tracks){
                    return [];
                }    
                return jsonResponse.tracks.items.map(track =>({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri

                    })
                );
            }
        );
    },

    savePlaylist(name, trackURIs){
        if (!name || !trackURIs) {
            return
        }
        let accessToken = Spotify.getAccessToken();
        let headers = { Authorization: `Bearer ${accessToken}`};
        let userId;
        let userURL = 'https://api.spotify.com/v1/me';

        fetch(userURL, {headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name})
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs})
                    })
                })

            }
        )
    }
}       



export default Spotify;