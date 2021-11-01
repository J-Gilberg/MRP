import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const Tabs = () =>{
    const history = useHistory();

    const onClickHandler = (num) =>{
        let links = ['dashboard', 'criticalitems', 'planning', 'receiving', 'analyze']
        history.push('/'+links[num]);
    }

    return (
        <div>
            <div onClick={()=>{onClickHandler(0)}}>
                <h2>Dashboard</h2>
            </div>
            <div onClick={()=>{onClickHandler(1)}}>
                <h2>Critical Items</h2>
            </div>
            <div onClick={()=>{onClickHandler(2)}}>
                <h2>Planning</h2>
            </div>
            <div onClick={()=>{onClickHandler(3)}}>
                <h2>Receiving</h2>
            </div>
            <div onClick={()=>{onClickHandler(4)}}>
                <h2>Analyze</h2>
            </div>



        </div>
    )

}
export default Tabs;