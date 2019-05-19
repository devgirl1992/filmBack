const {customerSchema, validateCustomer} = require('../models/customerSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



const Customer = mongoose.model('Customer', customerSchema)


//get
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers)
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("this Genre Not Exist");

    res.send(customer)

});


//put
router.put('/:id', async (req,res)=> {

    const result  = validateCustomer(req.body);
    if (result.error) return res.status(400).send("Please try for correct name");

    const customer = await  Customer.findByIdAndUpdate(req.params.id,
        { name: req.body.name,
           phone: req.body.phone,
           isGold: req.body.isGold}, { new: true })
    if(!customer) return res.status(404).send("this customer Not Exist");

    res.send(customer)
});


//delete
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if(!customer) return res.status(404).send("this customer Not Exist");

    res.send(customer);
});


//post
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send("Please try for correct name");

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isgold: req.body.isGold
    })
    customer = await customer.save();

    res.send(customer)
})



module.exports = router;