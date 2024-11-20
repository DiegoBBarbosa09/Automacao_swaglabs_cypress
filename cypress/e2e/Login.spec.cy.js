describe('template spec', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Login e logout com credenciais validas', () => {
        cy.get('[data-test="username"]').type(Cypress.env('username'));
        cy.get('[data-test="password"]').type(Cypress.env('password'), { log: false });
        cy.get('#login-button').click();

        cy.contains('.product_label', 'Products').should('be.visible');

        cy.get('.bm-burger-button').click();
        cy.get('#logout_sidebar_link').click();

        cy.url().should('eq', 'https://www.saucedemo.com/v1/index.html');
    });

    it('Login com credenciais invalidas', () => {
        cy.get('[data-test="username"]').type(Cypress.env('userinvalid'));
        cy.get('[data-test="password"]').type(Cypress.env('passinvalid'), { log: false });
        cy.get('#login-button').click();

        const validarErro = [
            "Epic sadface: ",
            "Username and password do not match any user in this service"
        ];
        validarErro.forEach(validarErro => {
            cy.contains('[data-test="error"]', validarErro).should('be.visible');
        });
    });

});
