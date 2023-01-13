export function onTextChange(event:any){
    return event.target.value;
}

export function fahToCelcius(value:number){
    return (value-32)*5/9;
}


export const iconTrash=(height:number,width:number)=><svg width={width} height={height}viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37 8.46165C30.34 7.82915 23.64 7.50331 16.96 7.50331C13 7.50331 9.04 7.69498 5.08 8.07831L1 8.46165M12 6.52581L12.44 4.01498C12.76 2.19415 13 0.833313 16.38 0.833313H21.62C25 0.833313 25.26 2.27081 25.56 4.03415L26 6.52581M32.7 14.5183L31.4 33.8191C31.18 36.8283 31 39.1666 25.42 39.1666H12.58C7 39.1666 6.82 36.8283 6.6 33.8191L5.3 14.5183M15.66 28.625H22.32M14 20.9583H24" stroke="#DCDFE0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
