import axios from 'axios';
import moment from 'moment';
import { FunctionComponent, useState,useEffect } from 'react';
import { city,card,tempCar, temp } from '../../types/types';
import HorizontalScroll from 'react-horizontal-scrolling'

import './stylesCard.css';

import '../../fonts/weather-icons-master/css/weather-icons.css'

export interface clima {
    carvValue:city
    grade:string,
    
  }

 
const CardWather: FunctionComponent<clima>= ({carvValue,grade}) =>{
    const [color,setcolor]=useState<string>("#FFB703")
    const [tempe,settempe]=useState<temp>()  //
    //clores de la tarjeta
    const [car,setcar]=useState<card>()

    const [tempertureStble,settempertureStble]=useState<number>(0)

    useEffect(() => {
        load()
    }, [grade])
    
    function load(){
        try {
                if(grade=='F'){
                    axios.get("https://api.open-meteo.com/v1/forecast?latitude="+carvValue.latitude+"&timezone=auto&longitude="+carvValue.latitude+"&hourly=temperature_2m&temperature_unit=fahrenheit&&start_date="+moment().format('Y-MM-DD')+"&end_date="+moment().add(4,'days').format('Y-MM-DD')).then(async (response) => {
                        console.log("dtos de l ciudad.....",JSON.parse(JSON.stringify(response.data)))
                        //settempe(JSON.parse(JSON.stringify(response.data)))  
                        loadCity(JSON.parse(JSON.stringify(response.data)))
                    })
                }else{
                    axios.get("https://api.open-meteo.com/v1/forecast?latitude="+carvValue.latitude+"&timezone=auto&longitude="+carvValue.latitude+"&hourly=temperature_2m&&start_date="+moment().format('Y-MM-DD')+"&end_date="+moment().add(4,'days').format('Y-MM-DD')).then(async (response) => {              
                        // settempe(JSON.parse(JSON.stringify(response.data)))
                        loadCity(JSON.parse(JSON.stringify(response.data)))
                       
                    })
                }
        } catch (error) {
            
        }
    }
async function loadCity(data:any) {
    let temp:Array<card>=[]

    let tempCrdtem:tempCar=[]
    console.log("Promedio or dias...temp..",data?data.hourly.temperature_2m:null)
        let tempP=0;
        let tmpArr:Array<number>|null=data?data.hourly.temperature_2m.flat():[];

       tmpArr?.map((v,j)=>{
            if(j==23 || j==47 || j==71 || j==95 || j==119){
                tempP=tempP+v;
                tempCrdtem.push({day:moment(tempe?tempe.hourly.time[j]:new Date()).format('dd'),temp:tempP/24})
                tempP=0;
            }else{
                tempP=tempP+v
            }
            
        })
        
        let sumtem=0;
        tempCrdtem.map((v)=>{
            sumtem+=v.temp;
        })
        //llevar latemperatura a grador C
    //     sumtem=grade=='F'?((sumtem-32)*5/9) /5:sumtem/5

    //    settempertureStble(sumtem)
    //     console.log("Temperatura....2.",tempertureStble,"----",grade)

        if( tempertureStble<30){
            setcolor("#023047")
        }else{
            setcolor("#FFB703")
        }

     let cardTem:card={city:carvValue.name,n:carvValue.latitude,w:carvValue.longitude,temp:tempCrdtem};
     setcar(cardTem)
    
}
        return(
            <div className="card" style={{background:color}}>
                    <div className='row' style={{marginTop:"1rem"}}>
                          <div className='col' style={{width:"45%",fontSize:50,color:tempertureStble<30?"#8ECAE6":"#FB8500"}}>
                            <div style={{marginLeft:"1rem"}}>
                                    {
                                        tempertureStble>30&&(
                                            <i className="wi wi-day-sunny" ></i>
                                        )
                                    }
                                    {
                                        tempertureStble<30&&(
                                            <i className="wi wi-cloud" ></i>
                                        )
                                    }
                            </div>
                                
                            </div>
                          <div className='col' style={{width:"55%"}}>
                            <div className='row'> <h2>{car?.city}</h2></div>
                            <div className='row'>{car?.n.toFixed(4)+"°N ,"+car?.w.toFixed(4)+"°W"}</div>
                          </div>
                    </div>
                    <div className='row'>
                        
                        <div className='dayscontent'>
                        {
                            car?.temp.map((t,i)=>{
                                return(
                                    <div key={i}>
                                        <p style={{fontSize:20}}>{t.day}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                     
                    </div>
                    <div className='row' style={{marginTop:"-2rem"}}>
                            
                    <div className='dayscontent'>
                        {
                            car?.temp.map((t,i)=>{
                                return(
                                    <div key={i}>
                                        <p style={{fontSize:15}}>{t.temp.toFixed(0)+"°"}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>

                    <div style={{width:"100%",display:'flex',flexDirection:'column',justifyContent:'center'}}>
                            <button onClick={()=>{}}>eliminar</button>
                    </div>
            </div>
        )
  
}


export default CardWather;

