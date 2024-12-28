import { login } from '../support/locators/locators_gerais'


describe("Testes de validação de login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  
  it("Login e logout com credenciais validas", () => {
    cy.get(login.username).type(Cypress.env("username"));
    cy.get(login.password).type(Cypress.env("password"), { log: false });
    cy.get(login.button_login).click();

    cy.contains(login.label_, "Products").should("be.visible");

    cy.get(login.button_burger).click();
    cy.get(login.logout).click();

    cy.url().should("eq", login.url_expect);
  });

  it("Login com credenciais invalidas", () => {
    cy.get(login.username).type(Cypress.env("userinvalid"));
    cy.get(login.password).type(Cypress.env("passinvalid"), { log: false });
    cy.get(login.button_login).click();

    const validarErro = ["Epic sadface: ", "Username and password do not match any user in this service"];
    validarErro.forEach((validarErro) => {
      cy.contains(login.error_login, validarErro).should("be.visible");
    });
  });

  it("validação de campos obrigatorios", () => {
    cy.get(login.username).type(Cypress.env("username"));
    cy.get(login.button_login).click();
    const validarErroName = ["Epic sadface: ", "Password is required"];
    validarErroName.forEach((validarErroName) => {
      cy.contains(login.error_login, validarErroName).should("be.visible");
    });
    cy.get(login.username).type("{selectAll}{backspace}");

    cy.get(login.password).type(Cypress.env("password"), { log: false });
    cy.get(login.button_login).click();
    const validarErroPass = ["Epic sadface: ", "Username is required"];
    validarErroPass.forEach((validarErroPass) => {
      cy.contains(login.error_login, validarErroPass).should("be.visible");
    });
  });

  it("Validação usuario bloqueado", () => {
    cy.get(login.username).type(Cypress.env("userlock"));
    cy.get(login.password).type(Cypress.env("password"), { log: false });
    cy.get(login.button_login).click();

    const validarErroBlock = ["Epic sadface: ", "Sorry, this user has been locked out."];
    validarErroBlock.forEach((validarErroBlock) => {
      cy.contains(login.error_login, validarErroBlock).should("be.visible");
    });
  });

  it("Deve invalidar a sessão após o logout", () => {
    cy.get(login.username).type(Cypress.env("username"));
    cy.get(login.password).type(Cypress.env("password"), { log: false });
    cy.get(login.button_login).click();

    // Logout
    cy.get(login.button_burger).click();
    cy.get(login.logout).click();

    // Tenta acessar página protegida após logout
    cy.visit(login.url_visit);
    cy.url().should("include", login.url_expect); // Deve redirecionar para a página de login
  });
});
