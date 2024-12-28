import { faker as FakerJs } from '@faker-js/faker';
import { carrinho, checkout, finish } from '../support/locators/locators_gerais'

describe('fluxos de compras swaglabs', () => {
    beforeEach(() => {
        cy.visit("/");
        cy.Login();
    });

    it('Validar fluxo de compra', () => {
        cy.get(carrinho.inventario).first().should('be.visible')
        cy.get(carrinho.inventario).first().click();
        cy.get(carrinho.button_carrinho).click();
        cy.get(checkout.button_checkout).click();
        cy.get(checkout.firstname).type(FakerJs.person.firstName());
        cy.get(checkout.lastname).type(FakerJs.person.lastName());
        cy.get(checkout.postalcode).type('00000000');
        cy.contains(checkout.continue, 'CONTINUE').click()
        cy.contains(checkout.button_finish, 'FINISH').click()
        const itensPagina = [
            'THANK YOU FOR YOUR ORDER'
        ]
        itensPagina.forEach(itensPagina => {
            cy.get(finish.itens_pagina).should('contain', itensPagina)
        })
        cy.get('img.pony_express').should('exist');
    })

    it('Validar fluxo de compra com carrinho vazio', () => {
        cy.get(carrinho.inventario).first().should('be.visible')
        cy.get(carrinho.button_carrinho).click();
        cy.get(checkout.button_checkout).click();
        cy.get(checkout.firstname).type(FakerJs.person.firstName());
        cy.get(checkout.lastname).type(FakerJs.person.lastName());
        cy.get(checkout.postalcode).type('00000000');
        cy.contains(checkout.continue, 'CONTINUE').click()
        cy.contains(checkout.button_finish, 'FINISH').click()
        cy.contains(finish.error_compra, 'Carrinho vazio').should('be.visible');
    })
})