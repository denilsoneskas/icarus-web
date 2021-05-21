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
// CONTROLES PARA CLUBE

function criaLinha(clube) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdLogradouro = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var testeEdit = '<button onClick=habilitaEditarClube('+clube.id+')>Editar</button>'
  var testeDelete = '<button onClick=deletarClube('+clube.id+')>Remover</button>'
  
  tdNome.innerHTML = clube.nome
  tdLogradouro.innerHTML = clube.endereco.logradouro+ ", nº "+clube.endereco.numero+ ", "+clube.endereco.bairro+ ", " +clube.endereco.cidade.nome
  tdEdit.innerHTML = testeEdit
  tdDelete.innerHTML = testeDelete

  linha.appendChild(tdNome)
  linha.appendChild(tdLogradouro)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarClube(){
  let inputNome = document.getElementById("nome")
  let selectEndereco = document.getElementById("selecionarEndereco")

  const clube = {
    "nome" : inputNome.value,
    "endereco" : selectEndereco.value
  }
  let json = JSON.stringify(clube)

  if ( inputNome.value == ""){
    alert("Digite o nome do Clube!")
  } else {
    salvar("clubes",json)
  }
}

function selecionarEndereco() {
  let selectCidade = document.getElementById("selecionarEndereco")
  var len = document.querySelector("#selecionarEndereco")
  var len = len.getElementsByTagName('option').length

  if (len == 1) {
    response = executarGet("enderecos")
    enderecos = JSON.parse(response)
  
    enderecos.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.logradouro+" "+element.numero+", "+element.cidade.nome
      selectCidade.appendChild(optionElement)
    })
  }
}

function listarClubes(){
  let dados=executarGet("clubes")
  let clubes = JSON.parse(dados)
  let tabela = document.getElementById("clube")

  clubes.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function habilitaEditarClube(id){
  let clubeExitente = executarGetPorId("clubes",id)
  if( clubeExitente !=null && clubeExitente != ""){
    clube = JSON.parse(clubeExitente)
    let inputNome = document.getElementById("nome")
    let selectEndereco = document.getElementById("selecionarEndereco")

    inputNome.value = clube.nome
    selectEndereco.value = clube.endereco.logradouro
    
    let botaoSalvar = document.getElementById("salvarClube")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarClube(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}
function editarClube(id){
  let inputNome = document.getElementById("nome")
  let selectEndereco = document.getElementById("selecionarEndereco")

  const clube = {
    "nome" : inputNome.value,
    "endereco" : selectEndereco.value
  }
  let json = JSON.stringify(clube)
  editar("clubes",id, json)
}

function deletarClube(id){
  deletar("clubes",id)
}

// FIM CONTROLES CLUBE
//##############################################################################

listarClubes()
selecionarEndereco()