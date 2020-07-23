import React, { useState, useEffect, Fragment} from "react";

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0);
    const handleChange =(event) => {
        console.log("event.target.value: ", event.target.value);
        handleFilters(event.target.value);
        setValue(event.target.value);
    }

    return prices.map((p, i) =>  (
           <div key={i}>
               <input onClick={handleChange} type="radio" name={p} value={`${p._id}`} className="mr-2 ml-4" />
               <label className="form-check-label">{p.name}</label>
           </div>
   ));
}

export default RadioBox;
