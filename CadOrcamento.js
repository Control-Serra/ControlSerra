const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sOrcamento = document.querySelector('#m-orcamento');
const sDesSer = document.querySelector('#m-desSer');
const sData = document.querySelector('#m-data');
const sCliente = document.querySelector('#m-cliente');
const sCusto = document.querySelector('#m-custo');
const sReceita = document.querySelector('#m-receita');
const sStatus = document.querySelector('#m-status');
const btnSalvar = document.querySelector('#btnSalvar');

let itens
let id 

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sOrcamento.value = itens[index].orcamento;
    sDesSer.value = itens[index].desser;
    sData.value = itens[index].data;
    sCliente.value = itens[index].cliente;
    sCusto.value = itens[index].custo;
    sReceita.value = itens[index].receita
    sStatus.value = itens[index].status;
    id = index;
  } else {
    sOrcamento.value = '';
    sDesSer.value = '';
    sData.value = '';
    sCliente.value = '';
    sCusto.value = '';
    sReceita.value = '';
    sStatus.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

sStatus.addEventListener('change',function() {
    const selectedValue = sStatus.value;
    switch(selectedValue) {
        case 'Não Iniciado':
          button.style.backgroundColor = 'red';
          break;
        case 'Andamento':
          button.style.backgroundColor = 'yellow';
          break;
        case 'Concluido':
          button.style.backgroundColor = 'blue';
          break;
        default:
          button.style.backgroundColor = 'initial'; 
      }
});

function insertItem(item, index) {
  let tr = document.createElement('tr');

tr.innerHTML = `
    <td>${item.orcamento}</td>
    <td>${item.desser}</td>
    <td>${item.data}</td>
    <td>${item.cliente}</td>
    <td>R$${item.custo}</td>
    <td>R$${item.receita}</td>
    <td>${item.status}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
  e.preventDefault();

  if (
    sOrcamento.value === ''||
    sDesSer.value === ''||
    sData.value === ''||
    sCliente.value === ''||
    sCusto.value === ''||
    sReceita.value === ''||
    sStatus.value === ''
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].orcamento = sOrcamento.value;
    itens[id].desser = sDesSer.value;
    itens[id].data = sData.value;
    itens[id].cliente = sCliente.value;
    itens[id].custo = sCusto.value;
    itens[id].receita = sReceita.value;
    itens[id].status = sStatus.value;
  } else {
    itens.push({'orcamento':sOrcamento.value,'desser': sDesSer.value,'data':sData.value,'cliente':sCliente.value,'custo':sCusto.value,'receita':sReceita.value,'status':sStatus.value});
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();