/**
 * Подготавливает запрос к last.fm
 * Вызывает ask_lastfm.
 * @param {*} autor
 * @param {*} album 
 * @param {*} track 
 * @returns 
 */
function lastfm_search(autor, album, track){
let key = "d2dfb799fda7a6fb41b3b0c630a0be30"
let url_starter = "http://ws.audioscrobbler.com/2.0/?";
let params = new URLSearchParams(url_starter.search);

params.append('autocorrect',1);
params.append('api_key', key);
params.append('format','json');

if(track != '' && autor != ''){
    params.append('method', 'track.getInfo');
    params.append('artist', autor);
    params.append('track', track);
    ask_lastfm(url_starter,params,"track");
    return;
}
if(album != '' && autor != ''){
    params.append('method', 'album.getInfo')
    params.append('artist', autor);
    params.append('album', album);
    ask_lastfm(url_starter, params,"album")
    return;
}
if(autor != ''){
    let ans;
    params.append('method','artist.getInfo');
    params.append('artist', autor);
    ans = ask_lastfm(url_starter, params,"artist");
    return;
}
window.alert("Add at least the artist's name in the search field.")
}
/**
 * Получает json-файл через API Last.fm
 * Вызывает card_row_update с полученными данными.
 * @param {string} url - ссылка без параметров
 * @param {URLSearchParams} params - параметры
 * @param {string} search_type - тип запроса
 */
function ask_lastfm(url, params, search_type){
    event.preventDefault();

    let path_request = new Request(url+params);

    json_answer = fetch(path_request)
    .then( (response) => {
      return response.json();
    }).then((data)=>{
    try
    {
        if(search_type=="artist"){
            card_row_update(data.artist.name,...Array(3),data.artist.url);
            return;
        }
        if(search_type=="album"){
            card_row_update(data.album.artist, data.album.name,"",data.album.image[2]['#text'],data.album.url)
            return;
        }

        
        let album_of_track = ()=>{try{ return data.track.album.title}catch(e){return ""}};
        let album_image_of_track = ()=>{try{return data.track.album.image[2]['#text']}catch(e){return undefined}};

        card_row_update(data.track.artist.name, album_of_track(), data.track.name, album_image_of_track(), data.track.url)
    }catch(err)
    {
        console.log(err);
        window.alert("No such object in Last.fm data base")
    }
    })
    .catch((err)=>{
        window.alert(err.message)
    });
}
/**
 * Получает данные из полей поиска.
 * Вызывает lastfm_search.
 */
function start_search(){
    let track = document.getElementById("track_search").value;
    let album = document.getElementById("album_search").value;
    let autor = document.getElementById("autor_search").value;
    lastfm_search(autor, album, track);
}
/**
 * Отвечает сборку и за одновление карточек. 
 * @param {string} artist
 * @param {string} album 
 * @param {string} track 
 * @param {string} image - ссылка на обложку
 * @param {string} link - ссылка на соотв. страницу в last.fm
 */
 function card_row_update(artist="Unknown", album="", track="", image="https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png", link="https://www.last.fm/"){
    let row_name = "card_row"+Math.floor(Math.random()*2); 

    let card_row = document.getElementById(row_name);
    card_row.removeChild(card_row.lastElementChild);

    let card = document.createElement("div");
    card.className = "card";

    let link_web = document.createElement("a");
    link_web.href = link;

    let img = document.createElement("img");
    img.className = "image_size";
    img.src = image;

    link_web.append(img);
    card.append(link_web);

    let content = document.createElement("div");
    content.className = "card_content";

    let album_track = document.createElement("p");
    album_track.className = "simple_text_heavy";
    album_track.textContent = album;
    if(track!="")
    {
        album_track.textContent+=": " + track;
    }

    let autor = document.createElement("p")
    autor.textContent = artist;

    content.append(album_track);
    content.append(autor)
    card.append(content);

    card_row.insertBefore(card, card_row.firstElementChild);
}