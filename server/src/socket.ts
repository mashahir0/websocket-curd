import {Socket,Server } from 'socket.io'
import { Todo } from './types'

let todos : Todo[] = []

export function createSocket(io:Server){
io.on('connect',(socket : Socket)=>{
    console.log('connected',socket.id)

    socket.emit('todos',todos)
    socket.on('createTodo',(todo: Todo)=>{
        todos.push(todo)
        io.emit('todos',todos)
    })
    socket.on('updateTodo',(updated: Todo)=>{
        todos = todos.map(t=>t.id === updated.id ?updated : t )
        io.emit('todos',todos)
    })
    socket.on('deleteTodo',(id : string)=>{
        todos = todos.filter(t=> t.id != id)
        io.emit('todos',todos)
    })
    socket.on('disconnect',()=>{
         console.log('Client disconnected:', socket.id);
    })

})
}