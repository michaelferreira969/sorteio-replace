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

//Eventos

/*Ocultar div ao carregar página*/
$("#divSorteado").hide();

/*Ao clicar no botão sortear*/
$(document).on("click", "#btnSortear", function () {
  /*ocultar div*/
  $("#divSorteio").hide();

  /*Mostrar div*/
  $("#divSorteado").show();

  //Chama função que faz sorteio
  let numSorteado = Sorteio(); 

  PreencherDivSorteado(numSorteado);
});

/*Ao clicar no botão voltar*/
$(document).on("click", "#btnVoltar", function () {
  console.log()
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

let listLojas = [];
let loja = {};

let listPessoas = [];
let pessoa = {};

/*Nova loja */
loja = new Loja("Supremo", "Berrine, 7984", 12114789)
listLojas.push(loja);

loja = new Loja("Teste", "Flórida, 7984", 7777777)
listLojas.push(loja);

loja = new Loja("Sodie", "Flórida, 7984", 7777777)
listLojas.push(loja);

loja = new Loja("Padaria", "Flórida, 7984", 7777777)
listLojas.push(loja);

loja = new Loja("Carrefour", "Flórida, 7984", 7777777)
listLojas.push(loja);

/*Nova pessoa*/
pessoa = new Pessoa("Michael", "michael@", 12114789)
listPessoas.push(pessoa);

pessoa = new Pessoa("Douglas", "michael@", 12114789)
listPessoas.push(pessoa);

pessoa = new Pessoa("Andy", "michael@", 12114789)
listPessoas.push(pessoa);

pessoa = new Pessoa("J", "michael@", 12114789)
listPessoas.push(pessoa);

//Funções

function Sorteio() {
  return Math.floor(Math.random() * (listLojas.length));
}

function PreencherDivSorteado(numSorteado) {
  let pessoaSorteada = listPessoas[numSorteado];
  let lojaSorteada = listLojas[numSorteado];
 
  //preenche o campo de nome da pessoa
  $("#nomePessoa").append(pessoaSorteada.nome);
  
  //preenche o campo de nome da loja
  $("#nomeLoja").append(lojaSorteada.nome);

  //preenche o campo de endereço da loja
  $("#enderecoLoja").append(lojaSorteada.endereco);
  
  //preenche o campo de contato da loja
  $("#contatoLoja").append(lojaSorteada.contato);

  AlterarImagemLoja(lojaSorteada.nome);
}

/*Mudar a imagem da loja*/
function AlterarImagemLoja(nomeLoja) {

  if(nomeLoja == "Sodie") 
    $("#img-loja").attr("src", "img/bg-1.jpg");
  else if(nomeLoja == "Supremo")
    $("#img-loja").attr("src", "img/bg-2.jpg");
  else 
    $("#img-loja").attr("src", "img/bg-3.jpg");
}

/*Listar pessoas
$("#listarPessoas").append(
  listPessoas.forEach(p => {
    `<option value="${p.Nome}">${p.Nome}</option>`
}));

function cadastrarLoja(nome, endereco, contato) {
    let loja = {
        Nome: nome,
        Endereco: endereco,
        Contato: contato,
    };

    listLojas.push(loja);
}


function cadastrarPessoa(nome, endereco, contato) {
    let loja = {
        Nome: nome,
        Endereco: endereco,
        Contato: contato,
    };

    listLojas.push(loja);
}

function cadastrarPessoa() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;
  
    const pessoa = new Pessoa(nome, email, celular);

    console.log(pessoa.toString());
  }
  

/*
class Pessoa {
    constructor(nome, email, celular) {
      this.nome = nome;
      this.email = email;
      this.celular = celular;
    }
  
    toString() {
      return `Nome: ${this.nome}, Email: ${this.email}, Celular: ${this.celular}`;
    }
  }
*/
  