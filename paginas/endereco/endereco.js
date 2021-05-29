// CONTROLES PARA ENDERECO

function listarEnderecos(){
  let dados=executarGet("enderecos")
  let enderecos = JSON.parse(dados)
  let tabela = document.getElementById("endereco")

  enderecos.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(endereco) {
  linha = document.createElement("tr")
  tdLogradouro = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var editEndereco = '<button class="btn btn-info btn-sm" onClick=habilitaEditarEndereco('+endereco.id+')>Editar</button>'
  var delEndereco = '<button class="btn btn-danger btn-sm" onClick=deletarEndereco('+endereco.id+')>Remover</button>'
  
  tdLogradouro.innerHTML = endereco.logradouro+ ", nº "+endereco.numero+ ", "+endereco.bairro+ ", " +endereco.cidade.nome+", "+endereco.cep
  tdEdit.innerHTML = editEndereco
  tdDelete.innerHTML = delEndereco

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
    selectCidade.value = endereco.cidade.id
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

// FUNCOES PARA COMBOBOX

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

// FIM CONTROLES ENDERECO
//##############################################################################

listarEnderecos()
selecionarCidade()