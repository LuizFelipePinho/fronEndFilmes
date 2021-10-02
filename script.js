const urlApi = 'http://localhost:3000/filmes'
const container = document.querySelector(".container");

// let filmesAtuaisRenderizados = [];

// const identificadoAleatorio = () => Math.floor(Math.random() * 1000);

const botaoEnviar = document.querySelector(".enviar");

const salvaFilme = async (nome, imagem, genero, nota) => {

  const obj = {
    nome: nome,
    imagem: imagem,
    genero: genero,
    nota: nota,
    id: ''
  };

  const request = new Request(`${urlApi}/add`,{
    method: 'POST',
    body: JSON.stringify(obj),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  const response = await fetch(request);
  const result = await response.json();

  if(result){
    container.innerHTML = '';
    render()
  }



}

//   filmeAtual.push(obj);

//   filmesAtuaisRenderizados.push(obj);

//   // valida se houver algum item renderizado, se tiver ele vai renderizar somente o filme adicionado e se nao renderiza tudo q tiver na lista
//   // joga pra dentro do render
//   if (filmesAtuaisRenderizados.length > 0) {
//     // tem que fazer uma validação pra procurar dentro dos filmesRenderizados se o filmeAtual está renderizado, se nao tiver, põe pra renderizar ele, se tiver não renderiza novamente

//     render(filmeAtual);
//   } else {
//     render(filmesAtuaisRenderizados);
//   }
// };

const render = async () => {

  const response = await fetch(urlApi)

  const data = await response.json()
 
  console.log(data);


  // vai iterar pelo elemento da lista e armazenar o elemento dentro
  const elemento = data.map((elemento) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="box" data-key="${elemento.id}">
                <div class="opcoesFilmes">
                    <img class="imgEditar" src="botao-editar.png">
                    <img class="imgDeletar" src="botao-de-deletar.png" onClick="deletar(${elemento.id})">
    
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
  });
};

render()

// const deletar = (id) => {
//   // vamos fazer uma logica que tire o elemento a partir do id recebido da lista de filmesAtuaisRenderizados
//   const indiceElemento = () => {
//     for (let i = 0; i < filmesAtuaisRenderizados.length; i++) {
//       if (filmesAtuaisRenderizados[i].id == id) {
//         return i;
//       }
//     }
//   };

//   const indice = indiceElemento();

//   filmesAtuaisRenderizados[indice].deletar = true;

//   const elementoExist = document.querySelector(`[data-key='${id}']`);
//   console.log(elementoExist);

//   filmesAtuaisRenderizados.splice(indice, 1);
//   console.log(filmesAtuaisRenderizados);

//   elementoExist.remove();
// };


botaoEnviar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value;

  const imagem = document.querySelector("#imagem").value;

  const genero = document.querySelector("#genero").value;

  const nota = document.querySelector("#nota").value;

  salvaFilme(nome, imagem, genero, nota);


});

// pra fazer o delete eu preciso criar o get que mostra atraves do /id
const deletar = async (id) => {
  const request = new Request(`${urlApi}/${id}`, {
    method: 'DELETE',
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data);
  
  container.innerHTML = '';
  render()
}


// salva no localStorage toda vez que algum elemento for renderizado, por isso q chamei ela na função render
// const addToLocalStorage = () => {
//   localStorage.setItem('filmes', JSON.stringify(filmesAtuaisRenderizados))
// }

// const renderListStorege = () => {
//   const listFilmeStorege = localStorage.getItem('filmes')


//   if(listFilmeStorege.length > 0) {
//     todosFilmes = JSON.parse(listFilmeStorege);
//     console.log(todosFilmes)
//     render(todosFilmes)

//   }
// }

// renderListStorege()



// preciso criar uma logica que quando o elemento é excluido ele é exlcuido do localStorege 