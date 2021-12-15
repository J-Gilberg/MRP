import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { generateCREquation } from './components/GenerateForecast';


const Planning = () => {
    const [productId, setProductId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRange, setDateRange] = useState([]);
    const [productData, setProductData] = useState({}); //{order: [], purchase: [], planned_purhcase: [], forecast: []}
    const [equation, setEquation] = useState();

    const [error, setError] = useState('');
    useEffect(() => {
    }, []);


    const getData = (e) => {
        if (!productId && !startDate && !endDate) {
            //need to add error logic.
            
            setEquation(generateCREquation({ start: startDate, end: endDate, product_id: productId }))
            axios.get(`http://localhost:3331/api/planning/one`, { headers: inputs })
                .then((res) => { setProductData(res) })
                .catch((err) => { setError(err) });
        }
    }
    return (
        <div>
            <h1>Planning</h1>
            <div className='cellsContainer'>
                <div>
                    <h2>Enter Product Id</h2>
                    <div>
                        <h1>{error}</h1>
                        <form onSubmit={getData}>
                            <input type="number" name='productId' onChange={(e) => { setProductId(e.target.productId) }} />
                            <input type="date" name='start' onChange={(e) => { setStartDate(e.target.start) }} />
                            <input type="date" name='end' onChange={(e) => { setEndDate(e.target.end) }} />
                            <input type="submit" name='submit' value='Submit' />
                        </form>
                    </div>
                </div>
                <div id='date' className='cellRows'>
                    {dateRange.map((item, idx) => {
                        <h2>{item.toString()}</h2>

                    })}
                    <div id='actualSales' className='cellRows'>
                        {productData.forecast.map((item, idx) => {

                        })}
                    </div>

                    <div id='plannedSales' className='cellRows'>
                        {productData.forecast.map((item, idx) => {

                        })}
                    </div>

                    <div id='actualPurchases' className='cellRows'>
                        {productData.forecast.map((item, idx) => {

                        })}
                    </div>

                    <div id='plannedPurchases' className='cellRows'>
                        {productData.forecast.map((item, idx) => {

                        })}
                    </div>
                    
                </div>

            </div>
        </div>
    )

}
export default Planning;