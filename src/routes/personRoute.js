const express = require('express')

const Person = require('../models/personModels')

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        res.status(200).render('pages/person-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/create-person', async (req, res)=>{
    try{
        res.status(200).render('pages/create-person')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.post('/create-person', async (req, res)=>{
    let { person } = req.body
    res.status(200)
    try{
        // res.status(200).render('pages/general-list')
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