let listLojas = [];




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
  

/**/
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
  