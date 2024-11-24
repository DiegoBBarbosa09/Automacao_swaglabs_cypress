describe('Testes de validação para Carrinho de compras', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.Login();

    });

    it('Adicionar itens no carrinho', () => {
        cy.get('.shopping_cart_link')
            .invoke('text')
            .then((qtdInicial) => {
                // Converte o texto inicial em um número inteiro
                const valorInicial = parseInt(qtdInicial, 10) || 0;
                // Clica no botão para adicionar um item ao carrinho
                cy.get('.btn_primary.btn_inventory').first().click();
                // Verifica se o valor atualizado é o esperado
                cy.get('.shopping_cart_link').invoke('text').then((novoTexto) => {
                    // Converte o valor esperado de volta para string antes de comparar
                    const valorEsperado = String(valorInicial + 1);
                    // Compara a string do novo valor com o valor esperado
                    expect(novoTexto).to.equal(valorEsperado);
                });
            });
    });

    it('Remover itens do carrinho de compras', () => {
        cy.get('.btn_primary.btn_inventory').first().click();
        cy.get('.shopping_cart_link').click();
        cy.contains('.btn_secondary', 'REMOVE').click();
        cy.get('.cart_item_label').should('not.exist');

    });

    it('Atualizar itens do carrinho de compras', () => {
        cy.AdicionarItemCarrinho(0);
        cy.AdicionarItemCarrinho(1);

    });

    it('Manutenção do carrinho após logout e login', () => {
        cy.AdicionarItemCarrinho(3);
        cy.Logout();
        cy.Login();
        cy.AdicionarItemCarrinho(5);
    });

    it('Avançar tela de carrinho sem inserir produto', () => {
        cy.get('.shopping_cart_link').click();
        cy.get('.checkout_button').click();

        cy.contains('.error', 'Cart is empty').should('be.visible');
        
    });

});
