const API_URL = 'http://localhost:3000';

function abrirModalFaltas(id) {
  const modal = document.getElementById('add-faltas');
  modal.classList.remove('hidden');
  const addButton = modal.querySelector('.add-btn');
  addButton.setAttribute('onclick', `alterarFaltas('${id}')`);
}

function fecharModalFaltas() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('add-faltas').classList.add('hidden');
}
// Alterar número de faltas
async function alterarFaltas(id) {
  const novasFaltas = parseInt(document.getElementById('qtd-faltas').value);

  if (novasFaltas !== null && !isNaN(novasFaltas)) {
    try {
      const faltasAtuais = parseInt(document.getElementById(`faltas-${id}`).textContent);
      const totalFaltas = faltasAtuais + parseInt(novasFaltas);

      const response = await fetch(`${API_URL}/discipline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_absence: parseInt(totalFaltas) }),
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById(`faltas-${id}`).textContent = data.current_absence;

        const percentual = (data.current_absence / data.total_classes) * 100;
        document.getElementById(`percentual-${id}`).textContent = percentual.toFixed(0);

        const percentualBarra = (data.current_absence / data.max_absences) * 100;
        document.getElementById(`progress-${id}`).style.width = `${percentualBarra}%`;


        if (data.current_absence >= data.max_absences) {
          alert('Você atingiu ou ultrapassou o limite de faltas permitido!');
        }

        fecharModalFaltas();

      } else {
        alert(data.error || 'Erro ao atualizar faltas.');
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      alert('Erro ao conectar com o servidor.');
    }
  }
}

function abrirModalEdit(id) {
  const modal = document.getElementById('edit-materia');
  modal.classList.remove('hidden');

  const saveButton = modal.querySelector('.add-btn');
  saveButton.setAttribute('onclick', `editarMateria('${id}')`);
}

function fecharModalEdit() {
  const modal = document.getElementById('edit-materia');
  modal.classList.add('hidden');
}

// Editar nome da matéria
async function editarMateria(id) {
  console.log(`ID recebido para editar: ${id}`);
  const novoNome = document.getElementById('edit-name-materia').value;
  const novoTotalAulas = parseInt(document.getElementById('edit-total-aulas').value);
  console.log(`nome e total atribuidos`);
  console.log(novoNome);

  if (novoNome.trim() !== '' && !isNaN(novoTotalAulas)) {
    console.log(`verificando se nome é null`);
    try {
      const response = await fetch(`${API_URL}/discipline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: novoNome,
          total_classes: parseInt(novoTotalAulas)
        }),
      });

      const data = await response.json();
      console.log('Dados retornados pelo servidor:', data);

      if (response.ok) {

        const card = document.querySelector(`.card[data-id="${id}"]`);
        console.log('atribuindo card');

        if (card) {
          // Atualiza o nome da matéria
          const titleElement = card.querySelector('h3');
          if (titleElement) {
            titleElement.textContent = data.name;
          }

          // Atualiza o número de faltas
          const faltasElement = document.querySelector(`#faltas-${id}`);
          if (faltasElement) {
            faltasElement.textContent = data.current_absence; // Atualiza faltas no frontend
          }

          // Atualiza o percentual
          const percentualElement = document.querySelector(`#percentual-${id}`);
          if (percentualElement) {
            const percentual = ((data.current_absence / data.total_classes) * 100).toFixed(0);
            percentualElement.textContent = percentual;
          }

          // Atualiza a barra de progresso
          const progressElement = document.querySelector(`#progress-${id}`);
          if (progressElement) {
            const progress = ((data.current_absence / data.max_absences) * 100).toFixed(0);
            progressElement.style.width = `${progress}%`;
          }

          card.remove(); // Remove o card antigo do DOM

          renderCard(data);
          console.log('Card atualizado com sucesso.');

        } else {
          console.warn('Nenhum card encontrado para o ID fornecido.');
        }

        fecharModalEdit();
      } else {
        alert(data.error || 'Erro ao atualizar a matéria.');
      }
    } catch (err) {
      console.log('Erro ao conectar com o servidor.');
    }
  } else {
    alert('Preencha todos os campos.');
  }
}

// Excluir matéria
async function excluirMateria(id) {
  const confirmDelete = confirm('Tem certeza que deseja excluir esta matéria?');
  if (confirmDelete) {
    try {
      const response = await fetch(`${API_URL}/discipline/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) card.remove();
      } else {
        alert('Erro ao excluir a matéria.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  }
}

// Renderizar card
function renderCard(discipline) {
  const container = document.querySelector('.container');
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', discipline._id);
  card.innerHTML = `
    <div class="card-head">
      <div>
        <h3>${discipline.name}</h3>
        <p>Faltas: <span id="faltas-${discipline._id}">${discipline.current_absence}</span>/${discipline.total_classes} (<span id="percentual-${discipline._id}">${(discipline.current_absence / discipline.total_classes * 100).toFixed(0)}</span>%)</p>
      </div>
      <img src="./assets/trash.png" alt="trash" onclick="excluirMateria('${discipline._id}')">
    </div>
    <div class="progress-bar">
      <div class="progress" id="progress-${discipline._id}" style="width: ${(discipline.current_absence / discipline.max_absences * 100).toFixed(0)}%;"></div>
    </div>
    <div class="actions">
      <button class="button" onclick="abrirModalFaltas('${discipline._id}')">Adicionar Faltas</button>
      <button class="button" onclick="abrirModalEdit('${discipline._id}')">Editar Matéria</button>
    </div>
  `;
  container.appendChild(card);
}

// Carregar disciplinas
async function carregarDisciplinas() {
  try {
    const response = await fetch(`${API_URL}/discipline`);
    const data = await response.json();


    if (response.ok) {
      console.log(data);
      data.forEach(renderCard);
    } else {
      alert('Erro ao carregar disciplinas.');
    }
  } catch (err) {
    alert('Erro ao conectar com o servidor.');
  }
}

// Adicionar disciplina
async function adicionarDisciplina() {
  const nome = document.getElementById('nome-disciplina').value;
  const totalAulas = parseInt(document.getElementById('total-aulas').value);
  const faltasPermitidasPercent = parseInt(document.getElementById('faltas-permitidas').value);

  if (!nome || isNaN(totalAulas) || isNaN(faltasPermitidasPercent)) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const maxFaltas = Math.floor((faltasPermitidasPercent / 100) * totalAulas);

  try {
    const response = await fetch(`${API_URL}/discipline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nome,
        total_classes: totalAulas,
        max_absences: maxFaltas,
        current_absence: 0,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      renderCard(data);
      fecharModal();
    } else {
      alert(data.error || 'Erro ao adicionar disciplina.');
    }
  } catch (err) {
    alert('Erro ao conectar com o servidor.');
  }
}

// Abrir modal
function abrirModal() {
  document.getElementById('modal').classList.remove('hidden');
}

// Fechar modal
function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Login
function redirectToLogin() {
  window.location.href = './login.html';
}

window.onload = carregarDisciplinas;
