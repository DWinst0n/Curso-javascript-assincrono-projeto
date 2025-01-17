// animações
const descricaoProjeto = document.getElementById("descricaoTexto");
const nomeProjeto =  document.getElementById("nomeProjeto");

descricaoProjeto.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
window.addEventListener('load', () => {
  const menuLateral = document.querySelector('.menu__flutuante');
  menuLateral.classList.add('loaded');
  const containerPrincipal = document.querySelector('.container__principal');
  containerPrincipal.classList.add('loaded');
})
//upload de imagens
const projetoImagemContainer = document.querySelector(".carregar__projeto__container")
const uploadBotao = document.getElementById("upload-btn");
const inputImagemUpload = document.getElementById("imagemUpload");

uploadBotao.addEventListener("click", (event) => {
  event.preventDefault();

  inputImagemUpload.click();
});

const imagemPrincipal = document.getElementById("imagemProjeto");

function lerArquivo (arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name})
    }

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    }
    leitor.readAsDataURL(arquivo);
  })
}

inputImagemUpload.addEventListener("change", async (event)=> {
  const arquivo = event.target.files[0];

  if(arquivo) {
    try {
      const conteudoDoArquivo = await lerArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;

      const arquivoImagemNome = document.createElement("span");
      arquivoImagemNome.textContent = conteudoDoArquivo.nome;
      arquivoImagemNome.classList.add("projeto__arquivo")

      const apagarProjeto = document.createElement("span");

      apagarProjeto.classList.add("material-icons");
      apagarProjeto.innerHTML = "close";
      arquivoImagemNome.appendChild(apagarProjeto);

      projetoImagemContainer.appendChild(arquivoImagemNome);

      arquivoImagemNome.addEventListener("click", () => {
        document.querySelector(".projeto__arquivo").remove();
        imagemPrincipal.src = "../img/imagem1.png";
      })
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});
const inserirTags = document.getElementById("categoria");
const interacoes = ["blur", "keydown"];
const listaTags = document.querySelector(".lista__tags");

interacoes.forEach((evento) => {
  inserirTags.addEventListener(evento, (e) => {
    if (evento === 'keydown' && e.key !== 'Enter') {
      return;
    } else if (evento === 'blur' || (evento === 'keydown' && e.key === 'Enter')) {
      if (inserirTags.value.trim() !== "") {
        e.preventDefault();
        
        const tag = document.createElement("li");
        tag.classList.add("lista__tags__item");

        const svgX = document.createElement("img");
        svgX.src = "../img/close-black.svg";
        tag.appendChild(svgX);

        const nomeTag = document.createElement("p");
        nomeTag.classList.add("nome__tag");
        nomeTag.textContent = inserirTags.value;
        tag.appendChild(nomeTag);

        listaTags.appendChild(tag);
        inserirTags.value = "";
        
        tag.addEventListener("click", () => {
          tag.remove();
        })
      } else {
        return;
      }
    }
  });
});

const botaoDescartar =  document.getElementById("botaoDescartar");

botaoDescartar.addEventListener("click", (event) => {
  event.preventDefault();

  apagarProjeto();
  try {
    document.querySelector(".projeto__arquivo").remove();
  } catch (error) {
    return;
  }

});
function apagarProjeto() {
  imagemPrincipal.src = "../img/imagem1.png";
  nomeProjeto.value = "";
  descricaoProjeto.value = "";
  descricaoProjeto.style.height = "auto";
  descricaoProjeto.style.height = this.scrollHeight + "px";
  inserirTags.value = "";
  listaTags.innerHTML = "";
}

async function publicarProjeto(projeto) {
  return new Promise((resolve, reject) => {
    //para simular a conexão de um banco de dados
    setTimeout(() => {
      let conexaoBemSucedida = Math.random() > 0.01;
      if (conexaoBemSucedida) {
        const projetoJSON = JSON.stringify(projeto);
        sessionStorage.setItem("projeto", projetoJSON);
        resolve(projetoJSON);
      } else {
        reject("Para simular a realidade, tem 1% de chance de dar errado... pois tá aí...");
      }
    }, 2000);
  })
}
const botaoPublicar = document.getElementById("botaoPublicar");

botaoPublicar.addEventListener("click", async (event) => {
  event.preventDefault();
  if (nomeProjeto.value.trim() == "" ||imagemPrincipal.src == "../img/imagem1.png" || descricaoProjeto.value.trim() == "") {
    alert("Preencha todos os dados")
  } else {
    const projeto = {
      nome: nomeProjeto.value,
      imagem: imagemPrincipal.src,
      descricao: descricaoProjeto.value,
      tags: Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent)
    }
    try {
      resultado = await publicarProjeto(projeto);
      if (resultado) {
        alert("Projeto publicado com sucesso!");
        setTimeout(() => {
          window.location.href = "feed.html"
        }, 3000);
      }
    } catch (error) {
      alert(error);
    }
  }
});
