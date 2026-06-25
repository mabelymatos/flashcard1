const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?#$&';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 4) { // Evita senhas curtas demais
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 25) { 
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

checkboxes.forEach(checkbox => {
    checkbox.onclick = geraSenha;
});

// Define o ano atual no footer de forma dinâmica
document.getElementById('ano-atual').textContent = new Date().getFullYear();

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkboxes[0].checked) alfabeto += letrasMaiusculas;
    if (checkboxes[1].checked) alfabeto += letrasMinusculas;
    if (checkboxes[2].checked) alfabeto += numeros;
    if (checkboxes[3].checked) alfabeto += simbolos;

    if (alfabeto === '') {
        campoSenha.value = 'Selecione uma opção!';
        forcaSenha.className = 'forca';
        forcaSenha.style.width = '0%';
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca','media','forte');
    
    if (entropia > 57){
        forcaSenha.classList.add('forte');
        forcaSenha.style.width = '100%';
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
        forcaSenha.style.width = '66%';
    } else {
        forcaSenha.classList.add('fraca');
        forcaSenha.style.width = '33%';
    }
    
    const valorEntropia = document.querySelector('.entropia');
    let dias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));
    
    if (dias < 1) {
        valorEntropia.textContent = "Um computador pode descobrir essa senha instantaneamente.";
    } else {
        valorEntropia.textContent = "Um computador pode levar cerca de " + dias.toLocaleString() + " dias para descobrir essa senha.";
    }
}
