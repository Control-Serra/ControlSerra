const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sCodProd = document.querySelector('#m-CodProd');
const sdescMat = document.querySelector('#m-descMat');
const sTipo = document.querySelector('#m-Tipo');
const sUnidade = document.querySelector('#m-Unidade');
const sQuantidade = document.querySelector('#m-quantidade');
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
    sCodProd.value = itens[index].codprod;
    sdescMat.value = itens[index].descmat;
    sTipo.value = itens[index].tipo;
    sUnidade.value = itens[index].unidade;
    sQuantidade.value = itens[index].quantidade;
    id = index;
  } else {
    sCodProd.value = '';
    sdescMat.value = '';
    sTipo.value = '';
    sUnidade.value = '';
    sQuantidade.value = '';
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
    <td>${item.codprod}</td>
    <td>${item.descmat}</td>
    <td>${item.tipo}</td>
    <td>${item.unidade}</td>
    <td>${item.quantidade}</td>
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
    sCodProd.value === ''||
    sdescMat.value === ''||
    sTipo.value === ''||
    sUnidade.value === ''||
    sQuantidade.value === ''
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].codprod = sCodProd.value;
    itens[id].descmat = sdescMat.value;
    itens[id].tipo = sTipo.value;
    itens[id].unidade = sUnidade.value;
    itens[id].quantidade = sQuantidade.value;
  } else {
    itens.push({'codprod':sCodProd.value,'descmat': sdescMat.value,'tipo':sTipo.value,'unidade':sUnidade.value,'quantidade':sQuantidade.value});
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
