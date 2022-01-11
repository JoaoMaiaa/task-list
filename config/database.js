const mongoose = require('mongoose')


async function main(){
    await mongoose.connect('mongodb://localhost:27017/task-list')
}

main()
.then(()=>console.log('MongoDB ligado'))
.catch(err => console.log(err))