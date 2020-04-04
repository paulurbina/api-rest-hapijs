const mongoose = require('mongoose')


const  _connectionDB_ = async () => {
   try {
    const option = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    const notesDB = await mongoose.connect('mongodb://localhost/notes', option)
    notesDB ? console.info('Connection Database for Note') : new Error('wou error D:')
   } catch (err) {
    if (err instanceof EvalError) {
        console.info(err.name, " ", err.message)
    } else if (e instanceof URIError) {
        console.info(err.name, " ", err.message)
    } else if (e instanceof TypeError) {
        console.info(err.name, " ", err.message)
    }
   }
}

_connectionDB_()
