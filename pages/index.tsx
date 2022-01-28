import { useEffect,useState,useRef, useCallback, MutableRefObject} from "react"
import { getExhibitionApi } from "../request/apirequest"
import Header from "../components/basic/header"
import Card from "../components/basic/card"
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import axios from "axios"
import { INDIVIDUAL_EXHIBITION_PAGE } from "../helpers/constant";

import { GetServerSideProps } from 'next'
const Home  = ({data = []}) =>  {
    const [exhibitionList,setExhibitionList] = useState<Array<object>>(data);
    const [pageLimit,setPageLimit] = useState(20);
    const [loading,setLoading] = useState(false);
   
    // useEffect(() => {
    //  try{ 
    //     setLoading(true);
    //     axios.get(`https://api.artic.edu/api/v1/exhibitions?limit=${pageLimit}`)
    //     .then((res) => {
    //         setExhibitionList(res?.data?.data)
    //         setLoading(false);
    //     })
    //     .catch((err) => {
    //         return err
    //     })
        
    //   }catch(e){
    //       console.log(e);
          
    //   }
      
    
     
    // },[])
    useEffect(() => {
        try{ 
          
           axios.get(`https://api.artic.edu/api/v1/exhibitions?limit=${pageLimit}`)
           .then((res) => {
               setExhibitionList(res?.data?.data)
              
           })
           .catch((err) => {
               return err
           })
           
         }catch(e){
             console.log(e);
             
         }
         
       
        
       },[pageLimit])

    return (
       <div>
           <Header/>
           {loading && <div className="loading">Loading exhibitions...</div>}
           {!loading && 
            <InfiniteScroll
            dataLength={exhibitionList.length}
            next={() => setPageLimit(pageLimit => pageLimit + 20)}
            hasMore={true}
            loader={<h4 className="loading">Loading more exhibitions...</h4>}
          >
           <div className="card">
               
           {exhibitionList.map((a,i) => {
              
                return (
                    <Link href={`${INDIVIDUAL_EXHIBITION_PAGE}/${i + 1}`}>
                    <div key={i} >
                    <Card  value={a} />
                    </div>
                    </Link>
               )
               
              
           })}
         
            </div>
            </InfiniteScroll>
        }           
       </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await axios.get(`https://api.artic.edu/api/v1/exhibitions?limit=20`)
   
    
  // ...
  return {
    props: {data : data?.data?.data}, // will be passed to the page component as props
  }
}


export default Home