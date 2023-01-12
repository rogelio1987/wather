export type city={
    admin1:string,
    admin1_id:number,
    admin3:string,
    admin3_id:number,
    admin4:string,
    admin4_id:number,
    country:string,
    country_code:string,
    country_id:number,
    elevation:number,
    feature_code:string,
    id:number,
    latitude: number,
    longitude:number,
    name:string,
    population: number,
    postcodes: Array<number>,
    timezone:string
}

export type card={
    city:string,
    n:number,
    w:number,
    temp:tempCar
}

export type tempCar=Array<{day:string,temp:number}>

export type temp={
    elevation: number,
    generationtime_ms:number,
    hourly: { time:Array<string>, temperature_2m: Array<number> },
​    hourly_units: { time: string, temperature_2m: string },
    latitude:number,
    longitude: number,
    ​timezone: string,
​   timezone_abbreviation:string,
​   utc_offset_seconds:number
}



