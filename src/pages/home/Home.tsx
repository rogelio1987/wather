
import { FunctionComponent, useState,useEffect } from 'react';
import CardWather from '../../components/cardWather/cardWather';
import { city } from '../../types/types';
import './Home.css'
import axios from "axios";
import { onTextChange } from '../../funtionsAux/functions';

const HomePage: FunctionComponent = () => {

    const [citiName,setcitiName]=useState<string>("")
    const [cities,setCities]=useState<Array<city>>([])
    const [cityselect,setcityselect]=useState<city>()

    useEffect(() => {
        loadCitys()
    }, [citiName])
    

    //FUNCION PARA CARGAR LAS CIUADADES QUE SE VAN TECLEANDO
    async function loadCitys(){
       if(citiName.length>0){
        axios.get("https://geocoding-api.open-meteo.com/v1/search?name="+citiName).then((response) => {
                setCities(JSON.parse(JSON.stringify(response.data)).results)
            })
       }
    }

   async function load(){
    let city;
    try {
        // const res = await fetch(
        //     `https://geocoding-api.open-meteo.com/v1/search?name=Berlin`
        //     // `https://rickandmortyapi.com/api/character/?name=${nombre}&status=alive`
        // ).then((v)=>{
        //     console.log("Ciudades.....",v)
        // });
       
    } catch (error) {
        
    }
   }




  return (
    <div className='bodyPage'>   
            <header>
                <div className='toogle'>
                 
                </div>
            </header>  
            <div className='divider'></div>  
            <div className='search'>
                <div className='searchConten'>
                    <div className='input'> 
                        <input placeholder='Enter a city name'value={citiName} onChange={(event=>{setcitiName(onTextChange(event))})} />
                        <div className='citysContainer' style={{marginTop:"0.5rem"}}>
                {
                    cities?.map((ci,i)=>{
                        return(
                            <button key={i} onClick={()=>setcityselect(ci)}>{ci.name}</button>
                            )
                        })
                }
            </div>
                    </div>
                    <div className='contenElemets'>
                        <button className='submit' onClick={()=>{console.log("Pres.....")}}>submit</button>
                    </div>
                </div>   
            </div> 
           
            <div>
            
            <div className='divider'></div> 
            <div className='divider'></div> 
            </div> 
            <div className='cardContainer'>
                <CardWather /> 
            </div>
                  
            </div>    
  );
}


export default HomePage;