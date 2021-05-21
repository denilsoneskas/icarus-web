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
// CONTROLES PARA ENDERECO

function criaLinha(endereco) {
  linha = document.createElement("tr")
  tdLogradouro = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var testeEdit = '<button onClick=habilitaEditarEndereco('+endereco.id+')>Editar</button>'
  var testeDelete = '<button onClick=deletarEndereco('+endereco.id+')>Remover</button>'
  
  tdLogradouro.innerHTML = endereco.logradouro+ ", nº "+endereco.numero+ ", "+endereco.bairro+ ", " +endereco.cidade.nome+", "+endereco.cep
  tdEdit.innerHTML = testeEdit
  tdDelete.innerHTML = testeDelete

  linha.appendChild(tdLogradouro)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarEndereco(){
  let inputLogradouro = document.getElementById("logradouro")
  let inputNumero = document.getElementById("numero")
  let inputReferencia = document.getElementById("referencia")
  let inputComplemento = document.getElementById("complemento")
  let inputBairro = document.getElementById("bairro")
  let selectCidade = document.getElementById("selecionarCidade")
  let inputCep = document.getElementById("cep")

  const endereco = {
    "logradouro" : inputLogradouro.value,
    "numero" : inputNumero.value,
    "referencia" : inputReferencia.value,
    "complemento" : inputComplemento.value,
    "bairro" : inputBairro.value,
    "cidade" : selectCidade.value,
    "cep" : inputCep.value
  }
  let json = JSON.stringify(endereco)

  if ( inputLogradouro.value == ""){
    alert("Digite o Logradouro!")
  } else {
    salvar("enderecos",json)
  }
}

function selecionarCidade() {
  let selectCidade = document.getElementById("selecionarCidade")
  var len = document.querySelector("#selecionarCidade")
  var len = len.getElementsByTagName('option').length

  if (len == 1) {
    response = executarGet("cidades")
    cidades = JSON.parse(response)
  
    cidades.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.nome
      selectCidade.appendChild(optionElement)
    })
  }
}

function listarEnderecos(){
  let dados=executarGet("enderecos")
  let enderecos = JSON.parse(dados)
  let tabela = document.getElementById("endereco")

  enderecos.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function habilitaEditarEndereco(id){
  let enderecoExitente = executarGetPorId("enderecos",id)
  if( enderecoExitente !=null && enderecoExitente != ""){
    endereco = JSON.parse(enderecoExitente)
    let inputLogradouro = document.getElementById("logradouro")
    let inputNumero = document.getElementById("numero")
    let inputReferencia = document.getElementById("referencia")
    let inputComplemento = document.getElementById("complemento")
    let inputBairro = document.getElementById("bairro")
    let selectCidade = document.getElementById("selecionarCidade")
    let inputCep = document.getElementById("cep")

    inputLogradouro.value = endereco.logradouro
    inputNumero.value = endereco.numero
    inputReferencia.value = endereco.referencia
    inputComplemento.value = endereco.complemento
    inputBairro.value = endereco.bairro
    selectCidade.value = endereco.cidade.nome
    inputCep.value = endereco.cep
    
    let botaoSalvar = document.getElementById("salvarEndereco")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarEndereco(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}
function editarEndereco(id){
  let inputNome = document.getElementById("nome")
  let inputLogradouro = document.getElementById("logradouro")
  let inputNumero = document.getElementById("numero")
  let inputReferencia = document.getElementById("referencia")
  let inputComplemento = document.getElementById("complemento")
  let inputBairro = document.getElementById("bairro")
  let selectCidade = document.getElementById("selecionarCidade")
  let inputCep = document.getElementById("cep")

  const endereco = {
    "logradouro" : inputLogradouro.value,
    "numero" : inputNumero.value,
    "referencia" : inputReferencia.value,
    "complemento" : inputComplemento.value,
    "bairro" : inputBairro.value,
    "cidade" : selectCidade.value,
    "cep" : inputCep.value
  }
  let json = JSON.stringify(endereco)
  editar("enderecos",id, json)
}

function deletarEndereco(id){
  deletar("enderecos",id)
}

// FIM CONTROLES ENDERECO
//##############################################################################

listarEnderecos()
selecionarCidade()