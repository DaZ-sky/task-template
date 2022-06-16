import {React, useEffect} from 'react';
import { Header } from './Header';
import { Accordion } from './Accordion'
import { Info } from './Info';
import { CardRow} from './CardRow';
import { get_popular_tracks } from './get_popular_tracks';
import { validate_top_tag_album, validate_data } from './validator';
import { useState } from 'react';
import { start_search } from './lastfm_search_module';

const defaultCard = {artist: "Unknown", album: "", track: "", image: "/data/images/lqip.jpg", link: "https://www.last.fm/"};  

export function Main(){
    let [popularTracks, setPopularTracks] = useState([defaultCard,defaultCard,defaultCard,defaultCard,defaultCard,defaultCard,defaultCard,defaultCard]);

    
    function onSearchClick(e){
        const reqest = start_search(e);
        const newData = reqest.json_answer;
        const search_type = reqest.search_type;
        newData.then((data)=>{
        try
        {
            setPopularTracks([validate_data(data, search_type), ...popularTracks.slice(0,7)])
        }
        catch(err)
        {
            window.alert("No such object in Last.fm data base")
        }
        })
    }

       useEffect(()=>{
        const data = get_popular_tracks();
        data.then((data)=>{
        try
        {
            let popular_tracks = [];
            const start_tracks_number = Math.min(8, Object.keys(data.albums.album).length)
            for (let index = 0; index < start_tracks_number; ++index) {
                popular_tracks.push(validate_top_tag_album(data.albums.album[index]))
            }
            setPopularTracks(popular_tracks)
        }
        catch(err)
        {
            window.alert("No such object in Last.fm data base")
        }
        })
    }, []);

    return(
        <div className="app">
            <Header onSearchClick={onSearchClick.bind(this)}></Header>
            <Accordion></Accordion>
            <div className='main'>
                <Info></Info>
                <CardRow valide_data={popularTracks} id="0"></CardRow>
            </div>
        </div>
    );
}