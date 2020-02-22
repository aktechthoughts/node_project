const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db');

//Get One



router.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let productFound;

    if (db.products.length==0){
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'Success',
            message: 'product data found',
            data: {}
        })
    }


    db.products.map((product) => {
        if (product.productId === id) {
            productFound = product;
        }
    });

    if (productFound) {
        return res.status(200).send({
            statusCode: res.statusCode,
            status: 'Success',
            message: 'product data found',
            data: productFound

        });
    } else {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'Failure',
            message: 'the product doesn’t exist',
            data: {}
        });
    }

 

});


// Get All
router.get('/products', (req, res) => {
    
    if (db.products.length>0){
        res.status(200).send({
        statusCode: res.statusCode,
        status: 'Success',
        message: 'all product data',
        data: db.products
        })
    }
    else
    {
        res.status(400).send({
            statusCode: res.statusCode,
            status: 'Failure',
            message: 'no record found',
            data: db.products
        })
    }
});



// Add
router.post('/product', (req, res) => {
    const id = parseInt(req.body.productId,10);
    let productFound;
    let itemIndex;

    db.products.map((products, index) => {
        if (products.productId === id) {
            productFound = products;
            itemIndex = index;
        }
    });

    if (productFound) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'same product already exists ',
            data: {}
        })
    }
    else if (!req.body.productName) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'productName is required',
            data: {}
        })
    } else if (!req.body.productCode) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'productCode is required',
            data: {}
        })
    } else if (!req.body.releaseDate) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'releaseDate is required',
            data: {}
        })
    } else if (!req.body.description) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'description is required',
            data: {}

        })
    } else if (!req.body.price) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'price is required',
            data: {}

        })
    } else if (!req.body.starRating) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'starRating is required',
            data: {}
        })
    } else if (!req.body.imageUrl) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'imageUrl is required',
            data: {}
        })
    }

    const product = {
        "productId": id  ,
        "productName": req.body.productName,
        "productCode": req.body.productCode,
        "releaseDate": req.body.releaseDate,
        "description": req.body.description,
        "price": req.body.price,
        "starRating": req.body.starRating,
        "imageUrl": req.body.imageUrl
    }

    db.products.push(product);
    db.writeFileAsync();

    return res.status(201).send({
        statusCode: res.statusCode,
        message: 'product data added successfully',
        status: 'success',
        data: product
    })
});

// Update
router.put('/product/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    let productFound;
    let itemIndex;
    db.products.map((products, index) => {
        if (products.productId === id) {
            productFound = products;
            itemIndex = index;
        }
    });

    if (!productFound) {
        return res.status(400).send({
            statusCode: res.statusCode,
            status: 'Failure',
            message: 'product doesn’t exist',
            data: {}
        });
    }

    const updatedproduct = {
        "productId": productFound.productId || parseInt(req.params.id, 10),
        "productName": req.body.productName || productFound.productName,
        "productCode": req.body.productCode || productFound.productCode,
        "releaseDate": req.body.releaseDate || productFound.releaseDate,
        "description": req.body.description || productFound.description,
        "price": req.body.price || productFound.price,
        "starRating": req.body.starRating || productFound.starRating,
        "imageUrl": req.body.imageUrl || productFound.imageUrl
    }


    db.products.splice(itemIndex, 1, updatedproduct);
    db.writeFileAsync();

    return res.status(200).send({
        statusCode: res.statusCode,
        status: 'Success',
        message: 'product data updated successfully',
        data: updatedproduct

    });
});

router.delete('/product/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let productFound;
    let itemIndex;

    db.products.map((products, index) => {
        if (products.productId === id) {
            productFound = products;
            itemIndex = index;
        }
    });

    if (!productFound) {
        return res.status(404).send({
            statusCode: res.statusCode,
            status: 'failure',
            message: 'the product doesn’t exist',
            data: {}
        });
    } else {
        db.products.splice(itemIndex, 1);
        db.writeFileAsync()

        return res.status(200).send({
            statusCode: res.statusCode,
            status: 'Success',
            message: 'product data removed successfully ',
            data: {}

        });
    }


});

module.exports = router;