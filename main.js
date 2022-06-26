const abrirModal = document.querySelector('.add-aluno')
const conteinerModal = document.querySelector('.conteiner-modal')
const input = document.querySelectorAll('.form-input')
const btnAdd = document.getElementById('add')
const boxInput = document.querySelectorAll('.input-box')
const iconeError = document.querySelectorAll('.fa-circle-exclamation')


const tbody = document.querySelector('tbody')

let alunos = []

abrirModal.addEventListener('click', () => {
    conteinerModal.classList.add('mostrar')
})

conteinerModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('conteiner-modal') || e.target.classList.contains('fechar')) {
        conteinerModal.classList.remove('mostrar')
    }
})


/* função para ocorrer erro quando o input estiver vazio */

btnAdd.addEventListener('click', () => {
    for (i = 0; i < input.length; i++) {
        if (input[i].value === '') {
            input[i].classList.add('error')
            let elementoPai = input[i].parentElement
            elementoPai.classList.add('error')
            setTimeout(() => {
                input.forEach(inp => {
                    let paiInp = inp.parentElement

                    inp.classList.remove('error')
                    paiInp.classList.remove('error')
                })
            }, 1000)
        }
    }
    addAluno()
})

function addAluno() {

    const itemCrud = {
        id: Math.random().toString(32).substring(2, 18),
        nome: document.getElementById('nome').value,
        matricula: document.getElementById('matricula').value,
        serie: document.getElementById('serie').value,
    }

    if (itemCrud.matricula == '' || itemCrud.nome == '' || itemCrud.serie == '') {
        return
    } else {
        alunos = [...alunos, itemCrud]
    }
    inserirHTML()
}

function inserirHTML() {
    llimpar()
    alunos.forEach(aluno => {
        const tr = document.createElement('tr')

        tr.classList.add(`${aluno.id}`)

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.serie}</td>
            <td><i class="fa-solid fa-pen" id="editar"></i>
            <i class="fa-solid fa-trash" id="deletar"></i></td>
        `

        tbody.appendChild(tr)
    })

}

tbody.addEventListener('click', excluirAluno)

function excluirAluno(e) {

    if (e.target.getAttribute('id') === 'deletar') {
        let celula = e.target.parentElement
        let linha = celula.parentElement
        alunos = alunos.filter(aluno => aluno.id != linha.className)
    }

    inserirHTML()
}

tbody.addEventListener('click', editarAluno)

function editarAluno(e) {

    if (e.target.getAttribute('id') === 'editar') {

        conteinerModal.classList.add('mostrar')

        const modalAdd = document.querySelector('.modal')
        const modalEditar = document.querySelector('.modal-editar')

        modalAdd.style.display = 'none'
        modalEditar.style.display = 'flex'
    }
    /*  passando colocando os valores anteriomente adicionados nos input da tela editar */
    for (i = 0; i < alunos.length; i++) {
        const { nome, matricula, serie } = alunos[i]
        document.getElementById('nomeEditar').value = nome
        document.getElementById('matriculaEditar').value = matricula
        document.getElementById('serieEditar').value = serie
    }



    /* colocando os valores editados na tabela */
    /* if (e.target.getAttribute('id') === 'editar') {
        let celula = e.target.parentElement
        let linha = celula.parentElement

        for(i=0; i < alunos.length; i++){
           if(alunos[i].id === linha.className){
            alunos[i].nome = 'teste'
           }
        }
    }
    inserirHTML() */
}

function llimpar() {
    tbody.innerHTML = ''
}