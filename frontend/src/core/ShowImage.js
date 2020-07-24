import React from 'react';
import {API} from '../config'

const ShowImage = ({item, url}) => {
    return (
        <div className="search-product-img-container">
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name}
            className="mb-3" style={{height: "100%", width: "100%", objectFit: "cover"}}/>
        </div>
    )
}


export default ShowImage;
