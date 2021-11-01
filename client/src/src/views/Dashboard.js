import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const Dashboard = () =>{
    const history = useHistory();

    const onClickHandler = (num) =>{
        let links = ['dashboard', 'criticalitems', 'planning', 'receiving', 'analyze']
        history.push('/')

    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )

}
export default Dashboard;