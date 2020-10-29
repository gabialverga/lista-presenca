let turma;
let select_turmas = document.querySelector('#escolhe_turma');

async function fetch_turmas() {
    let turmas = await (fetch('turmas.json').then(r => r.json()));
    turma = turmas.turmas;
}

function create_select_turmas() {
    let selectList = document.createElement("select");
    selectList.setAttribute("id", "turmas_select");
    select_turmas.appendChild(selectList);

    let option = document.createElement("option");
    option.setAttribute("value", -1);
    option.text = "Escolha turma";
    selectList.appendChild(option);

    for (let i = 0; i < turma.length; i++) {
        option = document.createElement("option");
        option.setAttribute("value", i);
        option.text = turma[i].turma;
        selectList.appendChild(option);
    }
    
    let listar = document.createElement("button");
    listar.innerText = "Listar alunos";
    listar.classList.add("lista");
    listar.setAttribute("id", "listarAlunos");
    listar.addEventListener('click', _ => {
        listaAlunos();
    });
    select_turmas.appendChild(listar);
}

function listaAlunos() {
    let e = document.getElementById("turmas_select");
    let id = e.value;
    let lista = document.querySelector('#lista_alunos');
    for (let i = 0; i < turma[id].aluno.length; i++) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("id", "aluno-"+i);
        var p = document.createElement("p");
        var node = document.createTextNode(turma[id].aluno[i]);
        p.appendChild(node);
        p.appendChild(x);
        lista.appendChild(p);
    }

    let copiar = document.createElement("button");
    copiar.innerText = "Copiar lista de presença";
    copiar.setAttribute("id", "copiarLista");
    copiar.addEventListener('click', _ => {
        gerarLista(id);
    });
    lista.appendChild(copiar);
}

function gerarLista(id) {
    let lista = document.querySelector('#text');
    let str = "Alunos presentes:\n"
    let r = 2
    let c = 20
    for (let i = 0; i < turma[id].aluno.length; i++) {
        let aluno = document.querySelector('#aluno-'+i);
        if(aluno.checked) {
            str += turma[id].aluno[i] + "\n"
            r++;
            if(turma[id].aluno[i].length > c) c = turma[id].aluno[i].length
        }
    }
    let el = document.createElement('textarea');
    el.setAttribute("rows", r); // rows="4" cols="50"
    el.setAttribute("cols", c);
    el.value = str;
    lista.appendChild(el);
    el.select();
    document.execCommand('copy');
}

(async function main() {
    await Promise.all([fetch_turmas()]);
    create_select_turmas();
}());