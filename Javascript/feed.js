window.addEventListener('load', () => {
  const menuLateral = document.querySelector('.menu__flutuante');
  menuLateral.classList.add('loaded');
  const containerPrincipal = document.querySelector('.container__principal');
  containerPrincipal.classList.add('loaded');

  const projeto1Img = document.getElementById("post1Img");
  const projeto1Nome = document.getElementById("post1Nome");
  const projeto1Descricao = document.getElementById("post1Descricao");

  const projetoJSON = sessionStorage.getItem("projeto");
  if (projetoJSON) {
    const projeto = JSON.parse(projetoJSON);

    projeto1Img.src = projeto.imagem;
    projeto1Nome.textContent = projeto.nome;
    projeto1Descricao.textContent = projeto.descricao;
  } else {return;}
  });
