exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
    const keys = Object.keys(object);
    const values = Object.values(object);
    columnSet = keys.map(key => `${key} = ?`).join(', ');
    console.log(columnSet);
    console.log(keys);
    return {
        columnSet,
        values
    }
}


exports.multipleColumnSetWithDateRange = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }
    const keys = Object.keys(object);
    const values = Object.values(object);
    let tempArr = [];
    keys.map(key => {
        if(key === 'start'){
            tempArr.push(`order_date >= ?`);
        }else if(key === 'end'){
            tempArr.push(`order_date <= ?`);
        }else{
            tempArr.push(`${key} = ?`);
        }
        });
    let columnSet = tempArr.join(' and ');
    console.log(columnSet);
    console.log(keys);
    return {
        columnSet,
        values
    }
}