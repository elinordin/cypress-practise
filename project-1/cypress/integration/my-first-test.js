/// <reference types="cypress" />

it('google test', () => {
    
    cy.visit('https://google.com')
    cy.get('#L2AGLb > .jyfHyd').click()
    cy.get('.gLFyf').type('Automation Step by Step{enter}')
    cy.contains('Videor').click()

})
