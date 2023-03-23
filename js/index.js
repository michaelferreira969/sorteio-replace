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

//Classe principal
class SorteioReplace {
  constructor() {

    //Para armazenar as lojas e pessoas
    this.listLojas = [];
    this.listPessoas = [];

    this.init();
  }

  init() {
    let _ = this;

    //Ocultar div sorteado
    $("#divSorteado").hide();

    //Adicionar pessoas e lojas automáticamente
    _.pessoasAndLojas();

    //Carregar lista de pessoas
    _.loadOption();

    //Máscaras dos campos
    _.mask();

    //Eventos jQuery
    _.events();
  }

  mask() {
    $('#iContatoLoja').mask('(00) 00000-0000');
    $('#iContatoPessoa').mask('(00) 00000-0000');
  }

  events() {
    let _ = this;

    /*Fazer Sorteio*/
    $(document).on("click", "#btnSortear", function () {
      /*Pegar a pessoa escolhida*/
      let pessoaSelected =  $("#listarPessoas").val();

      /*ocultar div*/
      $("#divSorteio").hide();

      /*Mostrar div*/
      $("#divSorteado").show();

      //Chama função que faz sorteio
      let numSorteado = _.sorteio(); 

      _.preencherDivSorteado(numSorteado, pessoaSelected);
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
      let nome = $("#iNomeLoja").val(),
        endereco = $("#iEnderecoLoja").val(),
        contato = $("#iContatoLoja").val();

      contato = _.formatarContato(contato);

      if(_.tratarDados(nome, endereco, contato)) {

        let data = new Loja(nome, endereco, contato);

        _.addLoja(data);

        //Limpar campos
        $("#iNomeLoja").val("");
        $("#iEnderecoLoja").val("");
        $("#iContatoLoja").val("");
  
        //Retorna mensagem de sucesso
        $.toast({
          heading: 'Success',
          text: 'Loja Adicionada com sucesso!',
          showHideTransition: 'slide',
          icon: 'success',
          position: 'top-right'
        });
  
        //Fechar modal
        $(".close-modal").click();  
      }
      else {
        //Retorna mensagem de erro
        $.toast({
          heading: 'Error',
          text: 'Não foi possível adicionar loja! Verifique os campos digitados.',
          showHideTransition: 'slide',
          icon: 'error',
          position: 'top-right'
        });
      }
    });

    /*Adicionar nova pessoa*/
    $(document).on("click", "#btnAddPessoa", function () {
      let nome = $("#iNomePessoa").val(),
        email = $("#iEmailPessoa").val(),
        contato = $("#iContatoPessoa").val();

      contato = _.formatarContato(contato);

      //Verificar se dados estão corretos
      if(_.tratarDados(nome, email, contato)) {

        let data = new Pessoa(nome, email, contato);
  
        _.addPessoa(data);
  
        //Limpar campos
        $("#iNomePessoa").val("");
        $("#iEmailPessoa").val("");
        $("#iContatoPessoa").val("");
  
        //Retorna mensagem de sucesso
        $.toast({
          heading: 'Success',
          text: 'Pessoa Adicionada com sucesso!',
          showHideTransition: 'slide',
          icon: 'success',
          position: 'top-right'
        });
  
        //Fechar modal
        $(".close-modal").click();  
      }
      else {
        //Retorna mensagem de erro
        $.toast({
          heading: 'Error',
          text: 'Não foi possível adicionar pessoa! Verifique os campos digitados.',
          showHideTransition: 'slide',
          icon: 'error',
          position: 'top-right'
        });
      }
    });

    /*Montar dados da tabela Loja*/
    $(document).on("click", "#btnModalVerLojas", function () {
      $("#tableVerLojas tbody").empty();
      $("#totalLojas").empty();

      _.preencherTableLojas(_.listLojas);

      $("#totalLojas").append(_.listLojas.length);
    });

    /*Montar dados da tabela Pessoa*/
    $(document).on("click", "#btnModalVerPessoas", function () {
      $("#tableVerPessoas tbody").empty();
      $("#totalPessoas").empty();

      _.preencherTablePessoa(_.listPessoas);

      $("#totalPessoas").append(_.listPessoas.length);
    });

    $("#iNomeLoja").on("keyup", function() {
      $(".form-text").empty();

      const elemento = $(this);
      const elementoNext = $(this).next(".form-text");
      const val = elemento.val();

      if(_.verificaString(val)) {
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
      const val = elemento.val().length < 16 ? elemento.val() : null;

      if(val.length < 16) {
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

      if(_.verificaString(val)) {
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
      const val = elemento.val().length < 16 ? elemento.val() : null;

      if(val.length < 16) {
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
  }

  //Setar pessoas e lojas padrão
  pessoasAndLojas() {
    let _ = this,
      pessoa = {},
      loja = {};

    loja = new Loja("Supremo Bolos", "Rua Florida, 1.410 Brooklin", 11951022579);
    _.listLojas.push(loja);

    loja = new Loja("Sodie Doces", "R. Carlos Rega, 74 - Brooklin", 11955053434)
    _.listLojas.push(loja);

    loja = new Loja("Isabela Akkari", "R. Comendador Miguel Calfat, 410 - Vila Nova Conceição", 11950961915)
    _.listLojas.push(loja);

    loja = new Loja("Fábrica de Bolo Vó Alzira", "Av. Padre Antônio José dos Santos, 1690 - Cidade Monções", 11975635523)
    _.listLojas.push(loja);

    pessoa = new Pessoa("Galo Cego", "galocego06@gmail.com", 11953695641)
    _.listPessoas.push(pessoa);

    pessoa = new Pessoa("Jd", "jd01789@gmail.com", 11111111111)
    _.listPessoas.push(pessoa);

    pessoa = new Pessoa("Bigobaldo", "bigobaldo@hotmail.com", 22222222222)
    _.listPessoas.push(pessoa);
  }

  //Carregar opções ao dropList de pessoas
  loadOption() {
    let _ = this;

    _.listPessoas.forEach(pessoa => {
      $("#listarPessoas").append(
        $('<option>', {
        value: pessoa.nome,
        text: pessoa.nome
        }));
    });
  }
  
  //Adicionar nova pessoa nas opções
  addPessoaOption(pessoa) {
    /*Adicionar pessoa ao dropList*/
    $("#listarPessoas").append($('<option>', {
      value: pessoa.nome,
      text: pessoa.nome
    }));
  }
  
  //Sortear um número
  sorteio() {
    let _ = this;

    return Math.floor(Math.random() * (_.listLojas.length));
  }
  
  //Preencher div sorteado
  preencherDivSorteado(numSorteado, pessoaSelected) {
    let _ = this,
      lojaSorteada,
      pessoaSorteada;
    
    lojaSorteada = _.listLojas[numSorteado];
    pessoaSorteada = null;
  
    if(pessoaSelected) //Busca a pessoa selecionada pelo nome
      pessoaSorteada = _.listPessoas.find(p => p.nome == pessoaSelected); 
    else //Sorteia pessoa aleatória
      pessoaSorteada = _.listPessoas[numSorteado]; 
   
    //preenche o campo de nome da pessoa
    $("#nomePessoa").append(pessoaSorteada.nome);
    
    //preenche o campo de nome da loja
    $("#nomeLoja").append(lojaSorteada.nome);
  
    //preenche o campo de endereço da loja
    $("#enderecoLoja").append(lojaSorteada.endereco);
    
    //preenche o campo de contato da loja
    $("#contatoLoja").append(lojaSorteada.contato);
  }
  
  //Adicionar nova loja
  addLoja(data) {
    let _ = this,
      newLoja;

    newLoja = new Loja(data.nome, data.endereco, data.contato);
    _.listLojas.push(newLoja);
  }
  
  //Adicionar pessoa
  addPessoa(data) {
    let _ = this,
      newPessoa;

    newPessoa = new Pessoa(data.nome, data.email, data.contato);
    _.listPessoas.push(newPessoa);
  
    /*Adicionar no dropList */
    _.addPessoaOption(newPessoa);
  }
  
  //Preencher tabela de lojas
  preencherTableLojas(listLojas) {
    let _ = this,
      linha = "",
      loja,
      contatoFormated;
  
    for(let i = 0; i < listLojas.length; i++) {
      loja = listLojas[i];

      contatoFormated = loja.contato.toString();
      contatoFormated = contatoFormated.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  
      linha += '<tr>';
      linha += '<td class="overflow text-left">' + loja.nome + '</td>';
      linha += '<td class="overflow text-left" title="' + loja.endereco + '">' + loja.endereco + '</td>';
      linha += '<td class="overflow">' + contatoFormated + '</td>';
      linha += '</tr>';
  
      $("#tableVerLojas tbody").prepend(linha);
      linha = "";
    }
  }
  
  //Preencher tabela de pessoas
  preencherTablePessoa(listPessoas) {
    let _ = this, 
      linha = "",
      pessoa,
      contatoFormated;
  
    for(let i = 0; i < listPessoas.length; i++) {
      pessoa = listPessoas[i];

      contatoFormated = pessoa.contato.toString();
      contatoFormated = contatoFormated.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  
      linha += '<tr>';
      linha += '<td class="overflow">' + pessoa.nome + '</td>';
      linha += '<td class="overflow" title="' + pessoa.email + '">' + pessoa.email + '</td>';
      linha += '<td class="overflow">' + contatoFormated + '</td>';
      linha += '</tr>';
  
      $("#tableVerPessoas tbody").prepend(linha);
      linha = "";
    }
  }

  tratarDados(nome, email, contato) {
    let _ = this;

    //Verificação do nome
    if(!_.verificaString(nome))
      return false;
    
    if(!_.verificaContato(contato))
      return false;  
    
    return true;
  }
  
  verificaString(name) {
    let isString = true;

    for (let i = 0; i < name.length; i++) {
      if (!isNaN(name.charAt(i)) && name.charAt(i) != " ") {
        isString = false;
        break;
      }
    }
  
    return isString;
  }

  verificaContato(contato) {
    contato = contato.toString().length;

    return contato == 11 ? true : false;
  }

  formatarContato(contato) {
    //Remove tudo que não for dígito
    contato = contato.replace(/\D/g, '');
    
    //Remove espaços no início e no final da string
    contato = contato.trim(); 
  
    return contato;
  }

}(function () { new SorteioReplace() }())



