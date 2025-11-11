// cypress/e2e/s206-lista1-saucedemo.cy.js

describe('S206 - Lista 1 - Testes de UI no SauceDemo', () => {
  const baseUrl = 'https://www.saucedemo.com/'

  // função auxiliar pra não repetir login
  const fazerLogin = (usuario = 'standard_user', senha = 'secret_sauce') => {
    cy.get('[data-test="username"]').type(usuario)
    cy.get('[data-test="password"]').type(senha)
    cy.get('[data-test="login-button"]').click()
  }

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('1) Login com sucesso', () => {
    fazerLogin()
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain.text', 'Products')
  })

  it('2) Login com credenciais inválidas (teste negativo)', () => {
    fazerLogin('usuario_que_nao_existe', 'senha_errada')
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface')
  })

  it('3) Adicionar produto ao carrinho e validar badge', () => {
    fazerLogin()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it('4) Remover produto do carrinho', () => {
    fazerLogin()
    // adiciona
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    // remove
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.cart_item').should('not.exist')
  })

  it('5) Iniciar checkout com dados válidos', () => {
    fazerLogin()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Gustavo')
    cy.get('[data-test="lastName"]').type('Aluno')
    cy.get('[data-test="postalCode"]').type('01000-000')
    cy.get('[data-test="continue"]').click()

    cy.get('.summary_info').should('be.visible')
  })

it('6) Ordenar produtos por preço (low to high)', () => {
  fazerLogin()

  
  cy.url().should('include', '/inventory.html')
  cy.get('.inventory_list', { timeout: 10000 }).should('be.visible')

  
  cy.get('.product_sort_container')
    .should('be.visible')
    .select('lohi')

  cy.get('.inventory_item_price').first().should('have.text', '$7.99')
})

})
