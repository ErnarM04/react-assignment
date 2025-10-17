import { useState, useEffect } from 'react';
import CatsCard from './CatsCard';
import './CatsList.css'

function CatsList() {

    const [cats, setCats] = useState(null);
    const [filtered, setFilteredCats] = useState(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        fetch('https://api.api-ninjas.com/v1/cats?name=a',
            {
                method: 'GET',
                headers: new Headers({
                    'X-Api-Key': '2iHq7eP9412jDfWBYtV7nAXFQkvoXoA78IVuzum0',
                }),
            }
        )
        .then(response => response.json())
        .then(json => {
            setCats(json);
            setFilteredCats(json);
        })
        .catch(error => console.error(error));
    }, []);

    function inputChangeHandler(e){
        setValue(e.target.value);
        filterCats(e.target.value);
    }

    function filterCats(title){
        console.log(title)
        setFilteredCats(cats.filter(cat => cat.name.toLowerCase().includes(title)));
    }

    function clearFilter(){
        setValue("");
        filterCats("");
    }

    return (
        <div>
            <div className='search'>
                <input type='text' className='search-input' value={value} onChange={inputChangeHandler}></input>
                <button className='clear' onClick={clearFilter}>Clear</button>
            </div>
            <ul>{filtered ? filtered.map(cat => <li key={cat.name}>{CatsCard(cat)}</li>) : "Loading..."}</ul>
        </div>
    );

}

export default CatsList;