export default function html ([first, ...string], ...values) {
    return values.reduce (function (acc, cur) {return acc.concat(cur, string.shift())} ,[first])
    .filter(x => x && x !== true || x === 0)
    .join('')
}
export function creatStore (reducer) {
    //Khi gọi đến hàm creatStore sẽ truyền vào callback function reducer sẽ trả lại dữ liệu ban đầu của store
    //Khi lần đầu tiên state được gọi nó sẽ nhận lại init
    let state = reducer()
    //ROOT chứa những gốc element để render ra view
    const roots = new Map ()
    function render () {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }
    return {
        //Dùng để nhận view và đẩy ra roots, root sẽ là một object, sau đó đẩy ra view để xem được luôn
        attach(component, root) {
            roots.set(root, component)
            render()

        },
        //Dùng để kết nối store và view, đẩy dữ liệu từ store ra view
        //Nhận về đối số là một dữ liệu nào đó của store để hiển thị ra view, mặc định là state
        connect (selector = state => state) {
            //Return lại một hàm khác, nhận đối số là hàm component
            //Hàm component lại return ra một hàm khác nhận đối số là props là các công cụ/dữ liệu muốn
            //truyền vào component sau này và return lại component nhận đối số là một Object.assign
            //Object.assign mà có đối số đầu tiên là {} để gom hết các object đứng sau nó vào nó
            //Sau khi hàm component chạy thì sẽ đẩy được state vào giúp update được dữ liệu từ store ra view
            return component => (props, ...args) => 
            component(Object.assign({},props,selector(state),...args))
        },
        //từ view muốn hiển thị ra hành động thì phải có dispatch
        //Gọi lại reducer để sửa lại state, return lại state mới để update lại store 
        //Gọi lại render để update thay đổi ra view
        dispatch(action, ...args) {
            //Trả về một state mới được tạo ra từ state cũ và chỉ sửa lại phần cars
            state = reducer(state, action, args)
            render()
        }
    }

}
