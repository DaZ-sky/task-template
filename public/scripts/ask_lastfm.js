import { card_row_update } from "./card_updater.js"
import { validate_data } from "./validator.js"
/**
 * Получает json-файл через API Last.fm
 * Вызывает card_row_update с полученными данными.
 * @param {string} url - ссылка без параметров
 * @param {URLSearchParams} params - параметры
 * @param {string} search_type - тип запроса
 */
export function ask_lastfm(url, params, search_type){
    event.preventDefault();

    const path_request = new Request(url+params);

    const json_answer = fetch(path_request)
    .then( (response) => {
      return response.json();
    }).then((data)=>{
    try
    {
        if(search_type=="artist"){
            card_row_update(validate_data(data, "artist"));
            return;
        }
        if(search_type=="album"){
            card_row_update(validate_data(data, "album"))
            return;
        }
        card_row_update(validate_data(data, "track"))
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
