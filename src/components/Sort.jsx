import { useState } from 'react';

function Sort({ selectedSort, sortAlternative }) {
    const [dropDown, setDropDown] = useState(false); //false = visar inget

    function toggleAlternative() {
        setDropDown((prev) => !prev); //ändrar till det prev inte är
    }

    function sort(value) {
        selectedSort(value); //skickar iväg vilket sort det är och ändrar sort id
        setDropDown(false); //sätter så att den inte visar något
    }

    return ( 
        <div id="sort-container"> 
            <div onClick={toggleAlternative}id="sort"> 
                {sortAlternative} 
            </div>
            {dropDown && ( //ifall den är false visar den inget
                <div id="drop-down">
                    <p onClick={() => sort("A-Z")} className="sort-option">A-Z</p>
                    <p onClick={() => sort("Birthday")} className="sort-option">Birthday</p>
                    <p onClick={() => sort("Age")} className="sort-option">Age</p>
                </div>
            )}
        </div>
    );
}

export default Sort;
