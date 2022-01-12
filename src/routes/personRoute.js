const express = require('express')

const Persons = require('../models/personModels')

const router = express.Router()

router.get('/', async (req, res)=>{
    let persons = await Persons.find({})
    console.log(persons.tasks)
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
        res.status(200).redirect('/general-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível cadastrar o usuário' })
    }
})

router.get('/:id/edit-person', async (req, res)=>{
    try{
        let persons = await Persons.findById(req.params.id)
        res.status(200).render('pages/edit-person', { persons: persons })
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível carregar o usuário' })
    }
})

router.get('/:id/show', async (req, res)=>{
    try{
        let person = await Persons.findById(req.params.id)
        res.status(200).render('pages/show', { person: person })
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível vizualizar o usuário' })
    }
})

router.put('/:id', async (req, res)=>{
    let { name } = req.body.person
    let person = await Persons.findById(req.params.id)
    try{
        await person.update( {name} )
        res.redirect('/general-list')
    }catch(error){
        res.status(422).render('pages/error', { persons: { ...person, error: 'Não foi possível editar o usuário' } })
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        await Persons.findByIdAndRemove(req.params.id)
        res.redirect('/general-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível deletar o usuário'})
    }
})

module.exports = router