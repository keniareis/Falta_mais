const API_URL = 'http://localhost:3000';

const registerForm = document.getElementById("signin-form");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    try {
        const response = await fetch(`${API_URL}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }), 
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || "Erro ao cadastrar. Tente novamente.");
        }

        const data = await response.json();
        successMessage.textContent = "Cadastro realizado com sucesso!";
        successMessage.style.display = "block";
        console.log(data);

        setTimeout(() => {
            window.location.href = "./index.html"; 
        }, 2000);


        registerForm.reset();
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
        console.error("Erro:", error.message);
    }
});
