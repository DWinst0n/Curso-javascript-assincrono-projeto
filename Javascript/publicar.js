document.getElementById("descricaoTexto").addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
window.addEventListener('load', () => {
  const menuLateral = document.querySelector('.menu__lateral');
  menuLateral.classList.add('loaded');
  const containerPrincipal = document.querySelector('.container__principal');
  containerPrincipal.classList.add('loaded');
})
  