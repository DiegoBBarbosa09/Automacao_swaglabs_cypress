
export const login = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    button_login: "#login-button",
    label_: '.product_label',
    button_burger: '.bm-burger-button',
    logout: '#logout_sidebar_link',
    url_expect: 'https://www.saucedemo.com/v1/index.html',
    error_login: '[data-test="error"]',
    url_visit: 'https://www.saucedemo.com/v1/inventory.html'
}

export const checkout = {
    continue: 'input[value="CONTINUE"]',
    error_checkout: '[data-test="error"]',
    firstname: '[data-test="firstName"]',
    lastname: '[data-test="lastName"]',
    postalcode: '[data-test="postalCode"]',
    pagina: '#page_wrapper',
    button_checkout: '.checkout_button',
    button_finish: '.btn_action'
}

export const carrinho = {
    button_carrinho: '.shopping_cart_link',
    inventario: '.btn_primary.btn_inventory',
    button_remove: '.btn_secondary',
    label_item: '.cart_item_label',
    error_carrinho: '[data-test="error"]'
}

export const finish = {
    itens_pagina: '#checkout_complete_container',
    error_compra: '[data-test="error"]'
}