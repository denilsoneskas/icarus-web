// CONTROLES PARA CLUBE

function listarClubes(){
  let dados=executarGet("clubes")
  let clubes = JSON.parse(dados)
  let tabela = document.getElementById("clube")

  clubes.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(clube) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdLogradouro = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var editClube = '<button onClick=habilitaEditarClube('+clube.id+')>Editar</button>'
  var delClube = '<button onClick=deletarClube('+clube.id+')>Remover</button>'
  
  tdNome.innerHTML = clube.nome
  tdLogradouro.innerHTML = clube.endereco.logradouro+ ", nº "+clube.endereco.numero+ ", "+clube.endereco.bairro+ ", " +clube.endereco.cidade.nome
  tdEdit.innerHTML = editClube
  tdDelete.innerHTML = delClube

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

function habilitaEditarClube(id){
  let clubeExitente = executarGetPorId("clubes",id)
  if( clubeExitente !=null && clubeExitente != ""){
    clube = JSON.parse(clubeExitente)
    let inputNome = document.getElementById("nome")
    let selectEndereco = document.getElementById("selecionarEndereco")

    inputNome.value = clube.nome
    selectEndereco.value = clube.endereco.id
    
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

// FUNCOES PARA COMBOBOX

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

// FIM CONTROLES CLUBE
//##############################################################################

listarClubes()
selecionarEndereco()