describe('Testes de validação de login', () => {

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

    it('validação de campos obrigatorios', () => {
        cy.get('[data-test="username"]').type(Cypress.env('username'));
        cy.get('#login-button').click();
        const validarErroName = [
            "Epic sadface: ",
            "Password is required"
        ];
        validarErroName.forEach(validarErroName => {
            cy.contains('[data-test="error"]', validarErroName).should('be.visible');
        });
        cy.get('[data-test="username"]').type(  '{selectAll}{backspace}');
        
        cy.get('[data-test="password"]').type(Cypress.env('password'), { log: false });
        cy.get('#login-button').click();
        const validarErroPass = [
            "Epic sadface: ",
            "Username is required"
        ];
        validarErroPass.forEach(validarErroPass => {
            cy.contains('[data-test="error"]', validarErroPass).should('be.visible');
        });
    });

    it('Validação usuario bloqueado', () => {
        cy.get('[data-test="username"]').type(Cypress.env('userlock'));
        cy.get('[data-test="password"]').type(Cypress.env('password'), { log: false });
        cy.get('#login-button').click();

        const validarErroBlock = [
            "Epic sadface: ",
            "Sorry, this user has been locked out."
        ];
        validarErroBlock.forEach(validarErroBlock => {
            cy.contains('[data-test="error"]', validarErroBlock).should('be.visible');
        });
    });

    it('Deve invalidar a sessão após o logout', () => {
        cy.get('[data-test="username"]').type(Cypress.env('username'));
        cy.get('[data-test="password"]').type(Cypress.env('password'), { log: false });
        cy.get('#login-button').click();
    
        // Logout
        cy.get('.bm-burger-button').click();
        cy.get('#logout_sidebar_link').click();
    
        // Tenta acessar página protegida após logout
        cy.visit('https://www.saucedemo.com/v1/inventory.html');
        cy.url().should('include', 'https://www.saucedemo.com/v1/index.html'); // Deve redirecionar para a página de login
    });

});
