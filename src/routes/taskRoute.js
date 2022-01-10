const express = require('express')

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        res.status(200).render('pages/task-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/create-task', async (req, res)=>{
    try{
        res.status(200).render('pages/create-task')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/edit-task', async (req, res)=>{
    try{
        res.status(200).render('pages/edit-task')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

module.exports = router