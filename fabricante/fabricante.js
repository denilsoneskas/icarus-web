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
// CONTROLES PARA FABRICANTE

function criaLinha(fabricante) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var testeEdit = '<button onClick=habilitaEditarFabricante('+fabricante.id+')>Editar</button>'
  var testeDelete = '<button onClick=deletarFabricante('+fabricante.id+')>Remover</button>'
  
  tdNome.innerHTML = fabricante.nome
  tdEdit.innerHTML = testeEdit
  tdDelete.innerHTML = testeDelete

  linha.appendChild(tdNome)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarFabricante(){
  let inputNome = document.getElementById("nomeFabricante")
  const nome = {
    "nome" : inputNome.value
  }
  let json = JSON.stringify(nome)

  if(inputNome.value == ""){
    alert("Digite um nome de fabricante!")
  } else {
    salvar("fabricantes",json)
  }
}

function listarFabricantes(){
  let dados=executarGet("fabricantes")
  let fabricantes = JSON.parse(dados)
  let tabela = document.getElementById("fabricante")

  fabricantes.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function habilitaEditarFabricante(id){
  let fabricanteExitente = executarGetPorId("fabricantes",id)
  if( fabricanteExitente !=null && fabricanteExitente != ""){
    fabricante = JSON.parse(fabricanteExitente)
    let inputNome = document.getElementById("nomeFabricante")
    inputNome.value = fabricante.nome

    let botaoSalvar = document.getElementById("salvarFabricante")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarFabricante(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}
function editarFabricante(id){
  let inputNome = document.getElementById("nomeFabricante")
  if (inputNome.value != "") {
    const nome = {
      "nome" : inputNome.value
    }
    let json = JSON.stringify(nome)
    editar("fabricantes",id, json)
  }
}

function deletarFabricante(id){
  deletar("fabricantes",id)
}

// FIM CONTROLES FABRICANTE
//##############################################################################

listarFabricantes()