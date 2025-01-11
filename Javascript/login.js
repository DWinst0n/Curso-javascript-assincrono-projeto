window.addEventListener('load', () => {
  const containerPrincipal = document.querySelector('.container__principal');
  containerPrincipal.classList.add('loaded');
});
const checkbox = document.getElementById("checkbox");
const checkboxContainer = document.getElementById("checkbox-customizado");

checkbox.addEventListener('click', () => {
  checkboxContainer.classList.add('checked');
  if (checkbox.checked) {
    checkboxContainer.classList.remove('checked');
  }
})