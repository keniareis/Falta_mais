const API_URL = 'http://localhost:3000/';

async function alterarFaltas(id) {
  const faltas = prompt('Digite a nova quantidade de faltas:');
  if (faltas !== null && !isNaN(faltas)) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faltas: parseInt(faltas) })
      });
      const data = await response.json();
      if (response.ok) {
        document.getElementById(`faltas-${id}`).textContent = data.faltas;
        const percentual = (data.faltas / 10) * 100;
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
      const response = await fetch(`${API_URL}/${id}/nome`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome })
      });
      const data = await response.json();
      if (response.ok) {
        const card = document.querySelector(`.card[data-id="${id}"] h3`);
        if (card) card.textContent = data.nome;
      } else {
        alert(data.error || 'Erro ao atualizar o nome da matéria.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  }
}