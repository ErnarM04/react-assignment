import React from 'react';
import './CatsCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CatsCard(cat) {

    return (
        <div className='card'>
            <img src={cat.image_link} alt={cat.name}/>
            <div className='card__bottom'>
                <h3 className='title'>{cat.name}</h3>
                <p className='text'>
                    Origin: {cat.origin}<br></br>                 
                    Length: {cat.length}<br></br>
                    Min. Life Expectancy: {cat.min_life_expectancy} years<br></br>
                    Max. Life Expectancy: {cat.max_life_expectancy} years
                </p>   
            </div>
        </div>
    );

}

export default CatsCard;