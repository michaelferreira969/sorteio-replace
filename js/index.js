//Classes
class Loja {
  constructor(nome, endereco, contato) {
    this.nome = nome;
    this.endereco = endereco;
    this.contato = contato;
  }
}

class Pessoa {
  constructor(nome, email, contato) {
    this.nome = nome;
    this.email = email;
    this.contato = contato;
  }
}

//Variáveis

let listLojas = [];
let loja = {};

let listPessoas = [];
let pessoa = {};

/*Nova loja */
loja = new Loja("Supremo Bolos", "Rua Florida, 1.410 Brooklin", 51022579)
listLojas.push(loja);

loja = new Loja("Sodie Doces", "R. Carlos Rega, 74 - Brooklin", 55053434)
listLojas.push(loja);

loja = new Loja("Isabela Akkari", "R. Comendador Miguel Calfat, 410 - Vila Nova Conceição", 50961915)
listLojas.push(loja);

loja = new Loja("Fábrica de Bolo Vó Alzira", "Av. Padre Antônio José dos Santos, 1690 - Cidade Monções", 975635523)
listLojas.push(loja);

/*Nova pessoa*/
pessoa = new Pessoa("Michael", "michaelferrys969@gmail.com", 953695641)
listPessoas.push(pessoa);

pessoa = new Pessoa("Douglas", "douglas@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Emerson", "emerson@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Marcelo", "marcelo@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Gabriel", "gabriel@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Rafael", "rafael@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Luís", "luis@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Vicenzo", "vicenzo@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Matheu", "vicenzo@gmail.com", 12345678)
listPessoas.push(pessoa);

pessoa = new Pessoa("Liliane", "vicenzo@gmail.com", 12345678)
listPessoas.push(pessoa);

//Eventos

//Mask
$('#iContatoLoja').mask('(00) 0000-0000');
$('#iContatoPessoa').mask('(00) 0000-0000');

/*Ocultar div ao carregar página*/
$("#divSorteado").hide();

/*Ao clicar no botão sortear*/
$(document).on("click", "#btnSortear", function () {
  /*Pegar a pessoa escolhida*/
  let pessoaSelected =  $("#listarPessoas").val();

  /*ocultar div*/
  $("#divSorteio").hide();

  /*Mostrar div*/
  $("#divSorteado").show();

  //Chama função que faz sorteio
  let numSorteado = sorteio(); 

  preencherDivSorteado(numSorteado, pessoaSelected);
});

/*Ao clicar no botão voltar*/
$(document).on("click", "#btnVoltar", function () {
  /*Limpar campos*/
  $("#nomePessoa").empty();
  $("#nomeLoja").empty();
  $("#enderecoLoja").empty();
  $("#contatoLoja").empty();

  /*Mostrar div*/
  $("#divSorteio").show();

  /*Ocultar div*/
  $("#divSorteado").hide();
});

/*Adicionar nova loja*/
$(document).on("click", "#btnAddLoja", function () {
  //Pegar campos preenchidos
  let data = [
    nome = $("#iNomeLoja").val(),
    endereco = $("#iEnderecoLoja").val(),
    contato = parseInt($("#iContatoLoja").val())
  ];

  addLoja(data);

  //Limpar campos
  $("#iNomeLoja").val("");
  $("#iEnderecoLoja").val("");
  $("#iContatoLoja").val("");

  //Retorna mensagem de sucesso
  $.toast({
    heading: 'Success',
    text: 'Loja Adicionada com sucesso!',
    showHideTransition: 'slide',
    icon: 'success'
  });

  //Fechar modal
  $(".close-modal").click();  
});

/*Adicionar nova pessoa*/
$(document).on("click", "#btnAddPessoa", function () {
  //Pegar campos preenchidos
  let data = [
    nome = $("#iNomePessoa").val(),
    email = $("#iEmailPessoa").val(),
    contato = parseInt($("#iContatoPessoa").val())
  ];

  addPessoa(data);

  //Limpar campos
  $("#iNomePessoa").val("");
  $("#iEmailPessoa").val("");
  $("#iContatoPessoa").val("");

  //Retorna mensagem de sucesso
  $.toast({
    heading: 'Success',
    text: 'Pessoa Adicionada com sucesso!',
    showHideTransition: 'slide',
    icon: 'success'
  });

  //Fechar modal
  $(".close-modal").click();  
});

/*Montar dados da tabela Loja*/
$(document).on("click", "#btnModalVerLojas", function () {
  $("#tableVerLojas tbody").empty();
  preencherTableLojas(listLojas);

  $("#totalLojas").append(listLojas.length);
});

/*Montar dados da tabela Pessoa*/
$(document).on("click", "#btnModalVerPessoas", function () {
  $("#tableVerPessoas tbody").empty();
  preencherTablePessoa(listPessoas);

  $("#totalPessoas").append(listPessoas.length);
});

$("#iNomeLoja").on("keyup", function() {
  $(".form-text").empty();

  const elemento = $(this);
  const elementoNext = $(this).next(".form-text");
  const val = elemento.val();

  if(verificaString(val)) {
    elemento.removeClass("campo-error");
    elemento.addClass("campo-success");
    
    $("#btnAddLoja").removeAttr("disabled");
  }
  else {
    elemento.removeClass("campo-success");
    elemento.addClass("campo-error");
    elementoNext.addClass("msg-error");
    elementoNext.append("Nome inválido!");

    $("#btnAddLoja").attr("disabled", "true");
  }
});

$("#iContatoLoja").on("keyup", function() {
  $(".form-text").empty();

  const elemento = $(this);
  const elementoNext = $(this).next(".form-text");

  //Caso extrapolou o número de caracteres não adicional como valor
  const val = elemento.val().length < 15 ? elemento.val() : null;

  if(val.length < 15) {
    elemento.addClass("campo-success");

    $("#btnAddLoja").removeAttr("disabled");
  }
  else {
    elemento.addClass("campo-error");
    elementoNext.addClass("msg-error");
    elementoNext.append("O número não corresponde a um formato válido!");

    $("#btnAddPessoa").attr("disabled", "true");
  }
});

$("#iNomePessoa").on("keyup", function() {
  $(".form-text").empty();

  const elemento = $(this);
  const elementoNext = $(this).next(".form-text");
  const val = elemento.val();

  if(verificaString(val)) {
    elemento.removeClass("campo-error");
    elemento.addClass("campo-success");
    
    $("#btnAddPessoa").removeAttr("disabled");
  }
  else {
    elemento.removeClass("campo-success");
    elemento.addClass("campo-error");
    elementoNext.addClass("msg-error");
    elementoNext.append("Nome inválido!");

    $("#btnAddPessoa").attr("disabled", "true");
  }
});

$("#iContatoPessoa").on("keyup", function() {
  $(".form-text").empty();

  const elemento = $(this);
  const elementoNext = $(this).next(".form-text");

  //Caso extrapolou o número de caracteres não adicional como valor
  const val = elemento.val().length < 15 ? elemento.val() : null;

  if(val.length < 15) {
    elemento.addClass("campo-success");

    $("#btnAddLoja").removeAttr("disabled");
  }
  else {
    elemento.addClass("campo-error");
    elementoNext.addClass("msg-error");
    elementoNext.append("O número não corresponde a um formato válido!");

    $("#btnAddPessoa").attr("disabled", "true");
  }
});

//Funções

/*Adicionar a lista de opções*/
loadOption();

function loadOption() {
  /*Adicionar opções ao dropList*/
  listPessoas.forEach(pessoa => {
    $("#listarPessoas").append($('<option>', {
      value: pessoa.nome,
      text: pessoa.nome
    }));
  });
}

function addPessoaOption(pessoa) {
  /*Adicionar pessoa ao dropList*/
  $("#listarPessoas").append($('<option>', {
    value: pessoa.nome,
    text: pessoa.nome
  }));
}

function sorteio() {
  return Math.floor(Math.random() * (listLojas.length));
}

function preencherDivSorteado(numSorteado, pessoaSelected) {  
  let lojaSorteada = listLojas[numSorteado];
  let pessoaSorteada = null;

  if(pessoaSelected) //Busca a pessoa selecionada pelo nome
    pessoaSorteada = listPessoas.find(p => p.nome == pessoaSelected); 
  else //Sorteia pessoa aleatória
    pessoaSorteada = listPessoas[numSorteado]; 
 
  //preenche o campo de nome da pessoa
  $("#nomePessoa").append(pessoaSorteada.nome);
  
  //preenche o campo de nome da loja
  $("#nomeLoja").append(lojaSorteada.nome);

  //preenche o campo de endereço da loja
  $("#enderecoLoja").append(lojaSorteada.endereco);
  
  //preenche o campo de contato da loja
  $("#contatoLoja").append(lojaSorteada.contato);
}

function addLoja(data) {
  let newLoja = new Loja(data[0], data[1], data[2]);
  listLojas.push(newLoja);
}

function addPessoa(data) {
  let newPessoa = new Pessoa(data[0], data[1], data[2]);
  listPessoas.push(newPessoa);

  /*Adicionar no dropList */
  addPessoaOption(newPessoa);
}

function preencherTableLojas(listLojas) {
  let linha = "";
  let loja;

  for(let i = 0; i < listLojas.length; i++) {
    loja = listLojas[i];

    linha += '<tr>';
    linha += '<td class="data">' + loja.nome + '</td>';
    linha += '<td class="data"> Rua... </td>';
    linha += '<td class="data">' + loja.contato + '</td>';
    linha += '</tr>';

    $("#tableVerLojas tbody").prepend(linha);
    linha = "";
  }
}

function preencherTablePessoa(listPessoas) {
  let linha = "";
  let pessoa;

  for(let i = 0; i < listPessoas.length; i++) {
    pessoa = listPessoas[i];

    linha += '<tr>';
    linha += '<td class="data">' + pessoa.nome + '</td>';
    linha += '<td class="data">' + pessoa.email + '</td>';
    linha += '<td class="data">' + pessoa.contato + '</td>';
    linha += '</tr>';

    $("#tableVerPessoas tbody").prepend(linha);
    linha = "";
  }
}

function verificaString(name) {
  let isString = true;
  for (let i = 0; i < name.length; i++) {
    console.log(isNaN(name.charAt(i)))
    if (!isNaN(name.charAt(i)) && name.charAt(i) != " ") {
      isString = false;
      break;
    }
  }

  return isString;
}
