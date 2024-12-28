# Projeto: Automacao Swaglabs Cypress

Descrição

Este é um projeto de automação de testes utilizando o framework Cypress em conjunto com o Allure Report. O objetivo é criar testes automatizados para o site SwagLabs e gerar relatórios detalhados dos resultados.

## Dependências

As principais dependências do projeto são:

Cypress: Framework de automação de testes

Allure Reporter: Geração de relatórios detalhados

Mocha Allure Reporter: Plugin para integração com o Cypress

ESLint: Linter para JavaScript

Prettier: Formatador de código

### Clonar repositorio
clonar repositorio utilizando HTTPS ou SSH
```
git clone <endereço do repositorio>
```


Para instalar as dependências, execute:

```
npm install
```

Os scripts configurados no arquivo package.json são:

Lintar o código:
```
npm run lint
npm run lint:fix
```

Abrir o Cypress:
```
npm run cy:open
```
Executar os testes:
```
npm run cy:run:allure
```
Executar todos os passos de teste e relatório:
```
npm run cy:ci
```
Gerar relatório Allure:
```
npm run cy:generate
```
Limpar relatórios anteriores:
```
npm run allure:clear
```