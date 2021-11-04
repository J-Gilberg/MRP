import axios from 'axios';

class GenerateForecast{

    generateForecast(id = null, start = null, end = null){
        let data = [];
        
        if(!start || !end){
            throw new HttpException(404, 'Enter Start Date & End Date for forecast');
        }
        if(!id){
            data = axios.get(`http://localhost:3331/api/calcs/all/dates/${start}/${end}`)
        }else{
            data = axios.get(`http://localhost:3331/api/calcs/productid/${id}/dates/${start}/${end}`)
        }
        

    }
    


}
module.exports = new GenerateForecast;