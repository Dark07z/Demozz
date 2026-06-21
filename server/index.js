const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const ProductModel = require('./models/Product');
const WProductModel = require('./models/Women');
const KProductModel = require('./models/Kids');
const registerVNPayRoutes = require('./vnpay');


const app = express();
app.use(express.json());
app.use(cors());

registerVNPayRoutes(app);

mongoose.connect('mongodb://127.0.0.1:27017/NikeDB');

app.post('/check-email', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ exists: false, message: 'Email is required' });
    }
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ exists: true, message: 'Email found' });
            } else {
                res.json({ exists: false, message: 'Email not found' });
            }
        })
});

app.post('/register', (req, res)=>{
    const { firstName, surname, email, password, shoppingPreference, dateOfBirth } = req.body;
    if (!firstName || !surname || !email || !password || !shoppingPreference || !dateOfBirth) {
        return res.status(400).json('All fields are required');
    }
    FormDataModel.findOne({email: email})
    .then(user => {
        if(!user){
            FormDataModel.create({ firstName, surname, email, password, shoppingPreference, dateOfBirth })
            .then(nike_account => res.json(nike_account))
        }
    })
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                res.json({
                    status: "Success",
                    user: {
                        firstName: user.firstName || "",
                        surname: user.surname || "",
                        email: user.email || ""
                    }
                });
            }
            else{
                res.json("Wrong password");
            }
        }
    })
    .catch(err => res.status(500).json(err))
})

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");

});

app.get('/women', async (req, res) => {
    try {
        const { gender, category, sale, priceMin, priceMax } = req.query;
        const q = {};
        if (gender) q.gender = gender;
        if (category) q.category = category;
        if (sale !== undefined) q.sale = sale === 'true';
        if (priceMin || priceMax) q.price = {};
        if (priceMin) q.price.$gte = Number(priceMin);
        if (priceMax) q.price.$lte = Number(priceMax);

        const products = await WProductModel.find(q).lean();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/kids', async (req, res) => {
    try {
        const { gender, category, sale, priceMin, priceMax } = req.query;
        const q = {};
        if (gender) q.gender = gender;
        if (category) q.category = category;
        if (sale !== undefined) q.sale = sale === 'true';
        if (priceMin || priceMax) q.price = {};
        if (priceMin) q.price.$gte = Number(priceMin);
        if (priceMax) q.price.$lte = Number(priceMax);

        const products = await KProductModel.find(q).lean();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const { gender, category, sale, priceMin, priceMax } = req.query;
        const q = {};
        if (gender) q.gender = gender;
        if (category) q.category = category;
        if (sale !== undefined) q.sale = sale === 'true';
        if (priceMin || priceMax) q.price = {};
        if (priceMin) q.price.$gte = Number(priceMin);
        if (priceMax) q.price.$lte = Number(priceMax);

        const products = await ProductModel.find(q).lean();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});