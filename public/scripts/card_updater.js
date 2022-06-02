/**
 * Отвечает сборку и за одновление карточек. 
 * @param {string} artist
 * @param {string} album 
 * @param {string} track 
 * @param {string} image - ссылка на обложку
 * @param {string} link - ссылка на соотв. страницу в last.fm
 */

 export function card_row_update(validated_response, row=-1){
    let row_name = "card_row"
    if(row == -1)
        row_name += Math.floor(Math.random()*2); 
    else
        row_name += row;

    let card_row = document.getElementById(row_name);
    card_row.removeChild(card_row.lastElementChild);
    let card = document.createElement("div");
    card.className = "card";

    let link_web = document.createElement("a");
    link_web.href = validated_response.link;

    let img = document.createElement("img");
    img.className = "image_size";
    img.src = validated_response.image;

    link_web.append(img);
    card.append(link_web);

    let content = document.createElement("div");
    content.className = "card_content";

    let album_track = document.createElement("p");
    album_track.className = "simple_text_heavy";
    album_track.textContent = validated_response.album;
    if(validated_response.track!="")
    {
        album_track.textContent+=": " + validated_response.track;
    }

    let autor = document.createElement("p")
    autor.textContent = validated_response.artist;

    content.append(album_track);
    content.append(autor)
    card.append(content);

    card_row.insertBefore(card, card_row.firstElementChild);
}
