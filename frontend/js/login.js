const API_URL = 'http://localhost:3000';

async function fazerLogin(event) {
    event.preventDefault(); // Impede o recarregamento da página
  
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
  
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: senha }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.token) {
          console.log('Login bem-sucedido:', data);
  
          localStorage.setItem('authToken', data.token);
  
          window.location.href = 'index.html';
        } else {
          alert('Erro ao autenticar. Por favor, tente novamente.');
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      alert('Não foi possível realizar o login. Verifique sua conexão e tente novamente.');
    }
  }
  