import React from 'react';

export function Card(props){
        const link = props.valid_response.link;
        const image = props.valid_response.image;
        const artist = props.valid_response.artist;
        const track = props.valid_response.track;
        let card_text = props.valid_response.album;
        if (track !== "")
            card_text+=': ' + track;
    
        return(
        <div className = "card">
        <a href={''+link}>
         <img className="image_size" src={image}/>
        </a>
        <div className="card_content">
          <p className="simple_text_heavy">{card_text}</p>
          <p>{artist}</p>
        </div>
        </div>
  );
}
