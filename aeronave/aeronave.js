// CONTROLES PARA AERONAVE

function listarAeronaves(){
  let dados=executarGet("aeronaves")
  let aeronaves = JSON.parse(dados)
  let tabela = document.getElementById("aeronave")

  aeronaves.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(aeronave) {
  linha = document.createElement("tr")
  tdModelo = document.createElement("td")
  tdCertificacao = document.createElement("td")
  tdFabricante = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var editAeronave = '<button onClick=habilitaEditarAeronave('+aeronave.id+')>Editar</button>'
  var delAeronave = '<button onClick=deletarAeronave('+aeronave.id+')>Remover</button>'
  
  tdModelo.innerHTML = aeronave.modelo
  tdCertificacao.innerHTML = aeronave.certificacao
  tdFabricante.innerHTML = aeronave.fabricante.nome
  tdEdit.innerHTML = editAeronave
  tdDelete.innerHTML = delAeronave

  linha.appendChild(tdModelo)
  linha.appendChild(tdCertificacao)
  linha.appendChild(tdFabricante)
  linha.appendChild(tdEdit)
  linha.appendChild(tdDelete)

  return linha
}

function salvarAeronave(){
  let inputModelo = document.getElementById("modelo")
  let selectFabricante = document.getElementById("selecionarFabricante")
  let selectCertificacao = document.getElementById("certificacao")

  const aeronave = {
    "fabricante" : selectFabricante.value,
    "modelo" : inputModelo.value,
    "certificacao" : selectCertificacao.value
  }
  let json = JSON.stringify(aeronave)

  if (selectFabricante.value == "Selecione" || selectFabricante.value == ""){
    alert("Selecione um Fabricante!")
  } else {
    if ( inputModelo.value == ""){
      alert("Digite o nome do modelo!")
    } else {
      salvar("aeronaves",json)
    }
  }
}

function habilitaEditarAeronave(id){
  let aeronaveExitente = executarGetPorId("aeronaves",id)
  if( aeronaveExitente !=null && aeronaveExitente != ""){
    aeronave = JSON.parse(aeronaveExitente)
    let inputModelo = document.getElementById("modelo")
    let selectCertificacao = document.getElementById("certificacao")
    let selectFabricante = document.getElementById("selecionarFabricante")

    inputModelo.value = aeronave.modelo
    selectCertificacao.value = aeronave.certificacao
    selectFabricante.value = aeronave.fabricante.id
    
    let botaoSalvar = document.getElementById("salvarAeronave")
    botaoSalvar.value="Atualizar"
    botaoSalvar.setAttribute('onclick', "editarAeronave(id)");
    botaoSalvar.id = id
    botaoSalvar.setAttribute('method', "PUT");
  }
}

function editarAeronave(id){
  let inputModelo = document.getElementById("modelo")
  let selectCertificacao = document.getElementById("certificacao")
  let selectFabricante = document.getElementById("selecionarFabricante")
  const nome = {
    "fabricante" : selectFabricante.value,
    "modelo" : inputModelo.value,
    "certificacao" : selectCertificacao.value
  }
  let json = JSON.stringify(nome)
  editar("aeronaves",id, json)
}

function deletarAeronave(id){
  deletar("aeronaves",id)
}

// FUNÇÕES PARA COMBOBOX

function selecionarFabricante() {
  let selectFabricante = document.getElementById("selecionarFabricante")
  var len = document.querySelector("#selecionarFabricante")
  var len = len.getElementsByTagName('option').length

  if (len == 1) {
    response = executarGet("fabricantes")
    fabricantes = JSON.parse(response)
  
    fabricantes.forEach(element => {
      optionElement = document.createElement("option")
      optionElement.value = element.id
      optionElement.innerHTML = element.nome
      selectFabricante.appendChild(optionElement)
    })
  }
}

// FIM CONTROLES AERONAVE
//##############################################################################

listarAeronaves()
selecionarFabricante()