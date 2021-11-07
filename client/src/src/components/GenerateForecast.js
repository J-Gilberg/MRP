import axios from 'axios';

class GenerateForecast {

    generateForecast(inputs) {
        let data = [];
        id = null, start = null, end = null
        if (!start || !end) {
            throw new HttpException(404, 'Enter Start Date & End Date for forecast');
        }
        if (inputs.hasOwnProperty('product_id')) {
            data = axios.get(`http://localhost:3331/api/calcs/one`, inputs)
        }
        // else{
        //     data = axios.get(`http://localhost:3331/api/calcs/all`, inputs)
        // }
        let a = 0;
        let b = 0;
        data.forEach((dp, idx) => {
            a = ((dp.ysum * dp.xsqrsum) - (dp.xsum * dp.xysum)) / ((dp.n * dp.xsqrsum) - (dp.xsum * dp.xsum));
            b = ((dp.n * dp.xysum) - (dp.xsum * dp.ysum)) / ((dp.n * dp.xsqrsum) - (dp.xsum * dp.xsum));
            console.log(`a: ${a}`);
            console.log(`b: ${b}`);
            outputs.push({a: a, b: b});
        });

        return outputs;
    }



}
module.exports = new GenerateForecast;