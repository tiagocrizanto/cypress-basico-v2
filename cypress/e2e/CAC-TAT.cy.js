/// <reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preenche os campos obrigatórios do formulário', () => {
    cy.get('#firstName').type('Nome usuário');
    cy.get('#lastName').type('Last name');
    cy.get('#email').type('mail@mail.com');
    cy.get('#phone').type('553355556666');
    cy.get('#open-text-area').type('Test, Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test', { delay: 0 });
    cy.get('button[type="submit').click();

    cy.get('.success').should('be.visible');
  });

  it('Exibir nensagem de erro ao submeter informação inválida', () => {
    cy.get('#firstName').type('Nome usuário');
    cy.get('#lastName').type('Last name');
    cy.get('#email').type('mail@mail,com');
    cy.get('#phone').type('553355556666');
    cy.get('#open-text-area').type('Test');
    cy.get('button[type="submit').click();

    cy.get('.error').should('be.visible');
  });

  it('Campo telefone vazio quando preenchido com valor não númerico', () => {
    cy.get('#phone')
      .type('asdasd')
      .should('have.value', '');
  });

  it('Exibe mensagem de erro quando o tel se torna obrigatório mas não é preenchido antes do envio do form', () => {
    cy.get('#firstName').type('Nome usuário');
    cy.get('#lastName').type('Last name');
    cy.get('#email').type('mail@mail,com');
    cy.get('#phone').type('553355556666');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('Test');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('Preenche e lempa os campos nome, sobrenome, email, e telefone', () => {
    cy.get('#firstName').type('Nome usuário').clear();
  });

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  });

  //Select
  it('Seleciona um produto (YouTube) por texto', () => {
    cy.get("#product")
      .select('YouTube')
      .should('have.value', 'youtube');
  });

  it('Seleciona um produto por índice', () => {
    cy.get("#product")
      .select(1)
      .should('have.value', 'blog');
  });

  // radio
  it('Marca tipo de atendimento feedabck (radiobutton)', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback');
  });

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio)=> {
        cy.wrap($radio).check();
        cy.wrap($radio).should('be.checked')
      });
  });

  //checkbox
  it('Marca ambos os checkbox, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });
});