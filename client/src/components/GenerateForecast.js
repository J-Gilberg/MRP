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
                let X = []; //Matrix of 1,x,x2,x3
                let y = 0; //y calc bases of order_unix start moving y to = 0
                let XTX = [[], [], [], []]; //result of XT * X (XT is the transpose of X row = col, col = row)
                let XTY = [] //result of XT * Y (XT is the transpose of X row = col, col = row)
                let D = 0; //determinant
                let DD = 0; //1/D
                let MM = []; //matrix of minors
                let XTXinv = [] //Inverse of XTX
                let temp = [];
                let i = 0;
                let j = 0;
                let coefficients = [0, 0, 0, 0];

                data.forEach((dp, idx) => {
                    X.push([1, dp.quantity, dp.xsqr, dp.xcube])
                });
                console.log(X);
                for (let i = 0; i < 4; i = i + 3) {
                    for (let j = 0; j < X.length; ++j) {
                        if (i === 0) {
                            if (!temp.length) {
                                temp.push(X[j][i] * X[j][0]);
                                temp.push(X[j][i] * X[j][1]);
                                temp.push(X[j][i] * X[j][2]);
                                temp.push(X[j][i] * X[j][3]);
                            } else {
                                temp[0] += X[j][i] * X[j][0];
                                temp[1] += X[j][i] * X[j][1];
                                temp[2] += X[j][i] * X[j][2];
                                temp[3] += X[j][i] * X[j][3];
                            }
                        } else {
                            if (!temp.length) {
                                temp.push(X[j][i] * X[j][1]);
                                temp.push(X[j][i] * X[j][2]);
                                temp.push(X[j][i] * X[j][3]);
                            } else {
                                temp[0] += X[j][i] * X[j][1];
                                temp[1] += X[j][i] * X[j][2];
                                temp[2] += X[j][i] * X[j][3];
                            }
                        }
                    }
                    if (i === 0) {
                        XTX[i] = [...XTX[i], ...temp];
                        XTX[i + 1] = [...XTX[i + 1], ...temp.slice(i + 1, temp.length)];
                        XTX[i + 2] = [...XTX[i + 2], ...temp.slice(i + 2, temp.length)];
                        XTX[i + 3] = [...XTX[i + 3], ...temp.slice(i + 3, temp.length)];
                    } else {
                        XTX[i] = [...XTX[i], ...temp];
                        XTX[2] = [...XTX[2], ...temp.slice(0, 2)];
                        XTX[1] = [...XTX[1], ...temp.slice(0, 1)];
                    }
                    temp = [];
                }
                console.log(XTX);
                //determinant of 3X3 matrix |A| = a(ei − fh) − b(di − fg) + c(dh − eg)
                //A =   abc
                //      def
                //      ghi


                XTX.forEach((row, idx) => {
                    MM.push([]);
                    XTX[idx].forEach((dp, jdx) => {

                        i = 0;
                        j = 0;
                        while (i < XTX.length) {
                            if (i === idx) {
                                ++i;
                            }
                            if (j === jdx) {
                                ++j;
                            }
                            if (j < XTX.length && i < XTX.length) {
                                temp.push(XTX[i][j]);
                                // console.log(`temp ${temp}`);
                                // console.log(`j ${j}`);
                                // console.log(`i ${i}`);
                                ++j;
                            } else {
                                j = 0;
                                ++i;
                            }
                        }
                        MM[idx].push((temp[0] * (temp[4] * temp[8] - temp[5] * temp[7]) - temp[1] * (temp[3] * temp[8] - temp[5] * temp[6]) + temp[2] * (temp[3] * temp[7] - temp[4] * temp[6])) * ((idx + jdx) % 2 === 0 ? 1 : -1));
                        // console.log(`idx: ${idx}, jdx: ${jdx}`)
                        temp = [];
                    })
                })
                // Adjugate (also called Adjoint) swap col/row idx
                i = 0;
                j = 0;
                while (i < MM.length) {
                    [MM[i][j], MM[j][i]] = [MM[j][i], MM[i][j]];
                    if (j + 1 >= MM.length) {
                        ++i;
                        j = i;
                    } else {
                        ++j;
                    }
                }
                console.log(MM);
                // //Determinant calc hard coded for now will work this into a algo later
                D = XTX[0][0] * XTX[1][1] * XTX[2][2] * XTX[3][3] - XTX[0][1] * XTX[1][0] * XTX[2][2] * XTX[3][3] + XTX[0][2] * XTX[1][0] * XTX[2][1] * XTX[3][3]
                    - XTX[0][0] * XTX[1][2] * XTX[2][1] * XTX[3][3] + XTX[0][1] * XTX[1][2] * XTX[2][0] * XTX[3][3] - XTX[0][2] * XTX[1][1] * XTX[2][0] * XTX[3][3]
                    + XTX[0][2] * XTX[1][1] * XTX[2][3] * XTX[3][0] - XTX[0][1] * XTX[1][2] * XTX[2][3] * XTX[3][0] + XTX[0][3] * XTX[1][2] * XTX[2][1] * XTX[3][0]
                    - XTX[0][2] * XTX[1][3] * XTX[2][1] * XTX[3][0] + XTX[0][1] * XTX[1][3] * XTX[2][2] * XTX[3][0] - XTX[0][3] * XTX[1][1] * XTX[2][2] * XTX[3][0]
                    + XTX[0][3] * XTX[1][0] * XTX[2][2] * XTX[3][1] - XTX[0][0] * XTX[1][3] * XTX[2][2] * XTX[3][1] + XTX[0][2] * XTX[1][3] * XTX[2][0] * XTX[3][1]
                    - XTX[0][3] * XTX[1][2] * XTX[2][0] * XTX[3][1] + XTX[0][0] * XTX[1][2] * XTX[2][3] * XTX[3][1] - XTX[0][2] * XTX[1][0] * XTX[2][3] * XTX[3][1]
                    + XTX[0][1] * XTX[1][0] * XTX[2][3] * XTX[3][2] - XTX[0][0] * XTX[1][1] * XTX[2][3] * XTX[3][2] + XTX[0][3] * XTX[1][1] * XTX[2][0] * XTX[3][2]
                    - XTX[0][1] * XTX[1][3] * XTX[2][0] * XTX[3][2] + XTX[0][0] * XTX[1][3] * XTX[2][1] * XTX[3][2] - XTX[0][3] * XTX[1][0] * XTX[2][1] * XTX[3][2];
                console.log(D);
                // //because coordinates start at 0 negatives are at evens not odds.
                DD = 1 / D;
                MM.forEach((i, idx) => {
                    XTXinv.push([])
                    MM[idx].forEach((dp, jdx) => {
                        XTXinv[idx].push(DD * dp);
                    })
                })
                //XT*y
                console.log(XTXinv);
                XTXinv.forEach((row, idx) => {
                    XTY.push([])
                    X.forEach((dp,jdx)=>{
                        XTY[idx].push((XTXinv[idx][0] * X[jdx][0]) + (XTXinv[idx][1] * X[jdx][1]) + (XTXinv[idx][2] * X[jdx][2]) + (XTXinv[idx][3] * X[jdx][3]));
                    })
                })
                console.log(XTY);
                data.forEach((dp,idx)=>{
                    y = dp.order_unix - data[0].order_unix;
                    console.log(y)
                    coefficients[0] += XTY[0][idx] * y;
                    coefficients[1] += XTY[1][idx] * y;
                    coefficients[2] += XTY[2][idx] * y;
                    coefficients[3] += XTY[3][idx] * y;
                })
                console.log(coefficients);
                return coefficients;
            })
            .catch((error) => {
                return error;
            });
    }

    //β = (XTX)-1XTy


}