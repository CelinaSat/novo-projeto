class ComponenteMonitor {
    constructor(idElemento) {
        
        this.elemento = document.getElementById(idElemento);
    }
}

class CardHardware extends ComponenteMonitor {
   
    
    atualizarInterface(valor, tipo) {
        const span = this.elemento.querySelector('.valor');
        if (span) {
            span.innerText = valor;
        }

        let isCritico = false;
        if (tipo === 'temp' && valor > 75) isCritico = true;
        if (tipo === 'cpu' && valor > 90) isCritico = true;

        if (isCritico) {
            this.elemento.classList.add('alerta-critico');
        } else {
            this.elemento.classList.remove('alerta-critico');
        }
    }
}

const cardCPU = new CardHardware('card-cpu');
const cardRAM = new CardHardware('card-ram');
const cardTemp = new CardHardware('card-temp');

function buscarDados() {
    fetch('/api/status')
        .then(response => response.json())
        .then(dados => {
            
            cardCPU.atualizarInterface(dados.cpu, 'cpu');
            cardRAM.atualizarInterface(dados.ram, 'ram');
            cardTemp.atualizarInterface(dados.temp, 'temp');
        })
        .catch(erro => console.error("Erro ao buscar dados:", erro));
}

setInterval(buscarDados, 2000);

buscarDados();