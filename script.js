let jogador = '1';
let cor1 = '#ff0000';
let cor2 = '#00ff00';

const qtn_casas = 25;
const largo = 5;
const jogador1 = [];
const jogador2 = [];
const alfabeto = [
    "A",
    "B",
    "C",
    "D",
    "E"
];

const sequencias = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [1, 7, 13, 19, 25],
    [2, 8, 14, 20],
    [4, 8, 12, 16],
    [5, 9, 13, 17, 21],
    [6, 12, 18, 24],
    [10, 14, 18, 22]
];

for (let i = 1; i <= qtn_casas; i++) {
    const casa = document.createElement('div');
    casa.classList.add('click_box');

    const coluna = i % largo == 0 ? largo : i % largo;

    casa.id = `casa_00${i}`;

    casa.classList.add(`c${coluna}`);

    document.querySelector('main').appendChild(casa);

    if ((qtn_casas / largo) <= 1) {
        casa.classList.add('A');
    }

    let j = i % largo - 1;

    if(j >= 0)casa.classList.add(alfabeto[j]);

    if (i != 0 && i % largo == 0){
        casa.classList.add(alfabeto[largo - 1]);
    }
}

document.addEventListener('click', function(event) {
    
    const target = event.target;

    if (target.closest('.click_box') && !target.classList.contains('selected')) {
        const linha = [
            ".A",
            ".B",
            ".C",
            ".D",
            ".E"
        ];

        for (const selector of linha) {
            for (let i = 1; i <= largo; i++) {
                const seletor = `${selector}.c${i}`;

                if (target.closest(seletor)) {
                    target.innerHTML = desenhar(jogador);

                    target.classList.add('selected');

                    document.querySelector('h2').innerHTML = `Vez do jogador: ${jogador == '1' ? '2' : '1'}`;

                    if (jogador == '1') {
                        target.style.color = cor1;
                        jogador = '0';

                        jogador1.push(parseInt(target.id.slice(-3)));

                    }else if (jogador == '0') {
                        target.style.color = cor2;
                        jogador = '1';
                        
                        jogador2.push(parseInt(target.id.slice(-3)));
                    }
                    break;
                }
            }
        }

        verificarVencedor('1');
        verificarVencedor('0');
    }
});

function desenhar(element) {
    if (element == '1'){
        return "X";
    }else if (element == '0'){
        return "O";
    }
}

function resetarJogo() {
    const casas = document.querySelectorAll('.click_box');
    
    window.location.reload();
}

function verificarVencedor(jogador) {
    const casasJogador = jogador === '1' ? jogador1 : jogador2;
    const numeroJogador = jogador === '1' ? 1 : 2;

    for (const sequencia of sequencias) {
        let valor = 0;

        for (const casa of sequencia) {
            if (casasJogador.includes(casa)) {
                valor++;
            } else {
                valor = 0;
            }

            if (valor >= 4) {
                popupVencedor(numeroJogador);
                return true;
            }
        }
    }

    return false;
}

function popupVencedor(jogador) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `<h2>Jogador ${jogador} venceu!</h2><button onclick="resetarJogo()">Reiniciar</button>`;
    document.body.appendChild(popup);
}