# 📄 Formulário de Inscrição e Login

## 🧩 O que é o projeto

Este projeto é uma página web focada no desenvolvimento de um formulário de inscrição e login, permitindo que usuários preencham seus dados de maneira intuitiva e segura. 

Todo o fluxo é implementado majoritariamente em front-end (**HTML**, **CSS** e **JavaScript**), sem necessidade de integração com banco de dados.  

Os dados são armazenados de forma temporária utilizando o **localStorage** do navegador.

---

## 🛠️ Como rodar localmente

Para executar o projeto na sua máquina, siga os passos abaixo:

1. Clone este repositório ou baixe-o manualmente:

   ```bash
   git clone https://github.com/PKevin333/trilhas-project.git
   ```

2. Abra a pasta do projeto no seu editor de código (ex: **Visual Studio Code**).

3. Utilize uma extensão como **Live Server** (ou qualquer outra que simule um servidor local).

4. Com o servidor ativo, acesse o endereço `http://localhost:5500` (ou a porta correspondente) no navegador.

---

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- **HTML5** — estrutura semântica da página  
- **CSS3** — estilos e microinterações  
- **JavaScript** — validações, lógica de formulário e manipulação do localStorage

---

## ✨ Principais funcionalidades

- 📱 **Responsividade**: O layout do formulário se adapta a diferentes tamanhos de tela
- 📥 **Formulário completo de registro**
- 🔒 **Validação de campos** com mensagens de erro claras
- 💾 **Armazenamento local** (localStorage) para simular persistência de dados
- 🎨 **Microinterações** com animações CSS que melhoram a usabilidade
- ✅ **Validações eficientes** (ao perder o foco do campo) e também no envio final do formulário
- 🔐 **Simulação de login** com verificação de nome de usuário e senha cadastrados

---

### 🔍 Como funcionam as validações

As validações ocorrem em dois momentos:

1. **Durante o preenchimento**:  
   Usando os eventos `blur` e `change`, campos inválidos são destacados assim que o usuário interage com eles.

2. **No envio do formulário**:  
   Todos os campos são verificados antes do envio. Caso haja algum erro, o formulário não é enviado e o usuário recebe orientações para correção.
