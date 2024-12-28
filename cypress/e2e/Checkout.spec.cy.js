import { faker as FakerJs } from "@faker-js/faker";
import { carrinho, checkout } from "../support/locators/locators_gerais";

describe("Testes de validação de checkout information e overview", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.Login();
    cy.get(carrinho.button_carrinho).click();
    cy.get(checkout.button_checkout).click();
  });

  it("Validação de campos obrigatorios checkout your information", () => {
    cy.get(checkout.continue).click();
    cy.contains(checkout.error_checkout, "Error: First Name is required").should("be.visible");
    cy.get(checkout.firstname).type(FakerJs.person.firstName());
    cy.get(checkout.continue).click();
    cy.contains(checkout.error_checkout, "Error: Last Name is required").should("be.visible");
    cy.get(checkout.lastname).type(FakerJs.person.lastName());
    cy.get(checkout.continue).click();
    cy.contains(checkout.error_checkout, "Error: Postal Code is required").should("be.visible");
  });

  it("Preenchimento das checkout your information", () => {
    cy.get(checkout.firstname).type(FakerJs.person.firstName());
    cy.get(checkout.lastname).type(FakerJs.person.lastName());
    cy.get(checkout.postalcode).type(FakerJs.location.zipCode());
    cy.get(checkout.continue).click();
    const sumaryInfo = [
      "Checkout: Overview",
      "Payment Information:",
      "SauceCard #31337",
      "Shipping Information:",
      "FREE PONY EXPRESS DELIVERY!",
      "CANCEL",
      "FINISH",
    ];
    sumaryInfo.forEach((sumaryInfo) => {
      cy.get(checkout.pagina).should("contain", sumaryInfo);
    });
  });
});
