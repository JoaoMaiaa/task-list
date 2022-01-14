const express = require('express')

const Task = require('../models/taskModels')
const Persons = require('../models/personModels')

const router = express.Router()

// uma lógica um pouco parecida com a person, porém
// sem precisar iterar uma segunda vez porque não há uma lista
// e sim um objeto, por esta razão pode ser acessado diretamente
// sua propriedade e valor
router.get('/', async (req, res)=>{
    try{
        let tasks = await Task.find({}).populate('persons')
        // trech provisório
        tasks.forEach(task=>{
            console.log(task)
        })
        res.status(200).render('pages/task-list', { tasks: tasks })
    }catch(error){
        console.log(error)
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

// É necessário em todo get antes de um post que se crie um novo objeto
// porque o que é pedido no ejs são parametros de um objeto JÁ criado, o contrário
// não renderiza.
// Neste caso, na inserção de um dado dentro de outro. pessoa(dado) -> tarefa(dado) <- !!!
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

// Isso é inacreditável (ruim). Não é automático a raleção, portanto
// no mongo deve ser feito manualmente a relação de onde os dados estão 
// Além de atualizar a task, devo atualizar também a pessoa

router.post('/:id/create-task', async (req, res)=>{
    let { name } = req.body.task
    let { description } = req.body.description 

    let task = new Task({ name, description, persons: req.params.id })
    try{
        await task.save()
        let persons = await Persons.findById(req.params.id)
        persons.tasks.push(task)
        await persons.save()
        res.status(200).redirect(`/persons/${req.params.id}/show`)
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível cadastrar uma tarefa' })
    }
})

router.get('/edit-task', async (req, res)=>{
    try{
        res.status(200).render('pages/edit-task')
    }catch(error){
        res.status(422).render('pages/error', { error: 'Não foi possível encontrar esta página' })
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        let task = await Task.findByIdAndRemove(req.params.id)
        let person = await Persons.findById(task.persons)
        let taskToRemove = person.tasks.indexOf(task._id)
        person.tasks.splice(taskToRemove, 1)
        person.save()
        res.status(200).redirect(`/persons/${person._id}/show`)
    }catch(error){
        res.status(422).render('pages/error', {error: 'Não foi possível excluir a tarefa'})
    }
})

// rota povisória
router.delete('/:id/delete', async (req, res)=>{
    try{
        let task = await Task.findByIdAndRemove(req.params.id)
        res.status(200).redirect(`/general-list`)
    }catch(error){
        res.status(422).render('pages/error', {error: 'Não foi possível excluir a tarefa'})
    }
})

module.exports = router