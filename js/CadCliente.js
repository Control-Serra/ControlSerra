const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sTipo = document.querySelector('#m-tipo');
const sNome = document.querySelector('#m-nome')
const sCep = document.querySelector('#m-cep');
const sEndereco = document.querySelector('#m-endereco');
const sCpfCnpj = document.querySelector('#m-cpf-cnpj');
const sEmail = document.querySelector('#m-email');
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
    sTipo.value = itens[index].tipo;
    sNome.value = itens[index].nome
    sCep.value = itens[index].cep;
    sEndereco.value = itens[index].endereco;
    sCpfCnpj.value = itens[index].cpfCnpj;
    sEmail.value = itens[index].email;
    sTelefone.value = itens[index].telefone;
    id = index;
  } else {
    sTipo.value = '';
    sNome.value = '';
    sCep.value = '';
    sEndereco.value = '';
    sCpfCnpj.value = '';
    sEmail.value = '';
    sTelefone.value = '';
    sCelular.value = '';
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
    <td>${item.tipo}</td>
    <td>${item.nome}</td>
    <td>${item.cep}</td>
    <td>${item.endereco}</td>
    <td>${item.cpfCnpj}</td>
    <td>${item.email}</td>
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
    sTipo.value === '' ||
    sNome.value === '' ||
    sCep.value === '' ||
    sEndereco.value === '' ||
    sCpfCnpj.value === '' ||
    sEmail.value === '' ||
    sTelefone.value === ''
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].tipo = sTipo.value;
    itens[id].nome = sNome.value;
    itens[id].cep = sCep.value;
    itens[id].endereco = sEndereco.value;
    itens[id].cpfCnpj = sCpfCnpj.value;
    itens[id].email = sEmail.value;
    itens[id].telefone = sTelefone.value;
  } else {
    itens.push({'tipo': sTipo.value,'nome':sNome.value,'cep': sCep.value,'endereco':sEndereco.value,'cpfCnpj':sCpfCnpj.value,'email':sEmail.value,'telefone':sTelefone.value});
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
