// ===== Elementos da página =====
const secao = document.getElementById('diagnostico');
const etapaModelo = document.getElementById('etapa-modelo');
const etapaProblemas = document.getElementById('etapa-problemas');
const resultado = document.getElementById('resultado');
const modelo = document.getElementById('modelo');
const btnIniciar = document.getElementById('btn-iniciar');

// ===== Limpa os campos e deixa a etapa 1 pronta =====
function reiniciar() {
  modelo.value = '';

  const marcado = document.querySelector('input[name="problema"]:checked');
  if (marcado) marcado.checked = false;

  resultado.hidden = true;
  etapaProblemas.hidden = true;
  etapaModelo.hidden = false;
}

// ===== Botão "Iniciar diagnóstico" =====
btnIniciar.addEventListener('click', () => {
  reiniciar();
  btnIniciar.hidden = true;   // some durante o diagnóstico
  secao.hidden = false;
  secao.scrollIntoView({ behavior: 'smooth' });
});

// ===== Etapa 1 -> 2 =====
document.getElementById('btn-proximo').addEventListener('click', () => {
  if (!modelo.value.trim()) {
    alert('Informe o modelo, a motorização e o ano do carro.');
    return;
  }
  etapaModelo.hidden = true;
  etapaProblemas.hidden = false;
});

// ===== Etapa 2 -> 1 =====
document.getElementById('btn-voltar').addEventListener('click', () => {
  etapaProblemas.hidden = true;
  etapaModelo.hidden = false;
});

// ===== Envio do diagnóstico =====
document.getElementById('btn-diagnosticar').addEventListener('click', () => {
  const escolhido = document.querySelector('input[name="problema"]:checked');

  if (!escolhido) {
    alert('Selecione um problema.');
    return;
  }

  const dados = { carro: modelo.value.trim(), problema: escolhido.value };
  console.log(dados); // depois, é aqui que enviamos ao Python

  etapaProblemas.hidden = true;
  resultado.hidden = false;
  document.getElementById('resultado-texto').textContent =
    'Em breve: o resultado do diagnóstico aparece aqui.';
});

// ===== Botão "Novo diagnóstico": volta para a tela inicial =====
document.getElementById('btn-novo').addEventListener('click', () => {
  reiniciar();
  secao.hidden = true;        // esconde o diagnóstico
  btnIniciar.hidden = false;  // o botão de iniciar volta a aparecer
  window.scrollTo({ top: 0, behavior: 'smooth' });
});