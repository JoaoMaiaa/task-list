const express = require('express')

const Persons = require('../models/personModels')

const router = express.Router()

router.get('/', async (req, res)=>{
    let persons = await Persons.find({})
    try{
        res.status(200).render('pages/person-list', { persons: persons })
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/create-person', async (req, res)=>{
    let person = new Persons()
    try{
        res.status(200).render('pages/create-person')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.post('/create-person', async (req, res)=>{
    let { name } = req.body.person
    let persons = await Persons.create({ name })
    try{
        await persons.save()
        console.log("create-person: " + persons)
        res.status(200).redirect('/general-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/edit-person', async (req, res)=>{
    try{
        res.status(200).render('pages/edit-person')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

module.exports = router