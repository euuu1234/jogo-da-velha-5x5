let jogador = '1';
let cor1 = '#ff0000';
let cor2 = '#00ff00';

let largo;
let praVencer;


const jogador1 = [];
const jogador2 = [];

const altura = window.innerHeight
const largura = window.innerWidth

const tabuleiro = document.querySelector('main')

console.log(altura)

if (altura > largura){
    tabuleiro.style.width = (largura*0.9) + 'px'
    tabuleiro.style.height = (largura*0.9) + 'px'
}else if (altura < largura){
    tabuleiro.style.width = (altura*0.9) + 'px'
    tabuleiro.style.height = (altura*0.9) + 'px'
}
const alertar = (texto)=>{
    const tela = document.createElement('tela')
    const paragrafo = document.createElement('h1')
    const botao = document.createElement('button')

    botao.textContent = 'ok'
    botao.style.minWidth = '10%'
    botao.style.maxWidth = '100%'
    botao.style.padding = '1em'
    botao.style.borderRadius = '0.5em'
    botao.style.marginTop = '2em'
    botao.style.border = '5px solid blue'
    botao.style.fontSize = '2em'
    botao.style.color = 'red'
    botao.style.backgroundColor = 'blue'

    paragrafo.style.textTransform = 'uppercase'
    paragrafo.style.color = 'rgb(0, 0, 255)'
    paragrafo.style.fontWeight = '900'
    paragrafo.style.fontSize = '200%'
    paragrafo.style.textAlign = 'center'
    paragrafo.textContent = texto

    tela.style.width = '90%'
    tela.style.height = '90%'
    tela.style.backgroundColor = 'rgb(253, 253, 253)'
    tela.style.position = 'fixed'
    tela.style.top = '5%'
    tela.style.left = '5%'
    tela.style.display = 'flex'
    tela.style.flexDirection = 'column'
    tela.style.alignItems = 'center'
    tela.style.justifyContent = 'center'
    tela.style.borderRadius = '5em'
    tela.style.zIndex = '9999'
    tela.style.border = '10px solid blue'



    tela.appendChild(paragrafo)
    tela.appendChild(botao)
    document.body.appendChild(tela)
}


async function Prompt(texto){
    return new Promise((resolve)=>{
        const tela = document.createElement('tela')
        const paragrafo = document.createElement('h1')
        const input = document.createElement('input')

        input.type = 'text'
        input.style.minWidth = '50%'
        input.style.maxWidth = '51%'
        input.style.padding = '1em'
        input.style.borderRadius = '0.5em'
        input.style.marginTop = '2em'
        input.style.border = '5px solid blue'
        input.style.fontSize = '2em'
        input.style.color = 'red'
        input.placeholder = 'digite um numero entre 3 e 40'

        paragrafo.style.textTransform = 'uppercase'
        paragrafo.style.color = 'rgb(0, 0, 255)'
        paragrafo.style.fontWeight = '900'
        paragrafo.style.fontSize = '200%'
        paragrafo.style.textAlign = 'center'
        paragrafo.textContent = texto

        tela.style.width = '90%'
        tela.style.height = '90%'
        tela.style.backgroundColor = 'rgb(253, 253, 253)'
        tela.style.position = 'fixed'
        tela.style.top = '5%'
        tela.style.left = '5%'
        tela.style.display = 'flex'
        tela.style.flexDirection = 'column'
        tela.style.alignItems = 'center'
        tela.style.justifyContent = 'center'
        tela.style.borderRadius = '5em'
        tela.style.zIndex = '9999'
        tela.style.border = '10px solid blue'



        tela.appendChild(paragrafo)
        tela.appendChild(input)
        document.body.appendChild(tela)

        input.focus()

        input.addEventListener('keydown', (e)=>{
            if(e.key.toLowerCase() === 'enter'){
                if(parseInt(input.value)){
                    tela.remove()
                    resolve(parseInt(input.value))
                }
            }
        })
    })
}
async function inicio() {
    largo = await Prompt(
        'Digite o valor referente à largura do tabuleiro'
    );

    praVencer = await Prompt(
        'Digite o valor referente à sequência nescessária para a vitória'
    );

    if(
        praVencer <= largo &&
        largo >= 3 &&
        praVencer >= 3 &&
        largo <= 40
    )iniciar();
    else alertar('você deve digitar valores validos')
}

inicio();

function resetarJogo() {
    jogador1.length = 0
    jogador2.length = 0
    const casas = document.querySelectorAll('.click_box');
    const popup = document.querySelector('.popup')

    if(popup){
        popup.remove()
    }
    
    casas.forEach((e)=>{
        e.textContent = ''
        e.classList.remove('selected')
    });
}

function iniciar(){
    const qtn_casas = largo * largo;
    const alfabeto = [
        "A",
        "B",
        "C",
        "D",
        "E"
    ];

    const sequencias = [];
    let fonte
    for (let i = 1; i <= qtn_casas; i++) {
        const casa = document.createElement('div');
        casa.classList.add('click_box');

        casa.style.minWidth = (0.9/largo*100) + '%'
        casa.style.minHeight = (0.9/largo*100) + '%'

        
        
        casa.style.marginLeft = (0.1/largo*100) + '%'
        casa.style.marginTop = (0.1/largo*100) + '%'
        
        const coluna = i % largo == 0 ? largo : i % largo;
        const linha = Math.ceil(i / largo) - 1;
        
        document.querySelector('main').appendChild(casa);
        
        if ((qtn_casas / largo) <= 1) {
            casa.classList.add('A');
        }
        
        let j = i % largo - 1;
        
        casa.id = `c${coluna}-${alfabeto[linha]}-casa_00${i}`;
        fonte = casa.offsetHeight 
        console.log(casa.offsetHeight)

    }

    document.querySelectorAll('div').forEach((element)=>{
        element.style.fontSize = (fonte*0.5) + 'px'
    })


    inserirSequencia();

    function inserirSequencia(){
        let sequencia = [];
        let sequencia2 = [];
        let linha = 0;
        let coluna = 0;
        
        const linhas = ()=>{
            sequencia = [];

            for (let i = 1; i <= largo; i++) {
                sequencia.push(linha * largo + i);
            }

            sequencias.push(sequencia);

            if (linha < largo - 1) {
                linha++;
                linhas();
            }
        };
        const colunas = ()=>{
            sequencia = [];

            for (let i = 1; i <= largo; i++) {
                sequencia.push(coluna + largo * (i - 1) + 1);
            }

            if(sequencia.length >= praVencer)sequencias.push(sequencia);

            if (coluna < largo - 1) {
                coluna++;
                colunas();
            }
        };
        const diagonais = ()=>{
            sequencia = [];
            sequencia2 = [];
            let tmnSeq = largo;
            let tmnSeq2 = largo-1;
            let tmnSeqInv = 0;

            for (let i = 1; i <= qtn_casas; i++) {
                sequencia = [];
                sequencia2 = [];

                if(
                    i <= largo
                ){
                    let jjj = 0;

                    while (jjj <= largo) {
                        
                        const f = function (x){
                            if (x < largo) {
                                tmnSeq--;
                            }
                        }

                        f(jjj + i + (largo + 1) * jjj);

                        if(sequencia.length <= tmnSeq){
                            sequencia.push(i + (largo + 1) * jjj);
                        }

                        const g = function (x){
                            if (x <= largo) {
                                tmnSeqInv++
                            }
                        }

                        g(jjj + i + (largo + 1) * jjj);

                        if(sequencia2.length <= (tmnSeqInv-1)){
                            sequencia2.push(i + (largo - 1) * jjj);
                        }else if(!(sequencia.length <= tmnSeq)){
                            console.log('break');
                            break;
                        }
                        

                        jjj += 1;
                    }

                    jjj = 0;

                }else
                if(
                    i % largo === 1 && i !==1
                ){
                    if(i === largo + 1){tmnSeq = largo - 2; sequencia = []};
                    if(i != largo + 1){tmnSeq -= 1}
                    
                    let jjj = 0;
                    
                    while (jjj < (largo)) {
                        
                        if(sequencia.length <= tmnSeq){
                            sequencia.push(i + (largo + 1) * jjj);
                        }else{
                            console.log('break');
                            break;
                        }
                        jjj += 1;
                    }
                    

                }else
                if(
                    i % largo === 0 &&
                    i !== 0 &&
                    i !== largo
                ){
                    sequencia = [];
                    
                    let jjj = 0;

                    
                    
                    tmnSeq2--
                    while (jjj < (largo)) {
                        
                        
                        if(sequencia.length <= tmnSeq2){
                            sequencia.push(i + (largo - 1) * jjj);
                        }else break;
                        jjj += 1;
                    }

                    jjj = 0
                };
                if(sequencia[0] != undefined && sequencia.length >= praVencer )sequencias.push(sequencia);
                if(sequencia2[0] != undefined && sequencia2.length >= praVencer)sequencias.push(sequencia2);
            }
        }
        diagonais(); 
        linhas();
        colunas();  


    }

    document.addEventListener('click', function(event) {
        
        const target = event.target;

        if (target.closest('.click_box') && !target.classList.contains('selected')) {
            for (let i = 1; i <= qtn_casas; i++) {
                const linha = Math.ceil(i / largo) - 1;
                const seletor = `#c${i%largo == 0 ? largo : i%largo}-${alfabeto[linha]}-casa_00${i}`;

                if (target.closest(seletor)) {
                    target.innerHTML = desenhar(jogador);

                    target.classList.add('selected');

                    document.querySelector('h2').innerHTML = `Vez do jogador: ${jogador == '1' ? 'o' : 'x'}`;

                    if (jogador == '1') {
                        target.style.color = cor1;
                        jogador = '0';

                        jogador1.push(parseInt(target.id.slice(-3)));
                        verificarVencedor('1');

                    }else if (jogador == '0') {
                        target.style.color = cor2;
                        jogador = '1';
                        
                        jogador2.push(parseInt(target.id.slice(-3)));
                        verificarVencedor('0');
                    }
                    break;
                }
            }
        }
    });

    function desenhar(element) {
        if (element == '1'){
            return "X";
        }else if (element == '0'){
            return "O";
        }
    }

    function verificarVencedor(jogador) {
        const casasJogador = jogador === '1' ? jogador1 : jogador2;

        if (casasJogador.length < praVencer) {
            return false;
        }
        
        const numeroJogador = jogador === '1' ? 1 : 2;

        for (const sequencia of sequencias) {
            let valor = 0;

            for (const casa of sequencia) {
                if (casasJogador.includes(casa)) {
                    valor++;
                } else {
                    valor = 0;
                }

                if (valor >= praVencer) {
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

        const vencedor = jogador == '1'? "x" : 'o';
        const corVencedor = jogador == '1'? cor1 : cor2;

        popup.innerHTML = `<h2 style="color: ${corVencedor}">Jogador "${vencedor}" venceu!</h2><button onclick="resetarJogo()">Reiniciar</button>`;
        document.body.appendChild(popup);
    }
}