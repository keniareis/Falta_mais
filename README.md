# Falta+ 🎓

Aplicação para controle de frequência acadêmica com autenticação JWT e gestão de disciplinas.

Um sistema feito para estudantes que *não gostam de surpresas na hora das faltas.* Aqui você sabe exatamente o que tá rolando: quem tá tranquilo e quem já tá flertando com a reprovação.  

https://github.com/user-attachments/assets/02ea48dd-0c71-4c4e-8513-da08793643ea


## ✨ Funcionalidades
- ✅ Autenticação JWT
- 👤 CRUD de usuários
- 📚 CRUD de disciplinas
- 📊 Controle de faltas (máximo permitido vs. faltas atuais)
- 📄 Documentação Swagger integrada
- 🌐 API RESTful

## 🚀 Primeiros Passos

### Pré-requisitos
- Node.js 18+
- MongoDB
- NPM

### Instalação
```bash
git clone https://github.com/keniareis/Falta_mais.git
cd Falta_mais

# Instalar dependências
ou npm install

# Configurar ambiente (crie um arquivo .env)
cp .env.example .env
```

### Configuração do .env
```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/falta-mais
JWT_SECRET=sua_chave_secreta_jwt
```

### Execução
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm build
npm start
```

## 📚 Documentação da API
Acesse a documentação interativa em:  
🔗 [Documentação no Swagger](https://api-falta-mais.onrender.com/doc/)

## 🛠️ Stack Tecnológica
- **Backend**
  - Node.js
  - Express
  - MongoDB/Mongoose
  - JWT
  - Swagger (OpenAPI 3.0)
  - 
- **DevOps**
  - Render (deploy)
  - ESLint


## 🤝 Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feat/nova-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feat/nova-feature`
5. Abra um Pull Request

## ✉️ Contato
**Kênia Reis**  
📧 [keniaolivereis@gmail.com](mailto:keniaolivereis@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/kenia-de-oliveira/)

---

<p align="center">
  Desenvolvido com ❤️ por <a href="https://github.com/keniareis">Kênia Reis</a>
</p>
