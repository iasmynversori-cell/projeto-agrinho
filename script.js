

/* =========================
   VARIÁVEIS GLOBAIS
   ========================= */


let jogoIniciado = false;


let pontos = 0;
let totalLixos = 10;


let colheitadeira;
let posX = 50;
let posY = 200;


/* =========================
   BOTÃO: INICIAR MISSÃO
   ========================= */


function iniciarJogo() {


    document.getElementById("jogo").style.display = "block";


    document.getElementById("jogo").scrollIntoView({
        behavior: "smooth"
    });


    jogoIniciado = true;
    pontos = 0;


    criarCenarioJogo();
}


/* =========================
   CRIAR CENÁRIO DO JOGO
   ========================= */


function criarCenarioJogo() {


    const jogo = document.getElementById("jogo");


    jogo.innerHTML = `
        <h2>🚜 COLETA SELETIVA NA FAZENDA</h2>


        <p id="painel">
            🌱 Lixos coletados: <span id="pontos">0</span> / ${totalLixos}
        </p>


        <div id="area-jogo"></div>
    `;


    const area = document.getElementById("area-jogo");


    area.style.width = "900px";
    area.style.height = "500px";
    area.style.margin = "30px auto";
    area.style.position = "relative";
    area.style.background = "linear-gradient(#81c784, #66bb6a)";
    area.style.border = "5px solid #1b5e20";
    area.style.overflow = "hidden";


    /* 🚜 COLHEITADEIRA */
    colheitadeira = document.createElement("div");
    colheitadeira.innerHTML = "🚜";
    colheitadeira.style.position = "absolute";
    colheitadeira.style.fontSize = "40px";
    colheitadeira.style.left = posX + "px";
    colheitadeira.style.top = posY + "px";


    area.appendChild(colheitadeira);


    /* 🧴 LIXOS (COLETA OBRIGATÓRIA) */
    const lixosTipos = ["🧴", "🥫", "🛍️", "🗑️"];


    for (let i = 0; i < totalLixos; i++) {


        let lixo = document.createElement("div");
        lixo.classList.add("lixo");


        lixo.innerHTML = lixosTipos[Math.floor(Math.random() * lixosTipos.length)];


        lixo.style.position = "absolute";
        lixo.style.fontSize = "30px";


        lixo.style.left = Math.random() * 850 + "px";
        lixo.style.top = Math.random() * 450 + "px";


        area.appendChild(lixo);
    }


    /* 🌽 ELEMENTOS SUSTENTÁVEIS (APENAS VISUAIS) */
    const natureza = ["🌽", "🫘", "🌳", "🌾"];


    for (let i = 0; i < 10; i++) {


        let planta = document.createElement("div");


        planta.innerHTML = natureza[Math.floor(Math.random() * natureza.length)];


        planta.style.position = "absolute";
        planta.style.fontSize = "35px";


        planta.style.left = Math.random() * 850 + "px";
        planta.style.top = Math.random() * 450 + "px";


        planta.style.opacity = "0.7";


        area.appendChild(planta);
    }
}


/* =========================
   MOVIMENTO DA COLHEITADEIRA
   ========================= */


document.addEventListener("keydown", function (e) {


    if (!jogoIniciado) return;


    if (e.key === "ArrowUp") posY -= 15;
    if (e.key === "ArrowDown") posY += 15;
    if (e.key === "ArrowLeft") posX -= 15;
    if (e.key === "ArrowRight") posX += 15;


    colheitadeira.style.left = posX + "px";
    colheitadeira.style.top = posY + "px";


    verificarColisao();
});


/* =========================
   COLISÃO COM LIXO
   ========================= */


function verificarColisao() {


    const lixos = document.querySelectorAll(".lixo");


    lixos.forEach(lixo => {


        if (lixo.style.display === "none") return;


        const r1 = colheitadeira.getBoundingClientRect();
        const r2 = lixo.getBoundingClientRect();


        if (
            r1.left < r2.right &&
            r1.right > r2.left &&
            r1.top < r2.bottom &&
            r1.bottom > r2.top
        ) {
            lixo.style.display = "none";
            pontos++;


            document.getElementById("pontos").innerText = pontos;


            if (pontos >= totalLixos) {
                finalizarJogo();
            }
        }
    });
}


/* =========================
   FINAL DO JOGO
   ========================= */


function finalizarJogo() {


    const jogo = document.getElementById("jogo");


    jogo.innerHTML = `
        <div style="
            text-align:center;
            padding:80px;
            color:white;
            background:linear-gradient(#1b5e20,#2e7d32);
        ">
            <h1>🎉 MISSÃO CONCLUÍDA!</h1>


            <p style="max-width:700px;margin:auto;font-size:1.2rem;line-height:1.8;">
                Parabéns! Você ajudou a limpar a fazenda e contribuiu para um futuro sustentável.
                Cada lixo retirado representa uma atitude importante para preservar o meio ambiente,
                proteger os agricultores e garantir alimentos para as próximas gerações.
            </p>


            <h2 style="margin-top:30px;color:#fff59d;">
                🌱 Sustentabilidade é o futuro!
            </h2>
        </div>
    `;
}
