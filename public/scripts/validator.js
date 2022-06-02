const default_image = "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";
const default_link = "https://www.last.fm/"
/**
 * Валидатор для запоса по артисту
 * @param {*} data 
 * @returns Валидный ответ.
 */
function validate_artist(data){
    const artist_name = () => {try{return data.artist.name}catch(e){return "Unknown"}};
    const artist_link = () => {try{return data.artist.url}catch(e){window.alert("No such object in Last.fm data base"); return default_link}};
    const validated_response = {artist: artist_name(), album: "", track: "", image: default_image, link: artist_link()};
    return validated_response;
}

/**
 * Валидатор для запоса по альбому
 * @param {*} data 
 * @returns Валидный ответ.
 */
function validate_album(data){
    const album_artist = () => {try{return data.album.artist}catch(e){return "Unknown"}};
    const album_name = () => {try{return data.album.name}catch(e){return ""}};
    const album_image = () => {try{return data.album.image[2]['#text']}catch(e){return default_image}};
    const album_link = () => {try{return data.album.url}catch(e){window.alert("No such object in Last.fm data base"); return default_link}};
    const validated_response = {artist: album_artist(), album: album_name(), track: "", image: album_image(), link: album_link()};
    return validated_response;
}
/**
 * Валидатор для запоса по треку
 * @param {*} data 
 * @returns Валидный ответ.
 */
function validate_track(data){
    const album_of_track = ()=>{try{ return data.track.album.title}catch(e){return ""}};
    const album_image_of_track = ()=>{try{return data.track.album.image[2]['#text']}catch(e){return default_image}};
    const track_artist_name = () => {try{return data.track.artist.name}catch(e){return "Unknown"}};
    const track_name = () => {try{return data.track.name}catch(e){return ""}};
    const track_link = () => {try{return data.track.url}catch(e){window.alert("No such object in Last.fm data base"); return default_link}}
    const validated_response = {artist: track_artist_name(), album: album_of_track(), track: track_name(), image: album_image_of_track(), link: track_link()};
    return validated_response;
}

/**
 * агрегатор
 * @param {*} data 
 * @param {*} request 
 * @returns 
 */
export function validate_data(data, request){
    if(request == "artist")
        return validate_artist(data)
    if(request == "album")
        return validate_album(data)
    return validate_track(data)
}
/**
 * Валидатор для старовых карточек.
 * @param {*} data 
 * @returns 
 */
export function validate_top_tag_album(data){
    const artist_name = () => {try{return data.artist.name}catch(e){return "Unknown"}}
    const track_name = () =>{try{return data.name}catch(e){return ""}}
    const track_image = ()=>{try{return data.image[2]['#text']}catch(e){return default_image}};
    const url = () => {try{return data.url}catch(e){return default_link}}
    const validated_response = {artist: artist_name(), album: "", track: track_name(), image: track_image(), link: url()};
    return validated_response;
}
