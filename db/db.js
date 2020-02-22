
const fs = require('fs');
products = require('./products.json')

const writeFileAsync = async ()  => {
        const stringifiedData = JSON.stringify(products);
          await fs.writeFile('./db/products.json', stringifiedData,{encoding:'utf8',flag:'w'}, (error) => {
                if (error) {
                console.log('Async Write: NOT successful!');
                console.log(error);
                } else {
                console.log('Async Write: successful!');
                }
        });
};

exports.writeFileAsync=writeFileAsync;
exports.products=products;

