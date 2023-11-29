var jogadorVermelho = "V";
var jogadorAmarelo = "A";
var jogadorAtual = jogadorVermelho;
let jogador1 = "Jogador 1";
let jogador2 = "Jogador 2";
let modowhatzap = 0;
var somEasteregg = document.getElementById("meuSom");




if (jogadorAtual == jogadorVermelho) {
    document.getElementById("vezJogador").innerHTML = `Quem começa: ${jogador1}`;
}
else {
    document.getElementById("vezJogador").innerHTML = `Quem começa: ${jogador2}`;
}

window.onload = function () {
    iniciarJogo();
    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
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

function mudarCor1() {
    cor1 = document.getElementById('corJogador1').value;
    let bolinhas = document.querySelectorAll(".peca-vermelha");
    for (let i = 0; i < bolinhas.length; i++) {
        bolinhas[i].style.backgroundColor = cor1;
    }
}

function mudarCor2() {
    cor2 = document.getElementById('corJogador2').value;
    let bolinhas = document.querySelectorAll(".peca-amarela");
    for (let i = 0; i < bolinhas.length; i++) {
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

    if (modowhatzap) {
        somEasteregg.currentTime = 0;
        somEasteregg.play();

    }
    tabuleiro[r][c] = jogadorAtual;
    let celula = document.getElementById(r.toString() + "-" + c.toString());
    if (jogadorAtual == jogadorVermelho) {
        celula.classList.add("peca-vermelha");
        celula.style.backgroundColor = cor1;
        jogadorAtual = jogadorAmarelo;
        jogadorDaVez.innerHTML = `Vez do: ${jogador2}`;
    }
    else {
        celula.classList.add("peca-amarela");
        jogadorAtual = jogadorVermelho;
        celula.style.backgroundColor = cor2;
        jogadorDaVez.innerHTML = `Vez do: ${jogador1}`;
    }



    r -= 1;
    colunasAtuais[c] = r;

    verificarVencedor();
}

function verificarVencedor() {
    // horizontal
    for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas - 3; c++) {
            if (tabuleiro[r][c] != ' ') {
                if (tabuleiro[r][c] == tabuleiro[r][c + 1] && tabuleiro[r][c + 1] == tabuleiro[r][c + 2] && tabuleiro[r][c + 2] == tabuleiro[r][c + 3]) {
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
                if (tabuleiro[r][c] == tabuleiro[r + 1][c] && tabuleiro[r + 1][c] == tabuleiro[r + 2][c] && tabuleiro[r + 2][c] == tabuleiro[r + 3][c]) {
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
                if (tabuleiro[r][c] == tabuleiro[r + 1][c + 1] && tabuleiro[r + 1][c + 1] == tabuleiro[r + 2][c + 2] && tabuleiro[r + 2][c + 2] == tabuleiro[r + 3][c + 3]) {
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
                if (tabuleiro[r][c] == tabuleiro[r - 1][c + 1] && tabuleiro[r - 1][c + 1] == tabuleiro[r - 2][c + 2] && tabuleiro[r - 2][c + 2] == tabuleiro[r - 3][c + 3]) {
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
        vencedor.innerText = `${jogador1} venceu`;
    } else {
        vencedor.innerText = `${jogador2} venceu`;
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

}





var jogadores = [];



function criarConta() {
    var username = document.getElementById('player1Username').value;
    var password = document.getElementById('player1Password').value;

    // Recuperar dados dos jogadores salvos no localStorage
    var jogadoresSalvos = JSON.parse(localStorage.getItem('jogadores')) || [];

    jogadoresSalvos.push({
        username: username,
        password: password
    });

    // Atualizar o localStorage com os novos dados
    localStorage.setItem('jogadores', JSON.stringify(jogadoresSalvos));

    // Atualizar a variável jogadores com os novos dados
    jogadores = jogadoresSalvos;
}

function pro2() {
    var username = document.getElementById('player2Username').value;
    var password = document.getElementById('player2Password').value;

    // Recuperar dados dos jogadores salvos no localStorage
    var jogadoresSalvos = JSON.parse(localStorage.getItem('jogadores')) || [];

    jogadoresSalvos.push({
        username: username,
        password: password
    });

    // Atualizar o localStorage com os novos dados
    localStorage.setItem('jogadores', JSON.stringify(jogadoresSalvos));

    // Atualizar a variável jogadores com os novos dados
    jogadores = jogadoresSalvos;
}



function concluirLogin() {
    // Obter dados dos formulários
    var username1 = document.getElementById('player1Username').value;
    var password1 = document.getElementById('player1Password').value;
    var username2 = document.getElementById('player2Username').value;
    var password2 = document.getElementById('player2Password').value;

    // Recuperar dados dos jogadores salvos no localStorage
    var jogadoresSalvos = JSON.parse(localStorage.getItem('jogadores')) || [];

    var player1LoggedIn = false;
    var player2LoggedIn = false;

    for (let i = 0; i < jogadoresSalvos.length; i++) {
        if (username1 == jogadoresSalvos[i].username && password1 == jogadoresSalvos[i].password) {
            player1LoggedIn = true;
        }

        if (username2 == jogadoresSalvos[i].username && password2 == jogadoresSalvos[i].password) {
            player2LoggedIn = true;
        }
    }

    if (player1LoggedIn && player2LoggedIn) {
        alert('Ambos os jogadores fizeram login com sucesso. Agora você pode prosseguir.');
        document.getElementById("drake").innerHTML = `<button type="button" class="btn btn-primary" onclick="concluirLogin()">Concluir</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`;
        jogador1 = username1;
        jogador2 = username2;
        if (jogadorAtual == jogadorVermelho) {
            document.getElementById("vezJogador").innerHTML = `Quem começa: ${jogador1}`;
        }
        else {
            document.getElementById("vezJogador").innerHTML = `Quem começa: ${jogador2}`;
        }

        document.getElementById("nathan").innerHTML = `Escolha uma cor para o ${jogador1}:`;
        document.getElementById("nate").innerHTML = `Escolha uma cor para o ${jogador2}:`;

    } else {
        alert('Alguns jogadores não fizeram login com sucesso. Verifique os dados e tente novamente.');
    }
}


cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    if (modowhatzap == 0) {
        modowhatzap = 1;
        window.alert("Modo WhatsApp ativado");
    }
    else
    {
        modowhatzap = 0;
        window.alert("Modo WhatsApp desativado :(");
    }
});





















document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');

    menuBtn.addEventListener('click', function () {
        menuBtn.style.left = menuBtn.style.left == '260px' ? '10px' : '260px';
        menuBtn.innerHTML = menuBtn.innerHTML === "&lt;" ? "&gt;" : "&lt;";
        sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
        
        
    });
});

















document.getElementById('downloadButton').addEventListener('click', salvarLocalStorageComoJSON);
function salvarLocalStorageComoJSON() {
    // Obter dados do localStorage
    var dados = localStorage.getItem('jogadores');

    // Verificar se há dados a serem salvos
    if (dados) {
        // Criar um Blob com os dados JSON
        var blob = new Blob([dados], { type: 'application/json' });

        // Criar um link para download
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        // Definir o nome do arquivo (pode ser personalizado)
        link.download = 'meusDados.json';

        // Adicionar o link ao documento e acionar o clique para iniciar o download
        document.body.appendChild(link);
        link.click();

        // Remover o link do documento
        document.body.removeChild(link);
    } else {
        console.log('Nenhum dado no localStorage para salvar.');
    }
}


document.getElementById('fileInput').addEventListener('change', function() {
    carregarDadosDoArquivo(this);
});

function carregarDadosDoArquivo(inputFile) {
    var file = inputFile.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            // Obter dados do arquivo
            var dadosDoArquivo = e.target.result;

            try {
                // Parse os dados JSON
                var jsonData = JSON.parse(dadosDoArquivo);

                // Salvar os dados no localStorage
                localStorage.setItem('jogadores', JSON.stringify(jsonData));

                console.log('Dados carregados do arquivo e salvos no localStorage:', jsonData);
            } catch (error) {
                console.error('Erro ao analisar o arquivo JSON:', error);
            }
        };

        // Ler o conteúdo do arquivo como texto
        reader.readAsText(file);
    }
}

function carregarDadosDoGitHubESalvarNoLocalStorage() {
    $.ajax({
        type: 'GET',
        url: 'https://raw.githubusercontent.com/Flipsteam157/TP2-LPW-Connect4/main/meusDados.json',
        dataType: 'json',
        success: function (resposta) {
            // Salvar os dados no localStorage
            localStorage.setItem('jogadores', JSON.stringify(resposta));

            console.log('Dados carregados do GitHub e salvos no localStorage:', resposta);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar dados do GitHub:', status, error);
        }
    });
}