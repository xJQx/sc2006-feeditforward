import React from "react";

function MenuItem({image,name,time,distance}:any) {
    return(
        <div className="menuItem">
            <div style={{backgroundImage: `url(${image})`}}></div>
            <p>{name}</p>
            <p className='timedistance'>{time} {distance}</p>
        </div>
    )
}

export default MenuItem;