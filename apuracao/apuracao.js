// CONTROLES PARA APURACAO

function apurarProva(){
  let selectProva = document.getElementById("selecionarProva")
  let botaoApurarProva = document.getElementById("botaoApurarProva")
  let leitura = selectProva.value

  if (leitura == "Selecione"){
    alert("Selecione uma prova")
  } else {
    listarApuracaoPermanencia(leitura)
    listarApuracaoPontuacaoMosca(leitura)
    botaoApurarProva.disabled = true
  }
}

function listarApuracaoPermanencia(id){
  let recurso = "etapas/"+id+"/permanencia"
  let dados=executarGet(recurso)
  let permanencias = JSON.parse(dados)
  let tabela = document.getElementById("permanencia")
  
  permanencias.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function listarApuracaoPontuacaoMosca(id){
  let recurso = "etapas/"+id+"/distanciamosca"
  let dados=executarGet(recurso)
  let pontuacoes = JSON.parse(dados)
  let tabela = document.getElementById("pontuacaoMosca")
  
  pontuacoes.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(apuracao) {
  linha = document.createElement("tr")
  tdPiloto = document.createElement("td")
  tdModelo = document.createElement("td")
  tdFabricante = document.createElement("td")
  tdClube = document.createElement("td")
  tdDecolagem = document.createElement("td")
  tdPouso = document.createElement("td")
  tdPermanencia = document.createElement("td")
  tdPontuacaoMosca = document.createElement("td")
  
  tdPiloto.innerHTML = apuracao.pilotoNome
  tdModelo.innerHTML = apuracao.aeronaveModelo
  tdFabricante.innerHTML = apuracao.fabricanteNome
  tdClube.innerHTML = apuracao.clubeNome
  
  let decolagem = new Date(apuracao.decolagem)
  let horaDecolagem = decolagem.getHours()+":"+decolagem.getMinutes()+":"+decolagem.getSeconds()
  let pouso = new Date(apuracao.pouso)
  let horaPouso = pouso.getHours()+":"+pouso.getMinutes()+":"+pouso.getSeconds()
  let horaPermanencia = apuracao.permanencia

  if (horaDecolagem == "21:0:0") {
    horaDecolagem = "Aguarde"
  } else {
    horaDecolagem = horaDecolagem
  }

  if (horaPouso == "21:0:0") {
    horaPouso = "Aguarde"
  } else {
    horaPouso = horaPouso
  }

  if (horaPermanencia == null) {
    horaPermanencia = "Aguarde"
  } else {
    horaPermanencia = horaPermanencia
  }

  tdDecolagem.innerHTML = horaDecolagem
  tdPouso.innerHTML = horaPouso
  tdPermanencia.innerHTML = horaPermanencia
  tdPontuacaoMosca.innerHTML = apuracao.distanciaMosca

  linha.appendChild(tdPiloto)
  linha.appendChild(tdModelo)
  linha.appendChild(tdFabricante)
  linha.appendChild(tdClube)
  linha.appendChild(tdDecolagem)
  linha.appendChild(tdPouso)
  linha.appendChild(tdPermanencia)
  linha.appendChild(tdPontuacaoMosca)

  return linha
}

function selecionarProva() {
  let selectProva = document.getElementById("selecionarProva")
  var len = document.querySelector("#selecionarProva")
  var len = len.getElementsByTagName('option').length
  
  if (len == 1) {
    response = executarGet("provas")
    provas = JSON.parse(response)
    
    provas.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.nome
      selectProva.appendChild(optionElement)
    })
  }
}

// FIM CONTROLES APURACAO
//##############################################################################

selecionarProva()