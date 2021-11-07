import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const Planning = () =>{
    const [itemData, setItemData] = useState([])
    return (
        <div>
            <h1>Planning</h1>
            <div className='cellsContainer'>
                itemData.map(()
                <div id='actualSales' className='cellRows'> 
                    
                </div>

                <div id='plannedPurchases' className='cellRows'>
                    
                </div>
                
                <div id='actualPurchases' className='cellRows'> 
                
                </div>

                <div id='plannedPurchases' className='cellRows'> 
                
                </div>
                )
            </div>
        </div>
    )

}
export default Planning;