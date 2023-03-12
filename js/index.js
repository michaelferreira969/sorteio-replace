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

/*Ao clicar no botão sortear*/
$(document).on("click", "#btnSortear", function () {
  let sorteado = Sorteio();

  MontarPagSorteado(sorteado);
});

/*Ao clicar no botão voltar*/
$(document).on("click", "#btnVoltar", function () {
  //Abre outra página
  window.location.href = "index.html";
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
  return Math.floor(Math.random() * listLojas.length);
}

function MontarPagSorteado(sorteado) {
  //Abre outra página
  window.location.href = "sorteado.html";

  console.log(listPessoas[sorteado]);

  //preenche o campo de nome da pessoa
  $("#nomePessoa").append(listPessoas[sorteado]);

  //preenche o campo de nome da loja
  $("#nomeLoja").append(listLojas[sorteado]);

  //preenche o campo de endereço da loja
  $("#enderecoLoja").append(listLojas[sorteado]);
  
  //preenche o campo de contato da loja
  $("#contatoLoja").append(listLojas[sorteado]);
}

/*Alterar plano de fundo a cada 2 minutos*/
setInterval(alterarFundo, 120000);

/*Mudar o plano de fundo*/
function alterarFundo() {
  if($("body").hasClass("bg-1"))
    $("body").addClass("bg-2");
  else if($("body").hasClass("bg-2"))
    $("body").addClass("bg-3");
  else 
    $("body").addClass("bg-1");
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
  