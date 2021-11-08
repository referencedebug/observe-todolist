import { Itodo } from './index';
class TodoEvent {
    private static instance: TodoEvent;
    private todoData: Itodo[] = [];
    public static  create () {
        if(!TodoEvent.instance){
            TodoEvent.instance = new TodoEvent();
        }
        return TodoEvent.instance;
    }
    public addTodo (todo: Itodo){
        return new Promise((resolve, reject) => {
            const _todo: Itodo = this.todoData.find(t => t.content === todo.content);
            if(_todo){
                alert('该项已存在');
                return reject(1001);
            }
            this.todoData.push(todo);
            resolve(todo);
        })
    }
    public removeTodo (id: number) {
        return new Promise((resolve, reject) => {
            this.todoData = this.todoData.filter(item => item.id !== id);
            resolve(id);
        })
    }

    public toggleTodo(id: number){
        return new Promise((resolve, reject) => {
            this.todoData = this.todoData.map(item => {
                if(item.id === id){
                    item.completed = !item.completed;
                    resolve(id);
                }
                return item;
            })
        })
    }
}

export default TodoEvent;