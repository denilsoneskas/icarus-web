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
// CONTROLES PARA CIDADE

function criaLinha(cidade) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdEstado = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var testeEdit = '<button onClick=habilitaEditarCidade('+cidade.id+')>Editar</button>'
  var testeDelete = '<button onClick=deletarCidade('+cidade.id+')>Remover</button>'
  
  tdNome.innerHTML = cidade.nome
  tdEstado.innerHTML = cidade.estado
  tdEdit.innerHTML = testeEdit
  tdDelete.innerHTML = testeDelete

  linha.appendChild(tdNome)
  linha.appendChild(tdEstado)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarCidade(){
  let nomeCidade = document.getElementById("nomeCidade")
  let selectEstadoCidade = document.getElementById("estadoCidade")
  const nome = {
    "nome" : nomeCidade.value,
    "estado" : selectEstadoCidade.value
  }
  let json = JSON.stringify(nome)

  if(nomeCidade.value == ""){
    alert("Digite o nome da cidade!")
  } else {
    salvar("cidades",json)
  }
}

function listarCidades(){
  let dados=executarGet("cidades")
  let cidades = JSON.parse(dados)
  let tabela = document.getElementById("cidade")

  cidades.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function habilitaEditarCidade(id){
  let cidadeExitente = executarGetPorId("cidades",id)
  if( cidadeExitente !=null && cidadeExitente != ""){
    cidade = JSON.parse(cidadeExitente)
    let nomeCidade = document.getElementById("nomeCidade")
    let selectEstadoCidade = document.getElementById("estadoCidade")
    nomeCidade.value = cidade.nome
    selectEstadoCidade.value = cidade.estado

    let botaoSalvar = document.getElementById("salvarCidade")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarCidade(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}
function editarCidade(id){
  let nomeCidade = document.getElementById("nomeCidade")
  let selectEstadoCidade = document.getElementById("estadoCidade")
  if (nomeCidade.value != "") {
    const nome = {
      "nome" : nomeCidade.value,
      "estado" : estadoCidade.value
    }
    let json = JSON.stringify(nome)
    editar("cidades",id, json)
  }
}

function deletarCidade(id){
  deletar("cidades",id)
}

// FIM CONTROLES CIDADE
//##############################################################################

listarCidades()