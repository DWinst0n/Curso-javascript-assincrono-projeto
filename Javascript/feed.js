const menuLateral = document.querySelector('.menu__flutuante');
const containerPrincipal = document.querySelector('.container__principal');
const tagsOriginais = document.querySelectorAll(".original");
const projeto1Img = document.getElementById("post1Img");
const projeto1Nome = document.getElementById("post1Nome");
const projeto1Descricao = document.getElementById("post1Descricao");
const tagsLista = document.getElementById("tagsLista");

window.addEventListener('load', () => {
  menuLateral.classList.add('loaded');
  containerPrincipal.classList.add('loaded');
  const projetoJSON = sessionStorage.getItem("projeto");
  if (projetoJSON) {
    const projeto = JSON.parse(projetoJSON);
    projeto1Img.src = projeto.imagem;
    projeto1Nome.textContent = projeto.nome;
    projeto1Descricao.textContent = projeto.descricao;

    tagsLista.innerHTML = "";
    projeto.tags.forEach(tag => {
      const itemTag = document.createElement("li");
      itemTag.classList.add("lista__tags__item");

      const svgX = document.createElement("img");
      svgX.src = "../img/close-black.svg";
      itemTag.appendChild(svgX);

      const nomeTag = document.createElement("p");
      nomeTag.textContent = tag;
      nomeTag.classList.add("nome__tag");
      itemTag.appendChild(nomeTag);

      tagsLista.appendChild(itemTag);
      
      itemTag.addEventListener("click", () => {
        itemTag.remove();
      })
    })
  } else {return;}
  });

document.getElementById("limparTags").addEventListener("click", (e) => {
  e.preventDefault();

  tagsLista.innerHTML = "";
})

if(tagsOriginais.length > 0) {
  tagsOriginais.forEach(tag => {
    tag.addEventListener("click", () => {
      tag.remove();
    })
  });
}
