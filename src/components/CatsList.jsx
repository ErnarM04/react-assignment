import { useState, useEffect } from 'react';
import CatsCard from './CatsCard';
import './CatsList.css'

function CatsList() {

    const [cats, setCats] = useState(null);

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
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <ul>{cats ? cats.map(cat => <li key={cat.name}>{CatsCard(cat)}</li>) : "Loading..."}</ul>
    );

}

export default CatsList;