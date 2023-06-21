const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sdata = document.querySelector('#m-data');
const sdesSer = document.querySelector('#m-desSer');
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
    sdata.value = itens[index].data;
    sdesSer.value = itens[index].desser;
    id = index;
  } else {
    sCodProd.value = '';
    sdescMat.value = '';
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
    <td>${item.data}</td>
    <td>${item.desser}</td>
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
    sdescMat.value === ''
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].data = sdata.value;
    itens[id].desser = sdesSer.value;
  } else {
    itens.push({'data':sdata.value,'dessat': sdesSer.value});
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
