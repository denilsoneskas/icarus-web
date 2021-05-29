// CONTROLES PARA CIDADE

function listarCidades(){
  let dados=executarGet("cidades")
  let cidades = JSON.parse(dados)
  let tabela = document.getElementById("cidade")

  cidades.forEach(element => {
    linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}

function criaLinha(cidade) {
  linha = document.createElement("tr")
  tdNome = document.createElement("td")
  tdEstado = document.createElement("td")
  tdEdit = document.createElement("td")
  tdDelete = document.createElement("td")
  
  var editCidade = '<button class="btn btn-info btn-sm" onClick=habilitaEditarCidade('+cidade.id+')>Editar</button>'
  var delCidade = '<button class="btn btn-danger btn-sm" onClick=deletarCidade('+cidade.id+')>Remover</button>'
  
  tdNome.innerHTML = cidade.nome
  tdEstado.innerHTML = cidade.estado
  tdEdit.innerHTML = editCidade
  tdDelete.innerHTML = delCidade

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
      "estado" : selectEstadoCidade.value
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