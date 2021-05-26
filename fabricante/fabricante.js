// CONTROLES PARA FABRICANTE

function listarFabricantes(){
  let dados=executarGet("fabricantes")
  let fabricantes = JSON.parse(dados)
  let tabela = document.getElementById("fabricante")

  fabricantes.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(fabricante) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var editFabricante = '<button onClick=habilitaEditarFabricante('+fabricante.id+')>Editar</button>'
  var delFabricante = '<button onClick=deletarFabricante('+fabricante.id+')>Remover</button>'
  
  tdNome.innerHTML = fabricante.nome
  tdEdit.innerHTML = editFabricante
  tdDelete.innerHTML = delFabricante

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