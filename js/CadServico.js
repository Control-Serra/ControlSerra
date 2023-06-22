const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sdata = document.querySelector('#m-data');
const sdesSer = document.querySelector('#m-desSer');
const btnSalvar = document.querySelector('#btnSalvar');

let itens
let id 
let materiaisSelecionados = [];


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

function openModalMaterial(index) {
  const modalMaterial = document.querySelector('.modal-container-material');
  modalMaterial.classList.add('active');

  // Carregar materiais existentes
  const materiaisExistentes = getMateriaisBD();

  const materiaisTable = document.querySelector('.materiais-table');
  materiaisTable.innerHTML = `
    <thead>
      <tr>
        <th>Material</th>
        <th>Quantidade</th>
        <th>Preço Unitário</th>
        <th>Total</th>
        <th class="acao">Remover</th>
      </tr>
    </thead>
    <tbody>
      ${materiaisSelecionados
        .map(
          (material, index) => `
            <tr>
              <td>${material.nome}</td>
              <td>${material.quantidade}</td>
              <td>${material.precoUnitario}</td>
              <td>${material.quantidade * material.precoUnitario}</td>
              <td class="acao">
                <button onclick="removerMaterial(${index})">
                  <i class='bx bx-trash'></i>
                </button>
              </td>
            </tr>
          `
        )
        .join('')}
      ${materiaisExistentes
        .map(
          (material, index) => `
            <tr>
              <td>${material.nome}</td>
              <td>${material.quantidade}</td>
              <td>${material.precoUnitario}</td>
              <td>${material.quantidade * material.precoUnitario}</td>
              <td class="acao">
                <button onclick="adicionarMaterial(${index})">
                  <i class='bx bx-plus'></i>
                </button>
              </td>
            </tr>
          `
        )
        .join('')}
    </tbody>
  `;

  modalMaterial.onclick = e => {
    if (e.target.className.indexOf('modal-container-material') !== -1) {
      modalMaterial.classList.remove('active');
    }
  };
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
    <td>
      <button onclick="openModalMaterial(${index})">
        Materiais (${item.materiais.length})
      </button>
    </td>
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

  if (sdata.value === '' || sdesSer.value === '') {
    return;
  }

  if (id !== undefined) {
    itens[id].data = sdata.value;
    itens[id].desser = sdesSer.value;
    itens[id].materiais = materiaisSelecionados;
  } else {
    const novoItem = {
      data: sdata.value,
      desser: sdesSer.value,
      materiais: materiaisSelecionados
    };
    itens.push(novoItem);
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

function adicionarMaterial(index) {
  const materiaisExistentes = getMateriaisBD();
  const materialSelecionado = materiaisExistentes[index];
  materiaisSelecionados.push(materialSelecionado);
  openModalMaterial();
}

function removerMaterial(index) {
  materiaisSelecionados.splice(index, 1);
  openModalMaterial();
}


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
