import React from 'react'
import "./HotelList.css"
export default function TripDetails() {
     const tabs = [{
    title:"Hotel List"
  },
{
    title:"Itinerary"
  },
  {
    title:"Must Visit"
  },
  {
    title:"Recommendations"
  }];
    // const tabs = ["Hotel List", "Itinerary", "Must Visit", "Recommendations", "Weather Precautions"];
  return (
    <div className='h-full w-full flex justify-evenly items-center bg-rgba(15, 23, 42, 0.8) p-9'  style={{background:"#101b2b"}}>
      {tabs.map((tab,index)=><button  className=' cta-button h-fit w-fit bg-blue-400 p-8 ' style={{fontSize:"1.6rem", borderRadius:"1rem", fontWeight:"700"}}>{tab.title}</button>)}
    </div>
  )
}
