import React from 'react';

export function Accordion(){
    return(
    <aside className="accordion">
        <nav className="link_holder">
            <a className="link">Поиск lastfm</a><br/>
            <a className="link">Моя медиатека</a><br/>
            <a className="link">Создать плейлист</a><br/>
            <a className="link">Любимые треки</a>
        </nav>
    </aside>
    );
}


