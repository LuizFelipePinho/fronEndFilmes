const urlApi = "http://localhost:3000/filmes";
const container = document.querySelector(".container");
let edicao = false;
let idEdicao = 0;

const limpaInput = () => {
  const nome = document.getElementById("nome");
  const imagem = document.getElementById("imagem");
  const genero = document.getElementById("genero");
  const nota = document.getElementById("nota");

  nome.value = "";
  imagem.value = "";
  genero.value = "";
  nota.value = "";
};

// let filmesAtuaisRenderizados = [];

// const identificadoAleatorio = () => Math.floor(Math.random() * 1000);

const botaoEnviar = document.querySelector(".enviar");

const salvaFilme = async (nome, imagem, genero, nota) => {
  const obj = {
    nome: nome,
    imagem: imagem,
    genero: genero,
    nota: nota,
    assistido: false,
  };

  if (!edicao) {
    const request = new Request(`${urlApi}/add`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const result = await response.json();

    if (result) {
      container.innerHTML = "";
      render();
    }
  } else {
    const request = new Request(`${urlApi}/${idEdicao}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const result = await response.json();

    container.innerHTML = "";

    if (result) {
      limpaInput();
      edicao = false;
      render();
    }
  }

  //tenho que limpar  o input, mas ele tá la na outra parte da função
};

const render = async () => {
  const response = await fetch(urlApi);

  const data = await response.json();

  // vai iterar pelo elemento da lista e armazenar o elemento dentro
  const elemento = data.map((elemento) => {
    // verificar cada elemento se o assistido estiver true renderize com determinada classe

    if (elemento.assistido == true) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="box preencheBorda" data-key="${elemento.id}">
                  <div class="opcoesFilmes">
                      <img class="imgOpcoes" src="assistindo.png" onClick="assistir(${elemento.id})"> 
                      <img class="imgOpcoes" src="botao-editar.png" onClick="atualizar(${elemento.id})">
                      <img class="imgOpcoes" src="botao-de-deletar.png" onClick="deletar(${elemento.id})">
                  </div>
                  <p class="titulo-box">${elemento.nome}</p>
                  <img class="imagemBox" src="${elemento.imagem}" >
                  <div class="infos">
                      <p class="infoGenero">${elemento.genero}</p>
                      <p class="info">
                      <img class="estrelaBox estrelaJS" src="estrela.png" >
                      ${elemento.nota}/10
                      </p>
                  </div>
              </div
          `
      );
    } else if (elemento.assistido == false) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="box" data-key="${elemento.id}">
                  <div class="opcoesFilmes">
                      <img class="imgOpcoes" src="assistindo.png" onClick="assistir(${elemento.id})"> 
                      <img class="imgOpcoes" src="botao-editar.png" onClick="atualizar(${elemento.id})">
                      <img class="imgOpcoes" src="botao-de-deletar.png" onClick="deletar(${elemento.id})">
                  </div>
                  <p class="titulo-box" id="${elemento.id}">${elemento.nome}</p>
                  <img class="imagemBox" src="${elemento.imagem}" >
                  <div class="infos">
                      <p class="infoGenero">${elemento.genero}</p>
                      <p class="info">
                      <img class="estrelaBox estrelaJS" src="estrela.png" >
                      ${elemento.nota}/10
                      </p>
                  </div>
              </div
          `
      );
    }
  });
};

render();

botaoEnviar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value;

  const imagem = document.querySelector("#imagem").value;

  const genero = document.querySelector("#genero").value;

  const nota = document.querySelector("#nota").value;

  salvaFilme(nome, imagem, genero, nota);
});

const getFilmeById = async (id) => {
  const response = await fetch(`${urlApi}/${id}`);
  return (filme = response.json());
};

const atualizar = async (id) => {
  edicao = true;
  idEdicao = id;
  console.log(id);

  const filme = await getFilmeById(id);

  const nome = document.getElementById("nome");
  const imagem = document.getElementById("imagem");
  const genero = document.getElementById("genero");
  const nota = document.getElementById("nota");

  nome.value = filme[0].nome;
  imagem.value = filme[0].imagem;
  genero.value = filme[0].genero;
  nota.value = filme[0].nota;
};

// pra fazer o delete eu preciso criar o get que mostra atraves do /id
const deletar = async (id) => {
  const request = new Request(`${urlApi}/${id}`, {
    method: "DELETE",
  });
  const response = await fetch(request);
  const data = await response.json();
  console.log(data);

  container.innerHTML = "";
  render();
};

const assistir = async (id) => {
  const filmeAssistido = await getFilmeById(id);
  if (filmeAssistido[0].assistido == false) {
    const obj = {
      nome: filmeAssistido[0].nome,
      imagem: filmeAssistido[0].imagem,
      genero: filmeAssistido[0].genero,
      nota: filmeAssistido[0].nota,
      assistido: true,
      id: "",
    };

    console.log(obj);

    const request = new Request(`${urlApi}/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const result = await response.json();

    container.innerHTML = "";

    if (result) {
      render();
      // empurrar um atributo para alterar o border n precisa renderizar mas se reiniciar a page ela some :/
    }
  } else if (filmeAssistido[0].assistido == true) {
    const obj = {
      nome: filmeAssistido[0].nome,
      imagem: filmeAssistido[0].imagem,
      genero: filmeAssistido[0].genero,
      nota: filmeAssistido[0].nota,
      assistido: false,
      id: "",
    };

    console.log(obj);

    const request = new Request(`${urlApi}/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const result = await response.json();

    container.innerHTML = "";

    if (result) {
      render();
      // empurrar um atributo para alterar o border n precisa renderizar mas se reiniciar a page ela some :/
    }
  }
};
