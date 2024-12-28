import { carrinho, checkout } from "../support/locators/locators_gerais";

describe("Testes de validação para Carrinho de compras", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.Login();
  });

  it("Adicionar itens no carrinho", () => {
    cy.get(carrinho.button_carrinho)
      .invoke("text")
      .then((qtdInicial) => {
        // Converte o texto inicial em um número inteiro
        const valorInicial = parseInt(qtdInicial, 10) || 0;
        // Clica no botão para adicionar um item ao carrinho
        cy.get(carrinho.inventario).first().click();
        // Verifica se o valor atualizado é o esperado
        cy.get(carrinho.button_carrinho)
          .invoke("text")
          .then((novoTexto) => {
            // Converte o valor esperado de volta para string antes de comparar
            const valorEsperado = String(valorInicial + 1);
            // Compara a string do novo valor com o valor esperado
            expect(novoTexto).to.equal(valorEsperado);
          });
      });
  });

  it("Remover itens do carrinho de compras", () => {
    cy.get(carrinho.inventario).first().click();
    cy.get(carrinho.button_carrinho).click();
    cy.contains(carrinho.button_remove, "REMOVE").click();
    cy.get(carrinho.label_item).should("not.exist");
  });

  it("Atualizar itens do carrinho de compras", () => {
    cy.AdicionarItemCarrinho(0);
    cy.AdicionarItemCarrinho(1);
  });

  it("Manutenção do carrinho após logout e login", () => {
    cy.AdicionarItemCarrinho(3);
    cy.Logout();
    cy.Login();
    cy.AdicionarItemCarrinho(4);
  });

  it("Avançar tela de carrinho sem inserir produto", () => {
    cy.get(carrinho.button_carrinho).click();
    cy.get(checkout.button_checkout).click();

    cy.contains(carrinho.error_carrinho, "Cart is empty").should("be.visible");
  });
});
