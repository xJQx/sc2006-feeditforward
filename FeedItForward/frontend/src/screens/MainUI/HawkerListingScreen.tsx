import React from "react";
import {MenuList} from '../../data/MenuList';
import "../../styles/HawkerListing.css";
import HawkerItem from '../../components/Cards/HawkerListingCard';



export const HawkerListingScreen = () => {
  return (
    <div>
      <div className="backgroundimage">
    </div>
    <div className="hawkerListingCard">
      <h1 style={{fontSize:"1.8rem", padding:"8px"}}><b>BBQ Restaurant</b></h1>
      <div style={{display:"flex",justifyContent:"space-around", borderBottom:"1px solid lightgrey",padding:"3px", fontSize:".95rem"}}>
        <p>⭐️4.8(136) •</p>
        <p>Ratings and reviews</p>
      </div>
      <h1 style={{textAlign:"left"}}>🌐️ Menu Language</h1>
    </div>
    <div style={{padding:"10px"}}>
      <div className='hawkerList' style={{position:"relative", top:"-90px", display:"grid",gridAutoColumns:"1fr 1fr", gridGap:"50px", gridRowGap:"60px"}}>
        {MenuList.map((menuItem, key) => {
          return <HawkerItem
            key={key}
            image={menuItem.image}
            name={menuItem.name}
            time={menuItem.time}
            distance={menuItem.distance} />
          })}
        </div>
          <p style={{fontSize:"1.5rem", position: "relative", top:"-30px"}}>Reviews <span style={{fontSize:".9rem"}}>(8)</span></p>
          <div style={{display:"flex",marginBottom: "10px"}}>
            <div className="reviewImg"></div>
            <div style={{height: "50px", width: "inherit", padding: "2px 10px 2px 10px"}}>
              <h1 style={{fontSize:"1.2rem"}}><b>Alex Tan</b></h1>
              <p style={{fontSize:".7rem"}}>Delicious food. 10/10. Would definitely...</p>
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div className="reviewImg"></div>
            <div style={{height: "50px", width: "inherit", padding: "2px 10px 2px 10px"}}>
              <h1 style={{fontSize:"1.2rem"}}><b>Alex Tan</b></h1>
              <p style={{fontSize:".7rem"}}>Delicious food. 10/10. Would definitely...</p>
            </div>
          </div>
        </div>
  </div>
  );
};
