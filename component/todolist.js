import html from "../core.js"
import { connect } from "../store.js"
import listItem from "./listItem.js"
const connector = connect()
function todolist ({todos, filter, filters,editIndex}){
    return html`
        <input id="toggle-all" class="toggle-all" type="checkbox"
        onchange = "dispatch('toggleAll', this.checked)"
        ${todos.every(filters.completed) && 'checked'}
        >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
           ${todos.filter(filters[filter]).map((todo,index) => `${listItem({todo, index,editIndex})}`)}
        </ul>
       
    `
}
export default connector(todolist)
