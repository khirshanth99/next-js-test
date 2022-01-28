import React,{useEffect,useState} from 'react';
import Header from "../../components/basic/header";
import axios from "axios";
import {useRouter} from "next/router";
import { dateConvert } from '../../helpers/helpers';
import Image from '../../public/default.jpg';
import Link from 'next/link';
import { GetServerSideProps } from 'next'
function exhibition({data = []}) {
    const router  = useRouter();
    const [exhibitionList,setExhibitionList] = useState<any>(data);
    const [loading, setLoading] = useState(false);
   
    
   
  return  !loading ? <div>
         <Header/>

         <div className="description-section">
             <div>
             <i className='fas fa-arrow-left'></i> <Link href='/'>Back</Link>
             </div>
             <div className="description-header">
                <span>{exhibitionList?.title}</span>
                <span>{dateConvert(exhibitionList?.aic_start_at)} -  {dateConvert(exhibitionList?.aic_end_at)}</span>
             </div>
             <div className="sub-section">
              
                 <img  src={exhibitionList?.image_url === null ?   Image.src  :  exhibitionList?.image_url }/>
               
                 <div>{exhibitionList?.description}</div>
             </div>
         </div>
        </div> : <div>Loading...</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   
    let {id} = context.params
    try{
      const data = await  axios.get(`https://api.artic.edu/api/v1/exhibitions/${id}`)
      console.log(data);
      
      return {
        props: { data : data?.data?.data}, // will be passed to the page component as props
      }
    }catch(e){
      return {notFound : true}
    }
     
     
     
    
  // ...
  
}

export default exhibition;
