const express = require('express')

const Task = require('../models/taskModels')

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        let tasks = await Task.find({})
        res.status(200).render('pages/task-list', { tasks: tasks })
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

// É necessário em todo get antes de um post que se crie um novo objeto
// porque o que é pedido no ejs são parametros de um objeto JÁ criado, o contrário
// não renderiza.
// Neste caso na inserção de um dado dentro de outro. pessoa(dado) -> tarefa(dado) <- !!!
// Importante salientar é que se a pessoa cancelar, deve ser redirecionada para pag.
// anterior, para isso é necessário pegar o id na req e colocar no ejs através do anchor 

router.get('/:id/create-task', async (req, res)=>{
    let task = new Task()
    try{
        res.status(200).render('pages/create-task', { taskId: req.params.id, task: task })
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.post('/:id/create-task', async (req, res)=>{
    let { task, description } = req.body

    console.log(task)
    console.log(description)

    try{
        // res.status(200).render('/general-list')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível cadastrar uma nova tarefa' })
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