describe('Testes de validação de checkout information e overview', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.Login();
        cy.get('.shopping_cart_link').click();
        cy.get('.checkout_button').click();
    });

    it('Validação de campos obrigatorios', () => {
        cy.get('input[value="CONTINUE"]').click();
        cy.contains('[data-test="error"]', 'Error: First Name is required').should('be.visible');
        cy.get('[data-test="firstName"]').type('Diego');
        cy.get('input[value="CONTINUE"]').click();
        cy.contains('[data-test="error"]', 'Error: Last Name is required').should('be.visible');
        cy.get('[data-test="lastName"]').type('Brito');
        cy.get('input[value="CONTINUE"]').click();
        cy.contains('[data-test="error"]', 'Error: Postal Code is required').should('be.visible');
    });

});
