import html from "../core.js"
import { connect } from "../store.js"
import listItem from "./listItem.js"

function footer ({todos,filter, filters}) {
    return html`
    <footer class="footer">
        <span class="todo-count"><strong>${todos.filter(filters.active).length}</strong> item left</span>
        <ul class="filters">
            ${Object.keys(filters).map(type => html`
            <li>
                <a class ="${filter === type && 'selected'}" href="#"
                onclick = dispatch('switch','${type}')
                >
                ${type[0].toUpperCase() + type.slice(1)}</a>
            </li>
            `)}
            
        </ul>
        
        <button ${todos.every(filters.completed) && 'hidden'} class="clear-completed"
        onclick="dispatch('clearCompleted')"
        >Clear completed</button>
    </footer>
       
    `
}
export default connect() (footer)
