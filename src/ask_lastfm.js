/**
 * Получает json-файл через API Last.fm
 * Вызывает card_row_update с полученными данными.
 * @param {string} url - ссылка без параметров
 * @param {URLSearchParams} params - параметры
 * @param {string} search_type - тип запроса
 */
export function ask_lastfm(e, url, params, search_type){
    e.stopPropagation();

    const path_request = new Request(url+params);
    console.log(path_request)
    const json_answer = fetch(path_request)
    .then( (response) => {
      return response.json();
    })
    .catch((err)=>{
        window.alert(err.message)
    });
    return {json_answer: json_answer, search_type: search_type};
}
