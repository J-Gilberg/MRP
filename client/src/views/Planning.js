import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {generateCREquation} from './components/GenerateForecast';


const Planning = () => {
    const [productId, setProductId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [productData, setProductData] = useState([]);
    const [equation, setEquation] = useState();

    const [error, setError] = useState();
    useEffect(() => {
    }, []);


    const getData = (e) => {
        if(!productId && !startDate && !endDate){
            //need to add error logic.
            setEquation(generateCREquation({ start: startDate, end: endDate, product_id: productId }))
            axios.get(`http://localhost:3331/api/orders/one`, { headers: inputs })
                .then((res) => {setProductData(res)})
                .catch((err) => {setError(err)});
        }
    
    }


    return (
        <div>
            <h1>Planning</h1>
            <div className='cellsContainer'>
                <div>
                    <h2>Enter Product Id</h2>
                    <div>
                        <form onSubmit={getData}>
                            <input type="number" name='productId' onChange={(e)=>{setProductId(e.target.productId)}}/>
                            <input type="date" name='start' onChange={(e)=>{setStartDate(e.target.start)}}/>
                            <input type="date" name='end' onChange={(e)=>{setEndDate(e.target.end)}}/>
                            <input type="submit" name='submit' value='Submit'/>
                        </form>
                    </div>
                </div>
                
                <div id='actualSales' className='cellRows'>
                    productData.map(()
                </div>

                <div id='plannedSales' className='cellRows'>

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