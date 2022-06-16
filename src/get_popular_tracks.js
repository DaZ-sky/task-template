/**
 * Функция для загрузки стартовых карт из lastfm.
 */
export function get_popular_tracks(){
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
    })
    .catch((err)=>{
        window.alert(err.message)
    });
    return json_answer;
}

