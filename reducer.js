import storage from "../Todo list/unity/storage.js"
import listItem from "./component/listItem.js"


const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}

const actions = {
    add({todos}, title) {
        if(title){
            todos.push({title, completed: false})
            storage.set(todos)
        }
        
       
    },
    toggle({todos},index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)

    },
    toggleAll({todos}, completed) {
        todos.forEach(todo => {
            todo.completed = completed
            storage.set(todos)
          })
    },
    remove({todos}, index) {
        todos.splice(index,1)
        storage.set(todos)
    },
    switch(state, filter) {
        state.filter = filter
        
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
        
        
    },
    startEdit(state, index) {
        state.editIndex = index
    },
    endEdit(state, value) {
        if(state.editIndex !== null) {
            if(value) {
                state.todos[state.editIndex].title = value
                storage.set(state.todos)
                state.editIndex = null
            }
            else {
                this.remove(state, state.editIndex)
                state.editIndex = null
            }
                        
        }
         
    },
    cancelEdit(state) {
        state.editIndex = null
    }
}
 export default function reducer (state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
    
 }