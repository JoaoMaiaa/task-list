const express = require('express')
const Persons = require('../models/personModels')

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        res.status(200).render('pages/index')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível a página principal' })
    }
})

router.get('/general-list', async (req, res)=>{
    try{
        let persons = await Persons.find({})
        res.status(200).render('pages/general-list', { persons: persons })
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não há nenhuma lista' })
    }
})

router.get('/contact', async (req, res)=>{
    try{
        res.status(200).render('pages/contact')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar a página contato' })
    }
})

module.exports = router