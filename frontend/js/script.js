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

// Editar nome da matéria
async function editarMateria(id) {
    console.log(id);
  const novoNome = prompt('Digite o novo nome da matéria:');
  if (novoNome !== null) {
    try {
      const response = await fetch(`${API_URL}/discipline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: novoNome }),
      });
      const data = await response.json();
      if (response.ok) {
        const card = document.querySelector(`.card[data-id="${id}"] h3`);
        if (card) card.textContent = data.name;
      } else {
        alert(data.error || 'Erro ao atualizar o nome da matéria.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
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
      <button class="button" onclick="editarMateria('${discipline._id}')">Editar Matéria</button>
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
function fazerLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (email === 'admin@faltamais.com' && senha === '123456') {
    window.location.href = 'index.html';
  } else {
    alert('Email ou senha inválidos.');
  }
}

// Inicia o carregamento das disciplinas ao carregar a página
window.onload = carregarDisciplinas;
