import React from 'react';

export function Header(props){
    return(
    <header className="header">
      <p className="simple_text_heavt">Simple application with last.fm</p>
      <form>
        <input id="track_search" type="search" className="header_search" placeholder="Search track..."/>
        <input id="album_search" type="search" className="header_search" placeholder="Search album..."/>
        <input id="autor_search" type="search" className="header_search" placeholder="Search artist..."/>
        {/* <button id="search_button" type="button" className="header_button" onClick={e => start_search(e)}>Поиск</button> */}
        <button id="search_button" type="button" className="header_button" onClick={e => props.onSearchClick(e)}>Поиск</button>
      </form>
    </header>);
}