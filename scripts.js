// Menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navBar = document.querySelector(".navBar");
menuToggle.addEventListener("click", function () {
  navBar.classList.toggle("active");
});
// Fecha o menu ao clicar em um link
document.querySelectorAll(".list-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navBar.classList.remove("active");
  });
});

let botao = document.querySelector(".botao-tirar-duvida");

let endereco = "http://localhost:3000/duvida"; // endpoint do backend

async function tirarduvida() {
  let prompt = document.querySelector(".caixa-texto").value;
  let bloco_resposta = document.querySelector(".bloco_resposta");

  if(prompt == "") {
    alert("Conte-me sua dúvida");
    return;
  }

  document.querySelector(".caixa-texto").value = "";

  try {
    const resposta = await fetch(endereco, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const dados = await resposta.json();
    bloco_resposta.textContent = dados.resposta || "Não foi possível obter resposta.";
  } catch (e) {
    bloco_resposta.textContent = "Erro ao conectar com o bot.";
  }
}

botao.addEventListener("click", tirarduvida);

