// CONTROLES PARA PROVA

function listarProvas(){
  let dados=executarGet("provas")
  let provas = JSON.parse(dados)
  let tabela = document.getElementById("prova")

  provas.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(prova) {
  linha = document.createElement("tr")
  tdNomeProva = document.createElement("td")
  tdData = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var editProva = '<button class="btn btn-info btn-sm" onClick=habilitaEditarProva('+prova.id+')>Editar</button>'
  var delProva = '<button class="btn btn-danger btn-sm" onClick=deletarProva('+prova.id+')>Remover</button>'
  
  tdNomeProva.innerHTML = prova.nome
  tdData.innerHTML = prova.dataProva
  tdEdit.innerHTML = editProva
  tdDelete.innerHTML = delProva

  linha.appendChild(tdNomeProva)
  linha.appendChild(tdData)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarProva(){
  let inputNome = document.getElementById("nome")
  let dataProva = document.getElementById("dataProva")

  dataProva = dataProva.value+"T03:00:00.000Z"

  const prova = {
    "nome" : inputNome.value,
    "dataProva" : dataProva
  }
  let json = JSON.stringify(prova)

  if (inputNome.value == null || inputNome.value == ""){
    alert("Digite um nome para a prova!")
  } else {
    salvar("provas",json)
  }
}

function habilitaEditarProva(id){
  let provaExitente = executarGetPorId("provas",id)
  if( provaExitente !=null && provaExitente != ""){
    prova = JSON.parse(provaExitente)
    let inputNome = document.getElementById("nome")
    let dataProva = document.getElementById("dataProva")

    inputNome.value = prova.nome
    dataProva.value = prova.dataProva
    
    let botaoSalvar = document.getElementById("salvarProva")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarProva(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}

function editarProva(id){
  let inputNome = document.getElementById("nome")
  let dataProva = document.getElementById("dataProva")

  dataProva = dataProva.value+"T03:00:00.000Z"

  const prova = {
    "nome" : inputNome.value,
    "dataProva" : dataProva
  }
  let json = JSON.stringify(prova)
  editar("provas",id, json)
}

function deletarProva(id){
  deletar("provas",id)
}

// FIM CONTROLES PROVA
//##############################################################################

listarProvas()