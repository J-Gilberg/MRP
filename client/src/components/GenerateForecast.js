import axios from 'axios';
const HttpException = require('../utils/HttpException.utils');

export const generateLREquation = (inputs) => {
    //generates linear regression equation
    let data = [];
    let outputs = [];
    let start = inputs.start
    let end = inputs.end
    if (!start || !end) {
        throw new HttpException(404, 'Enter Start Date & End Date for forecast');
    }
    if (inputs.hasOwnProperty('product_id')) {
        data = axios.get(`http://localhost:3331/api/calcs/lr/one`, inputs)
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
        outputs.push({ a: a, b: b });
    });

    return outputs;
}

export const generateCREquation = (inputs) => {
    console.log(`inputs: ${inputs.product_id}`);
    //generates cubic regression equation
    //utilized Moore-Penrose pseudoinverse https://www.omnicalculator.com/math/pseudoinverse#how-to-calculate-the-pseudoinverse
    //y = a + bx + cx2 + dx3
    let data = [];
    let start = inputs.start
    let end = inputs.end
    if (!start || !end) {
        throw new HttpException(404, 'Enter Start Date & End Date for forecast');
    }
    if (inputs.hasOwnProperty('product_id')) {

        axios.get(`http://localhost:3331/api/calcs/cr/one`, { headers: inputs })
            .then((res) => {
                console.log(Object.keys(res));
                data = res.data;
                let a = 0;
                let b = 0;
                let c = 0;
                let d = 0;
                let X = [];
                let XTX = [[], [], [], []];
                let tempSum = [];
                let outputs = [];
                data.forEach((dp, idx) => {
                    X.push([1, dp.quantity, dp.xsqr, dp.xcube])
                });
                console.log(X);
                for (let i = 0; i < 4; ++i) {
                    for (let j = 0; j < X.length; ++j) {
                        if (!tempSum.length) {
                            tempSum.push(X[j][i] * X[j][i]);
                            if (i + 1 < 4) tempSum.push(X[j][i] * X[j][i + 1]);
                            if (i + 2 < 4) tempSum.push(X[j][i] * X[j][i + 2]);
                            if (i + 3 < 4) tempSum.push(X[j][i] * X[j][i + 3]);
                        } else {
                            tempSum[i] += X[j][i] * X[j][i];
                            if (i + 1 < 4) tempSum[i + 1] += X[j][i] * X[j][i + 1];
                            if (i + 2 < 4) tempSum[i + 2] += X[j][i] * X[j][i + 2];
                            if (i + 3 < 4) tempSum[i + 3] += X[j][i] * X[j][i + 3];
                        }
                    }
                    console.log(tempSum)
                    XTX[i] = [...XTX[i], ...tempSum];
                    if (i + 1 < 4) XTX[i + 1] = [...XTX[i + 1], ...tempSum.slice(i + 1, tempSum.length)];
                    if (i + 2 < 4) XTX[i + 2] = [...XTX[i + 2], ...tempSum.slice(i + 2, tempSum.length)];
                    if (i + 3 < 4) XTX[i + 3] = [...XTX[i + 3], ...tempSum.slice(i + 3, tempSum.length)];
                    tempSum = []
                }
                console.log(XTX);
                console.log(`a: ${a}`);
                console.log(`b: ${b}`);
                console.log(`a: ${c}`);
                console.log(`b: ${d}`);
                outputs.push({ a: a, b: b, c: c, d: d });

            })
            .catch((error) => {
                console.log(error);
            });

    }

    //β = (XTX)-1XTy


}