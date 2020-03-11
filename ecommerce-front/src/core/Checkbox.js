import React, {useState, useEffect} from 'react';


const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
    // return the first index or -1
       const currentCategoryId = checked.indexOf(c);
       const newCheckedCategoryId = [...checked]
    // if currently checked was not already in checked state - push
    // wlse pull/take of
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId)
        }

        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId)
    }

    console.log("categories: ", categories);

    return categories === [] ? (
        <div>
          No trees or no internet connection
        </div>
    ) : (
        categories.map((c, i) =>  (
               <li key={i} className="list-unstyled">
                   <input onClick={handleToggle(c._id)} type="checkbox" value={checked.indexOf(c._id === -1)} className="form-check-input" />
                   <label className="form-check-label">{c.name}</label>
               </li>
        ))
    )



};

export default Checkbox;



// return categories && categories.map((c, i) =>  (
//        <li key={i} className="list-unstyled">
//            <input onClick={handleToggle(c._id)} type="checkbox" value={checked.indexOf(c._id === -1)} className="form-check-input" />
//            <label className="form-check-label">{c.name}</label>
//        </li>
// ));
