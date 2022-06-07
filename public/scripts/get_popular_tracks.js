import {validate_top_tag_album} from './validator.js'
import {card_row_update} from './card_updater.js'
/**
 * Функция для загрузки стартовых карт из lastfm.
 */
function get_popular_tracks(){
    const url_starter = "http://ws.audioscrobbler.com/2.0/?";
    const key = "d2dfb799fda7a6fb41b3b0c630a0be30"
    let params = new URLSearchParams(url_starter.search);

    params.append('method', 'tag.gettopalbums');
    params.append('api_key', key);
    params.append('format','json');
    params.append('tag', 'electronic')

    const json_answer = fetch(url_starter+params)
    .then( (response) => {
      return response.json();
    }).then((data)=>{
    try
    {
        const start_tracks_number = Math.min(8, Object.keys(data.albums.album).length)
        for (let index = 0; index < start_tracks_number; ++index) {
            card_row_update(validate_top_tag_album(data.albums.album[index]), Math.trunc(index/4))
        } 
    }
    catch(err)
    {
        window.alert("No such object in Last.fm data base")
    }
    })
    .catch((err)=>{
        window.alert(err.message)
    });
}

get_popular_tracks();
