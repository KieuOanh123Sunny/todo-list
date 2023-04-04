import html from "../core.js"
import Header from "./header.js"
import { connect } from "../store.js"
import todolist from "./todolist.js"
import footer from "./footer.js"

function app ({ todos }) {
    return html`
        <section class="todoapp">
        ${Header()}
        ${todos.length > 0 && todolist()}
        ${todos.length > 0 &&  footer()}

        </section>
    
    `
}
export default connect() (app)
