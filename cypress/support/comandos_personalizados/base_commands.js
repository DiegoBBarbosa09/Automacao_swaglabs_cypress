import { carrinho, login } from "../locators/locators_gerais";

Cypress.Commands.add("Login", () => {
  cy.get(login.username).type(Cypress.env("username"));
  cy.get(login.password).type(Cypress.env("password"), { log: false });
  cy.get(login.button_login).click();
});

Cypress.Commands.add("AdicionarItemCarrinho", (index) => {
  cy.get(carrinho.button_carrinho)
    .invoke("text")
    .then((qtdInicial) => {
      const valorInicial = parseInt(qtdInicial, 10) || 0;
      cy.get(carrinho.inventario).eq(index).click();
      cy.get(carrinho.button_carrinho)
        .invoke("text")
        .then((novoTexto) => {
          const valorEsperado = String(valorInicial + 1);
          expect(novoTexto).to.equal(valorEsperado);
        });
    });
});

Cypress.Commands.add("Logout", () => {
  cy.get(login.button_burger).click();
  cy.get(login.logout).click();
});
