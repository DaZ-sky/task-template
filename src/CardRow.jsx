import { Card } from './Card';

export function CardRow(props){
        const popular_tracks = props.valide_data;
        const children = popular_tracks.map((val) => (
            <Card key={Math.random()} valid_response={val}></Card>
          ));
        return(
            <div id={"card_row" + props.id} className="card_row">
                {children}
            </div>
        );
}