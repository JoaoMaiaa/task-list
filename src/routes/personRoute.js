const express = require('express')

const Persons = require('../models/personModels')
const Tasks = require('../models/taskModels')

const router = express.Router()

// há de se ter uma atenção aqui. como tasks é uma lista, não basta iterar
// sobre o person mas mais do que isso, iterar também sobre a mesma task, o resto
// é o resultado no ejs
router.get('/', async (req, res)=>{
    try{
        let persons = await Persons.find({}).populate('tasks')
        // persons.forEach(person=>{
        //     person.tasks.forEach(task=>{
        //         console.log(task.name)
        //     })
        // })
        res.status(200).render('pages/person-list', { persons: persons })
    }catch(error){
        console.log(error)
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.get('/create-person', async (req, res)=>{
    let person = new Persons()
    try{
        res.status(200).render('pages/create-person', { person: person })
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
        let persons = await Persons.findById(req.params.id).populate('tasks')
        res.status(200).render('pages/show', { persons: persons })
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

// falta correção
router.delete('/:id', async (req, res)=>{
    try{
        let person = await Persons.findByIdAndRemove(req.params.id)
        // let task = await Tasks.findByIdAndRemove(person.tasks)
        console.log(`task: ${ person }`)
        await person.save()
        // await task.save()
        res.redirect('/general-list')
    }catch(error){
        console.log(error)
        res.status(422).render('pages/error', { error: 'Não foi possível deletar o usuário'})
    }
})

module.exports = router