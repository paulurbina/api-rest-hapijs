const Notes = require('../models/Notes')
const Joi = require('@hapi/joi')
module.exports = (server) => {
    server.route({
        method: 'POST',
        path: '/notes',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                    description: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(100)
                    .required()
                }),
                failAction: (req, handler, error) => {
                    return error.isJoi
                        ? handler.response(error.details[0]).takeover()
                        : handler.response(error).takeover()
                }
            },
            
        },
        handler: async (req, handler) => {
          try {
            const note = new Notes(req.payload)
            const notesave = await note.save()
            return handler.response(notesave)
          } catch (error) {
              let err = new Error()
              console.log(err.message, '\n', err.fileName);
              return handler.response(err).code(500)
          }
        }
    })


    server.route({
        method: 'GET',
        path: '/notes',
        handler: async (req, handler) => {
            try {
                const notes = await Notes.find()
                return handler.response(notes)
            } catch (error) {
                let err = new Error()
              console.log(err.message, '\n', err.fileName);
              return handler.response(err).code(500)
            }
        }
    })


    server.route({
        method: 'GET',
        path: '/notes/{id}',
        handler: async (req, handler) => {
            try {
                const note = await Notes.findById(req.params.id)
                return handler.response([note])
            } catch (error) {
                let err = new Error()
              console.log(err.message, '\n', err.fileName);
              return handler.response(err).code(500)
            }
        }
    })


    server.route({
        method: 'PUT',
        path: '/notes/{id}',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .optional(),
                    description: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(100)
                    .optional()
                }),
                failAction: (req, handler, error) => {
                    return error.isJoi
                        ? handler.response(error.details[0]).takeover()
                        : handler.response(error).takeover()
                }
            },
            
        },
        handler: async (req, handler) => {
            try {
                const noteUpdate = await Notes.findByIdAndUpdate(
                    req.params.id,
                    req.payload,
                    { new: true }
                )
                return handler.response(noteUpdate)
            } catch (error) {
                let err = new Error()
              console.log(err.message, '\n', err.fileName);
              return handler.response(err).code(500)
            }
        }
    })



    server.route({
        method: 'DELETE',
        path: '/notes/{id}',
        handler: async (req, handler) => {
            try {
                const noteDEL = await Notes.findByIdAndDelete(req.params.id)
                return handler.response(noteDEL)
            } catch (error) {
                let err = new Error()
              console.log(err.message, '\n', err.fileName);
              return handler.response(err).code(500)
            }
        }
    })
}