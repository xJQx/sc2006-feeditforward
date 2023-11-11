import React from "react";
import { useNavigate } from "react-router-dom";

function MenuItem({image,name,time,distance}:any) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/hawker/listings");
    }

    return(
        <button onClick={handleClick}>
            <div className="menuItem">
            <div style={{backgroundImage: `url(${image})`}}></div>
            <div className="menuText">
            <p>{name}</p>
            <p className='timedistance'>{time} {distance}</p>
            </div>
        </div>
        </button>
    )
}

export default MenuItem;