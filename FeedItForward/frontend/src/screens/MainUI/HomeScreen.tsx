import React, {useState} from 'react';
import {MenuList} from '../../data/MenuList';
import MenuItem from '../../components/Cards/HawkerCard';
import "../../styles/HomeScreen.css";
import Button from '@mui/material/Button';
import { colors } from '@mui/material';
import { SearchBar } from '../../components';
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const handleSearch = (searchKey:any) => {
    // Implement your search functionality here using the searchKey.
    // You can perform an API call, update state, or trigger any desired action.
    console.log("Search key: " + searchKey);
  };
  const handleHawkerListing = () => {
    // Handle Hawker Listing Screen
    navigate("/HawkerListingScreen")
  }

  return ( 
    <div className='home'>
      <h1 className='title'>Hawker</h1>
      <div className='search'>
      <SearchBar
        searchItemPlaceholder="Hawkers"
        handleSearch={handleSearch}
        className="custom-search"
      />
      </div>
      <div className='delivery'>
      <Button variant="outlined" size="small" style={{background: "lightblue", color: "black"}}>
      <label>Delivery</label>
      </Button>
      <Button style={{background: "lightgrey", color: "white"}}>
      <label>Self Pickup</label>
      </Button>
      </div>
      <div className='button-container'>
      <Button style={{display: "flex", flexDirection: "column"}}>
      <img src="/nearby.png"/>
      <label>Nearby</label>
      </Button>
      <Button style={{display: "flex", flexDirection: "column"}}>
      <img src="halal.png"/>
      <label>Halal</label>
      </Button>
      <Button style={{display: "flex", flexDirection: "column"}}>
      <img src="japanese.png"/>
      <label>Japanese</label>
      </Button>
      <Button style={{display: "flex", flexDirection: "column"}}>
      <img src="topicks.png"/>
      <label>Top Picks</label>
      </Button>   
      </div>
      <div className='menu'>
        <h1 className='viewall'>View All</h1>
        <div className='menuList'>
          {MenuList.map((menuItem, key) => {
            return <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              time={menuItem.time}
              distance={menuItem.distance} />
            })}
        </div>
      </div>
    </div>
  );
};