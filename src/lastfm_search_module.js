import {ask_lastfm} from "./ask_lastfm.js"
/**
 * Создает url запроса в случае поиска альбома и вызывает ask_lastfm.
 * @param {*} params - параметры запроса
 * @param {*} search_request - запрос поиска
 * @param {*} url_starter - шаблон запроса
 */
function album_params_request(e, params, search_request, url_starter){
    params.append('method', 'album.getInfo')
    params.append('artist',search_request.artist);
    params.append('album', search_request.album);
    return ask_lastfm(e, url_starter, params,"album")
}

/**
 * Создает url запроса в случае поиска трека и вызывает ask_lastfm.
 * @param {*} params - параметры запроса
 * @param {*} search_request - запрос поиска
 * @param {*} url_starter - шаблон запроса
 */
function track_params_request(e, params, search_request, url_starter){
    params.append('method', 'track.getInfo');
    params.append('artist', search_request.artist);
    params.append('track', search_request.track);
    return ask_lastfm(e, url_starter,params,"track");
}

/**
 * Создает url запроса в случае поиска артиста и вызывает ask_lastfm.
 * @param {*} params - параметры запроса
 * @param {*} search_request - запрос поиска
 * @param {*} url_starter - шаблон запроса
 */
function artist_params_request(e, params, search_request, url_starter){
    params.append('method','artist.getInfo');
    params.append('artist',search_request.artist);
    return ask_lastfm(e, url_starter, params,"artist");
}

/**
 * Подготавливает запрос к last.fm
 * Вызывает ask_lastfm.
 * @param {*} search_request - набор из артиста, альбома и трека
 * @returns 
 */
function lastfm_search(search_request, e){
const key = "d2dfb799fda7a6fb41b3b0c630a0be30"
const url_starter = "http://ws.audioscrobbler.com/2.0/?";
let params = new URLSearchParams(url_starter.search);

params.append('autocorrect', 1);
params.append('api_key', key);
params.append('format','json');

if(search_request.track != '' && search_request.artist != ''){
    return track_params_request(e, params, search_request, url_starter)
}
if(search_request.album != '' && search_request.artist != ''){
    return album_params_request(e, params, search_request, url_starter)
}
if(search_request.artist != ''){
    return artist_params_request(e, params, search_request, url_starter)
}
window.alert("Add at least the artist's name in the search field.")
}

/**
 * Получает данные из полей поиска.
 * Вызывает lastfm_search.
 */
export function start_search(e){
    const track = document.getElementById("track_search").value;
    const album = document.getElementById("album_search").value;
    const autor = document.getElementById("autor_search").value;
    const search_request = {artist: autor, album: album, track: track}
    console.log(search_request)
    return lastfm_search(search_request, e);
}

