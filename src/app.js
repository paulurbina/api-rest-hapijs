const Hapi = require('@hapi/hapi')

const _init_ = async () => {
    const port = process.env.PORT || 3000
    const server = new Hapi.Server({
        port,
        host: 'localhost'
    })

   

    // routes
    require('./routes/notes')(server)

    // database connection
    require('./database')
    await server.start()
    console.log('server in port', port)
}

_init_()
// sudo systemctl status mongodb
// mongo --eval 'db.runCommand({ connectionStatus: 1 })'