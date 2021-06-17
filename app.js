'use strict';

// --------------------------[PARTE DO BANCO]------------------------------------

// let banco = [
//     {'tarefa': 'Tarefa Teste','status':''},
// ]


const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));


// ---------------------[ESTRUTURA HTML A SER CRIADA]-----------------------------
const createlist = (tarefa, status, indice) =>{
    const item = document.createElement('label');
    item.classList.add("todo__item")
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}> <div>${tarefa}</div> <input type="button" class="btnX" value="X" data-indice=${indice}>`
    document.getElementById('all-l').appendChild(item);
}

//------------------------[RENDERIZAÇÃO DA TELA]-----------------------------------

//enquanto o TodoList("all-l") tiver o primeiro filho, vai excluindo o ultimo filho, até o primeiro virar o ultimo e apagar também
const limpartarefa =() =>{          
    const todoList = document.getElementById('all-l')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const render = () =>{
    limpartarefa(); //limpa tudo da tela
    const banco = getBanco();
    banco.forEach((item, indice) => createlist (item.tarefa, item.status, indice)) //adiciona todas as tarefas
}

//---------------[PEGAR AS INFORMAÇÕES DO INPUT PARA JOGAR PARA O BANCO, QUE EM SEGUIDA GERA UM NOVO ITEM]-------------

const insertItem = (event)=>{
    const tecla = event.key;
    const text = event.target.value
    
    if(tecla === "Enter"){
        const banco = getBanco();
        banco.push({'tarefa': text,'status':''})
        setBanco(banco);
        render();
        ClearTask();
    }
}

//----------------[FUNÇÃO PARA LIMPAR O INPUT DEPOIS QUE UM ITEM FOR ADICIONADO]------------------

function ClearTask(){
    event.target.value = "";
};


//-----------------[FUNÇÃO PARA DESCOBRIR QUAL ITEM FOI CLICADO]-----------------------------------

const clickItem = (event)=>{
    const element = event.target;
    if(element.type == "button"){
        const indice = element.dataset.indice;
        removeItem(indice);
    }else if(element.type == "checkbox"){
        const indice = element.dataset.indice;
        RefreshCheck(indice);
    }
}

//--------------------------------------[FUNÇÃO PARA EXCLUIR]----------------------------------------

const removeItem = (indice) =>{
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    render();
}

//---------------------------------[FUNÇÃO PARA ATUALIZAR O CHECK NO BANCO]----------------------------------

const RefreshCheck =(indice) =>{
    const banco = getBanco();
    banco[indice].status = banco[indice].status == "" ? "checked" : "";
    setBanco(banco)
    // ? = então
    // : = senão
    render();
}


//--------------------------[ADICIONANDO AS FUNÇÕES NOS ELEEMENTOS]----------------------------------

document.getElementById("newItem").addEventListener("keypress", insertItem);
document.getElementById("all-l").addEventListener("click", clickItem);
render();
