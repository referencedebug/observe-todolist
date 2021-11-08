import TodoList, { Itodo } from "./src/TodoList";
;((doc: Document) => {
    const oTodoList: HTMLElement = doc.querySelector('.todo-list');
    const oAddBtn: HTMLElement = doc.querySelector('.add-btn');
    const oInput: HTMLInputElement = doc.querySelector('.input');

    const todoList = TodoList.create(oTodoList);

    const init = () => {
        bindEvent();
    };
    function bindEvent (){
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oTodoList.addEventListener('click', handleListClick, false);
    }

    function handleAddBtnClick(e: MouseEvent){
        const val: string = oInput.value.trim();
        if(!val.length){
            return;
        }
        todoList.notify<Itodo>('add', {
            id: new Date().getTime(),
            content: val,
            completed: false
        })
    }
    function handleListClick (e: MouseEvent) {
        const tar =  e.target as HTMLElement;
        const tagName = tar.tagName.toLocaleLowerCase();
        if(tagName === 'input' || tagName === 'button'){
            const id:number = parseInt(tar.dataset.id);
            switch(tagName){
                case 'input': 
                    todoList.notify<number>('toggle', id);
                    break;
                case 'button':
                    todoList.notify<number>('remove', id);
                    break;
                default:
                     break;
            }
        }
    }
    init();
})(document)