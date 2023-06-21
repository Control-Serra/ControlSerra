const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCnpj = document.querySelector('#m-cnpj');
const sEndereco = document.querySelector('#m-endereco');
const sBairro = document.querySelector('#m-bairro');
const sNumero = document.querySelector('#m-numero');
const sTelefone = document.querySelector('#m-telefone');
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
    sNome.value = itens[index].nome;
    sCnpj.value = itens[index].cnpj;
    sEndereco.value = itens[index].endereco;
    sBairro.value = itens[index].bairro;
    sNumero.value = itens[index].Numero;
    sTelefone.value = itens[index].telefone;
    id = index;
  } else {
    sNome.value = '';
    sCnpj.value = '';
    sEndereco.value = '';
    sBairro.value = '';
    sNumero.value = '';
    sTelefone.value = '';
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

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cnpj}</td>
    <td>${item.endereco}</td>
    <td>${item.bairro}</td>
    <td>${item.numero}</td>
    <td>${item.telefone}</td>
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
    sNome.value === '' ||
    sCnpj.value === '' ||
    sEndereco.value === '' ||
    sBairro.value === '' ||
    sNumero.value === '' ||
    sTelefone.value === ''
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].cnpj = sCnpj.value;
    itens[id].endereco = sEndereco.value;
    itens[id].bairro = sBairro.value;
    itens[id].numero = sNumero.value;
    itens[id].telefone = sTelefone.value;
  } else {
    itens.push({'nome':sNome.value,'cnpj': sCnpj.value,'endereco':sEndereco.value,'bairro':sBairro.value,'numero':sNumero.value,'telefone':sTelefone.value});
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
