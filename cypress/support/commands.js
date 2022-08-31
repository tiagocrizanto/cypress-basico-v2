// para usar mais arquivos basta criar arquivos diferente e importar no arquivo e2e.js
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Nome usuário');
    cy.get('#lastName').type('Last name');
    cy.get('#email').type('mail@mail.com');
    cy.get('#phone').type('553355556666');
    cy.get('#open-text-area').type('Test');
    cy.get('button[type="submit').click();
});