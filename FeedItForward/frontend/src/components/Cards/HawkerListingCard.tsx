import React from "react";
import { useNavigate } from "react-router-dom";

function HawkerItem({image,name,quantity}:any) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/hawker/listings");
    }

    return(
        <button onClick={handleClick}>
            <div className="hawkerItem">
                <div style={{backgroundImage: `url(${image})`}}></div>
                <div className="hawkerText">
                    <p style={{paddingTop: "2px"}}>{name}</p>
                    <p className='timedistance' style={{fontSize:".8rem", color:"lightgrey"}}>1pc</p>
                </div>
            </div>
        </button>
    )
}

export default HawkerItem;