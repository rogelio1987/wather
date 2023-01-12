import { FunctionComponent } from 'react';
import './stylesCard.css';

export interface clima {
    color?:string,
    city?:string,
  }

 
const CardWather: FunctionComponent<clima>= ({color,city}) =>{

        return(
            <div className="card" style={{background:color?color:"#2f2f"}}>

            </div>
        )
  
}


export default CardWather;

