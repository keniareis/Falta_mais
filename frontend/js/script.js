const API_URL = 'http://localhost:3000';

async function alterarFaltas(id) {
  const faltas = prompt('Digite a nova quantidade de faltas:');
  
  if (faltas !== null && !isNaN(faltas)) {
    try {
      const response = await fetch(`${API_URL}/discipline/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_absence: parseInt(faltas) }),
      });
      const data = await response.json();
      if (response.ok) {
        document.getElementById(`faltas-${id}`).textContent = data.current_absence;
        const percentual = (data.current_absence / data.total_classes) * 100;
        document.getElementById(`percentual-${id}`).textContent = percentual.toFixed(0);
        document.getElementById(`progress-${id}`).style.width = `${percentual}%`;
      } else {
        alert(data.error || 'Erro ao atualizar faltas.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  }
}

async function editarMateria(id) {
  const novoNome = prompt('Digite o novo nome da matéria:');
  if (novoNome !== null) {
    try {
      const response = await fetch(`${API_URL}/discipline/${id}`, {
        method: 'PATCH',
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

// Função para renderizar um card no front-end
function renderCard(discipline) {
  const container = document.querySelector('.container');
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', discipline.id);
  card.innerHTML = `
    <div class="card-head">
      <div>
        <h3>${discipline.name}</h3>
        <p>Faltas: <span id="faltas-${discipline.id}">${discipline.current_absence}</span>/${discipline.total_classes} (<span id="percentual-${discipline.id}">${(discipline.current_absence / discipline.total_classes * 100).toFixed(0)}</span>%)</p>
      </div>
      <img src="./assets/trash.png" alt="trash" onclick="excluirMateria(${discipline.id})">
    </div>
    <div class="progress-bar">
      <div class="progress" id="progress-${discipline.id}" style="width: ${(discipline.current_absence / discipline.total_classes * 100).toFixed(0)}%;"></div>
    </div>
    <div class="actions">
      <button class="button" onclick="alterarFaltas(${discipline.id})">Adicionar Faltas</button>
      <button class="button" onclick="editarMateria(${discipline.id})">Editar Matéria</button>
    </div>
  `;
  container.appendChild(card);
}


  
// Abrir modal
function abrirModal() {
  document.getElementById("modal").classList.remove("hidden");
}

// Fechar modal
function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Adicionar disciplina
async function adicionarDisciplina() {
  const nome = document.getElementById("nome-disciplina").value;
  const totalAulas = document.getElementById("total-aulas").value;
  const faltasPermitidasPercent = parseInt(document.getElementById("faltas-permitidas").value);


  if (!nome || !totalAulas || isNaN(faltasPermitidasPercent)) {
    alert("Preencha todos os campos.");
    return;
  }

  const maxFaltas = Math.floor((faltasPermitidasPercent / 100) * totalAulas)

  try{
    const respose = await fetch(`${API_URL}/discipline`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nome,
        total_classes: parseInt(totalAulas),
        max_absences: maxFaltas,
        current_absence: 0,
      }),
    });

    const data = await respose.json();
    if(respose.ok){
      renderCard(data);
      fecharModal();
    }else{
      alert(data.error || 'Erro ao adicionar disciplina.');
    }
  } catch(err) {
    alert('Erro ao conectar com o servidor.');
  }

  fecharModal();
}



// Simula validação de login
function fazerLogin(event) {
  event.preventDefault(); // Impede o envio do formulário
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Verifica se o email e a senha estão corretos
  if (email === "admin@faltamais.com" && senha === "123456") {
    // Redireciona para o dashboard (index.html)
    window.location.href = "index.html";
  } else {
    alert("Email ou senha inválidos.");
  }
}


function abrirModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}