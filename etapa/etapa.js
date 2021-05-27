// CONTROLES PARA ETAPA

function listarEtapas(){
  let dados=executarGet("etapas")
  let etapas = JSON.parse(dados)
  let tabela = document.getElementById("etapa")

  etapas.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);

    decolarId="decolar"+element.id
    pousarId="pousar"+element.id
    distanciaId="distancia"+element.id
    let botaoDecolar = document.getElementById(decolarId)
    let botaoPousar = document.getElementById(pousarId)
    let botaoDistancia = document.getElementById(distanciaId)

    if (element.decolagem != "" && element.decolagem != null) {
      botaoDecolar.disabled = true
    } else {
      botaoDecolar.disabled = false
    }

    if (element.pouso != "" && element.pouso != null){
      if (element.decolagem != "" && element.decolagem != null) {
        botaoPousar.disabled = true
      } else {
        botaoPousar.disabled = false
      }
    } else {
      if (element.decolagem != "" && element.decolagem != null) {
        botaoPousar.disabled = false
      } else {
        botaoPousar.disabled = true
      }
    }
    
  });
}

function criaLinha(etapa) {
  linha = document.createElement("tr")
  tdProva = document.createElement("td")
  tdPiloto = document.createElement("td")
  tdDecolar = document.createElement("td")
  tdPousar = document.createElement("td")
  tdDistancia = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var decolar = '<button id=decolar'+etapa.id+' onClick=decolarPiloto('+etapa.id+')>Decolar</button>'
  var pousar = '<button id=pousar'+etapa.id+' onClick=pousarPiloto('+etapa.id+')>Pousar</button>'
  var distancia = '<button id=distancia'+etapa.id+' onClick=distanciaMosca('+etapa.id+')>Distancia</button>'
  var delEtapa = '<button onClick=deletarEtapa('+etapa.id+')>Remover</button>'
  
  tdProva.innerHTML = etapa.prova.nome
  tdPiloto.innerHTML = etapa.piloto.nome
  tdDecolar.innerHTML = decolar
  tdPousar.innerHTML = pousar
  tdDistancia.innerHTML = distancia
  tdDelete.innerHTML = delEtapa

  linha.appendChild(tdProva)
  linha.appendChild(tdPiloto)
  linha.appendChild(tdDecolar)
  linha.appendChild(tdPousar)
  linha.appendChild(tdDistancia)
  linha.appendChild(tdDelete)

  return linha
}

function salvarEtapa(){
  let selectProva = document.getElementById("selecionarProva")
  let selectPiloto = document.getElementById("selecionarPiloto")

  const etapa = {
    "prova" : selectProva.value,
    "piloto" : selectPiloto.value,
    "decolagem" : "",
    "pouso" : "",
    "distanciaMosca" : "",
  }
  let json = JSON.stringify(etapa)

  if (selectProva.value == "Selecione" || selectProva.value == ""){
    alert("Selecione uma Prova!")
  } else {
    if ( selectPiloto.value == "Selecione" || selectPiloto.value == ""){
      alert("Selecione um Piloto!")
    } else {
      salvar("etapas",json)
    }
  }
}

function habilitaEditarEtapa(id){
  let etapaExitente = executarGetPorId("etapas",id)
  if( etapaExitente !=null && etapaExitente != ""){
    etapa = JSON.parse(etapaExitente)
    let selectProva = document.getElementById("selecionarProva")
    let selectPiloto = document.getElementById("selecionarPiloto")

    optionElementProva = document.createElement("option")
    optionElementPiloto = document.createElement("option")

    optionElementPiloto.value = etapa.piloto.id
    optionElementPiloto.innerHTML = etapa.piloto.nome

    selectPiloto.appendChild(optionElementPiloto)

    selectProva.value = etapa.prova.id
    selectPiloto.value = etapa.piloto.id
    
    let botaoSalvar = document.getElementById("salvar")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarEtapa(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}

function editarEtapa(id){
  let selectProva = document.getElementById("selecionarProva")
  let selectPiloto = document.getElementById("selecionarPiloto")

  const etapa = {
    "prova" : selectProva.value,
    "piloto" : selectPiloto.value,
    "decolagem" : "",
    "pouso" : "",
    "distanciaMosca" : "",
  }
  let json = JSON.stringify(etapa)
  editar("etapas",id, json)
}

function deletarEtapa(id){
  deletar("etapas",id)
}

// FUNCOES PARA COMBOBOX

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

function selecionarPiloto() {
  let selectPiloto = document.getElementById("selecionarPiloto")
  var len = document.querySelector("#selecionarPiloto")
  var len = len.getElementsByTagName('option').length

  if (len == 1) {
    response = executarGet("pilotos")
    pilotos = JSON.parse(response)
  
    pilotos.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.nome
      selectPiloto.appendChild(optionElement)
    })
  }
}

// FUNCOES PARA PROVA

function decolarPiloto(id) {
  executarPutPorAcao("etapas",id,"decolar")
  alert("Decolagem Registrada!")
  document.location.reload(true)
}

function pousarPiloto(id) {
  executarPutPorAcao("etapas",id,"pousar")
  alert("Pouso Registrado!")
  document.location.reload(true)
}

function distanciaMosca(id) {
  document.getElementById('popup').style.display = 'block'
  document.getElementById('muda').value = id
}

function fecharPopup() {
  document.getElementById('popup').style.display = 'none'
}

function lancarPontuacaoMosca(){
  let pontuacaoMosca = document.getElementById("pontuacaoMosca")
  let muda = document.getElementById("muda")
  let id = muda.value
  let leitura = pontuacaoMosca.value

  if (leitura == "Selecione") {
    alert("Selecione um valor abaixo")
  } else {
    const etapa = {
      "distanciaMosca" : leitura
    }
    let json = JSON.stringify(etapa)
    editarComPatch("etapas",id, json)
  }
}

// FIM CONTROLES ETAPA
//##############################################################################

selecionarProva()
selecionarPiloto()
listarEtapas()