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

  const handleClick = () => {
    alert("Work In Progress!");
  }

  return ( 
    <div className='home'>
      <h1 className='title'>Hawkers</h1>
      <div className='search'>
      <SearchBar
        searchItemPlaceholder="Hawkers"
        handleSearch={handleSearch}
        className="custom-search"
      />
      </div>
      <div className='delivery'>
      <Button className="buttonResize" variant="outlined" size="small" style={{background: "lightblue", color: "black" , borderRadius: "30px"}}>
      <label>Delivery</label>
      </Button>
      <Button className="buttonResize" style={{background: "lightgrey", color: "white", borderRadius: "30px"}} onClick={handleClick}>
      <label>Self Pickup</label>
      </Button>
      </div>
      <div className='button-container'>
      <Button style={{display: "flex", flexDirection: "column"}} onClick={handleClick}>
      <img src="/nearby.png"/>
      <label>Nearby</label>
      </Button>
      <Button style={{display: "flex", flexDirection: "column"}} onClick={handleClick}>
      <img src="halal.png"/>
      <label>Halal</label>
      </Button>
      <Button style={{display: "flex", flexDirection: "column"}} onClick={handleClick}>
      <img src="japanese.png"/>
      <label>Japanese</label>
      </Button>
      <Button style={{display: "flex", flexDirection: "column"}} onClick={handleClick}>
      <img src="topicks.png"/>
      <label>Top Picks</label>
      </Button>   
      </div>
      <div className='menu'>
        <div className="viewall">
        <Button style={{color: "black"}} onClick={handleClick}>
        <label>View All</label>
        </Button>
        </div>
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