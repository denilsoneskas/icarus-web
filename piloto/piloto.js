var urlPadrao="http://127.0.0.1:8080/"

// #############################################################################
// METHODOS HTTP

function salvar(recurso,json) {
  executarPost(recurso,json)
  document.location.reload(true)
}
function executarPost(recurso,json) {
  let url = urlPadrao+recurso
  let request = new XMLHttpRequest()
  request.open("POST", url, false)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(json)
  return request.responseText
}

function executarGet(recurso) {
  let url = urlPadrao+recurso
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}

function executarGetPorId(recurso,id) {
  let url = urlPadrao+recurso+"/"+id
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}

function editar(recurso,id,json){
  executarPut(recurso,id,json)
  document.location.reload(true)
}
function executarPut(recurso,id,json) {
  let url = urlPadrao+recurso+"/"+id
  let request = new XMLHttpRequest()
  request.open("PUT", url, false)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(json)
  return request.responseText
}

function deletar(recurso,id){
  executarDelete(recurso,id)
  document.location.reload(true)
}
function executarDelete(recurso,id) {
  let url = urlPadrao+recurso+"/"+id
  let request = new XMLHttpRequest()
  request.open("DELETE", url, false)
  request.send()
  return request.responseText
}

// #############################################################################
// CONTROLES PARA PILOTO

function criaLinha(piloto) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdParapente = document.createElement("td")
  tdClube = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var testeEdit = '<button onClick=habilitaEditarPiloto('+piloto.id+')>Editar</button>'
  var testeDelete = '<button onClick=deletarPiloto('+piloto.id+')>Remover</button>'
  
  tdNome.innerHTML = piloto.nome
  tdParapente.innerHTML = piloto.aeronave.modelo
  tdClube.innerHTML = piloto.clube.nome
  tdEdit.innerHTML = testeEdit
  tdDelete.innerHTML = testeDelete

  linha.appendChild(tdNome)
  linha.appendChild(tdParapente)
  linha.appendChild(tdClube)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarPiloto(){
  let inputCodigo = document.getElementById("codigo")
  let inputNome = document.getElementById("nome")
  let inputNascimento = document.getElementById("nascimento")
  let selectEndereco = document.getElementById("selecionarEndereco")
  let selectAeronave = document.getElementById("selecionarAeronave")
  let selectClube = document.getElementById("selecionarClube")

  dataNascimento = inputNascimento.value+"T03:00:00.000Z"

  const piloto = {
    "codigo" : inputCodigo.value,
    "nome" : inputNome.value,
    "dataNascimento" : dataNascimento,
    "endereco" : selectEndereco.value,
    "aeronave" : selectAeronave.value,
    "clube" : selectClube.value
  }
  let json = JSON.stringify(piloto)

  if ( inputNome.value == ""){
    alert("Digite o nome do Piloto!")
  } else {
    salvar("pilotos",json)
  }
}

function selecionarEndereco() {
  let selectEndereco = document.getElementById("selecionarEndereco")
  var len = document.querySelector("#selecionarEndereco")
  var len = len.getElementsByTagName('option').length

  if (len == 0) {
    response = executarGet("enderecos")
    enderecos = JSON.parse(response)
  
    enderecos.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.logradouro+" "+element.numero+", "+element.cidade.nome
      selectEndereco.appendChild(optionElement)
    })
  }
}

function selecionarAeronave() {
  let selectAeronave = document.getElementById("selecionarAeronave")
  var len = document.querySelector("#selecionarAeronave")
  var len = len.getElementsByTagName('option').length

  if (len == 0) {
    response = executarGet("aeronaves")
    aeronaves = JSON.parse(response)
  
    aeronaves.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.modelo
      selectAeronave.appendChild(optionElement)
    })
  }
}

function selecionarClube() {
  let selectClube = document.getElementById("selecionarClube")
  var len = document.querySelector("#selecionarClube")
  var len = len.getElementsByTagName('option').length

  if (len == 0) {
    response = executarGet("clubes")
    clubes = JSON.parse(response)
  
    clubes.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.nome
      selectClube.appendChild(optionElement)
    })
  }
}

function listarPilotos(){
  let dados=executarGet("pilotos")
  let clubes = JSON.parse(dados)
  let tabela = document.getElementById("piloto")

  clubes.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function habilitaEditarPiloto(id){
  let pilotoExitente = executarGetPorId("pilotos",id)
  if( pilotoExitente !=null && pilotoExitente != ""){
    piloto = JSON.parse(pilotoExitente)
    let inputCodigo = document.getElementById("codigo")
    let inputNome = document.getElementById("nome")
    let inputNascimento = document.getElementById("nascimento")
    let selectEndereco = document.getElementById("selecionarEndereco")
    let selectAeronave = document.getElementById("selecionarAeronave")
    let selectClube = document.getElementById("selecionarClube")

    inputCodigo.value = piloto.codigo
    inputNome.value = piloto.nome
    inputNascimento.value = piloto.dataNascimento
    selectEndereco.value = piloto.endereco.logradouro
    selectAeronave.value = piloto.aeronave.modelo
    selectClube.value = piloto.clube.nome
    
    let botaoSalvar = document.getElementById("salvarPiloto")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarPiloto(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}
function editarPiloto(id){
  let inputCodigo = document.getElementById("codigo")
  let inputNome = document.getElementById("nome")
  let inputNascimento = document.getElementById("nascimento")
  let selectEndereco = document.getElementById("selecionarEndereco")
  let selectAeronave = document.getElementById("selecionarAeronave")
  let selectClube = document.getElementById("selecionarClube")

  dataNascimento = inputNascimento.value+"T03:00:00.000Z"

  const piloto = {
    "codigo" : inputCodigo.value,
    "nome" : inputNome.value,
    "dataNascimento" : dataNascimento,
    "endereco" : selectEndereco.value,
    "aeronave" : selectAeronave.value,
    "clube" : selectClube.value
  }
  let json = JSON.stringify(piloto)
  editar("pilotos",id, json)
}

function deletarPiloto(id){
  deletar("pilotos",id)
}

// FIM CONTROLES PILOTO
//##############################################################################

listarPilotos()
selecionarAeronave()
selecionarClube()
selecionarEndereco()