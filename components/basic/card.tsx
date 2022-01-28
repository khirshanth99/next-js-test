import React from 'react';
import { dateConvert } from '../../helpers/helpers';
import Image from '../../public/default.jpg';
function card(value:any) {
    const data  = value?.value
  return (
             <div className="card-container">
                 
                 <img  src={data?.image_url === null ?   Image.src  :  data?.image_url }/>
                 <div className="card-description">
                     <span>{data?.title}</span>
                     <span>{dateConvert(data?.aic_start_at)} -  {dateConvert(data?.aic_end_at)}</span>
                 </div>
             </div>
  )
    
}

export default card;
