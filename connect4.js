var jogadorVermelho = "V";
var jogadorAmarelo = "A";
var jogadorAtual = jogadorVermelho;


if (jogadorAtual == jogadorVermelho)
{
    document.getElementById("vezJogador").innerHTML = "Quem começa: Jogador 1";
}
else 
{
    document.getElementById("vezJogador").innerHTML = "Quem começa: Jogador 2";
}

window.onload = function() {
    iniciarJogo();
}

var jogoEncerrado = false;
var tabuleiro;

var linhas = 6;
var colunas = 7;
var colunasAtuais = [];

document.getElementById('corJogador1').addEventListener('input', mudarCor1);
document.getElementById('corJogador2').addEventListener('input', mudarCor2);
let cor1;
let cor2;

function mudarCor1 () {
    cor1 = document.getElementById('corJogador1').value;
    let bolinhas = document.querySelectorAll(".peca-vermelha");
    for (let i = 0; i < bolinhas.length; i++ )
    {
        bolinhas[i].style.backgroundColor = cor1;
    }
}

function mudarCor2 () {
    cor2 = document.getElementById('corJogador2').value;
    let bolinhas = document.querySelectorAll(".peca-amarela");
    for (let i = 0; i < bolinhas.length; i++ )
    {
        bolinhas[i].style.backgroundColor = cor2;
    }
}


function iniciarJogo() {
    tabuleiro = [];
    colunasAtuais = [5, 5, 5, 5, 5, 5, 5];



    for (let r = 0; r < linhas; r++) {
        let linha = [];
        for (let c = 0; c < colunas; c++) {
            // JS
            linha.push(' ');
            // HTML
            let celula = document.createElement("div");
            celula.id = r.toString() + "-" + c.toString();
            celula.classList.add("celula");
            celula.addEventListener("click", colocarPeca);
            document.getElementById("tabuleiro").append(celula);
        }
        tabuleiro.push(linha);
    }
}

function colocarPeca() {
    let jogadorDaVez = document.querySelector("#vezJogador");
    if (jogoEncerrado) {
        return;
    }

    // Obter coordenadas da célula clicada
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Descobrir em qual linha a coluna atual deve estar
    r = colunasAtuais[c]; 

    if (r < 0) {
        return;
    }

    tabuleiro[r][c] = jogadorAtual;
    let celula = document.getElementById(r.toString() + "-" + c.toString());
    if (jogadorAtual == jogadorVermelho) {
        celula.classList.add("peca-vermelha");
        celula.style.backgroundColor = cor1;
        jogadorAtual = jogadorAmarelo;
        jogadorDaVez.innerHTML = "Vez do: Jogador 2";
    }
    else {
        celula.classList.add("peca-amarela");
        jogadorAtual = jogadorVermelho;
        celula.style.backgroundColor = cor2;
        jogadorDaVez.innerHTML = "Vez do: Jogador 1";
    }



    r -= 1;
    colunasAtuais[c] = r;

    verificarVencedor();
}

function verificarVencedor() {
    // horizontal
    for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas - 3; c++){
            if (tabuleiro[r][c] != ' ') {
                if (tabuleiro[r][c] == tabuleiro[r][c+1] && tabuleiro[r][c+1] == tabuleiro[r][c+2] && tabuleiro[r][c+2] == tabuleiro[r][c+3]) {
                    definirVencedor(r, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < colunas; c++) {
        for (let r = 0; r < linhas - 3; r++) {
            if (tabuleiro[r][c] != ' ') {
                if (tabuleiro[r][c] == tabuleiro[r+1][c] && tabuleiro[r+1][c] == tabuleiro[r+2][c] && tabuleiro[r+2][c] == tabuleiro[r+3][c]) {
                    definirVencedor(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < linhas - 3; r++) {
        for (let c = 0; c < colunas - 3; c++) {
            if (tabuleiro[r][c] != ' ') {
                if (tabuleiro[r][c] == tabuleiro[r+1][c+1] && tabuleiro[r+1][c+1] == tabuleiro[r+2][c+2] && tabuleiro[r+2][c+2] == tabuleiro[r+3][c+3]) {
                    definirVencedor(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < linhas; r++) {
        for (let c = 0; c < colunas - 3; c++) {
            if (tabuleiro[r][c] != ' ') {
                if (tabuleiro[r][c] == tabuleiro[r-1][c+1] && tabuleiro[r-1][c+1] == tabuleiro[r-2][c+2] && tabuleiro[r-2][c+2] == tabuleiro[r-3][c+3]) {
                    definirVencedor(r, c);
                    return;
                }
            }
        }
    }
}

function definirVencedor(r, c) {
    let vencedor = document.getElementById("vencedor");
    if (tabuleiro[r][c] == jogadorVermelho) {
        vencedor.innerText = "Jogador 1 Venceu";
    } else {
        vencedor.innerText = "Jogador 2 Venceu";
    }
    jogoEncerrado = true;
}

function reiniciarJogo() {
    // Limpar o tabuleiro
    document.querySelector("#tabuleiro").innerHTML = "";
    
    // Reiniciar o estado do jogo
    iniciarJogo();
    
    // Limpar o vencedor e permitir novas jogadas
    document.getElementById("vencedor").innerText = "";
    jogoEncerrado = false;
    jogadorAtual = jogadorVermelho;
    document.getElementById("vezJogador").innerHTML = "Quem começa: Jogador 1";
}