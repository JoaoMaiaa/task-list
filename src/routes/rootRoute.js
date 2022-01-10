const express = require('express')

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        res.status(200).render('pages/index')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/contact', async (req, res)=>{
    try{
        res.status(200).render('pages/contact')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/general-list', async (req, res)=>{
    try{
        res.status(200).render('pages/general-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

module.exports = router