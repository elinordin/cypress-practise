describe('My portfolio', () => {

    before(() => {
        cy.visit('https://elinnordin.com')
    })
    
    it('The switches work as expected', () => {
        cy.get('.theme-btn').should('contain', 'LIGHT')
        cy.get('.theme-btn').click()
        cy.get('.theme-btn').should('contain', 'DARK')
        cy.get('.music-btn').should('contain', 'OFF')
        cy.get('.music-btn').click()
        cy.get('.music-btn').should('contain', 'ON')
        cy.get('.theme-btn').click()
        cy.get('.music-btn').click()
    })

    it('Navigates correctly', () => {
        cy.get('#app').should('have.class', 'center')
        cy.get('.to-about-btn').click()
        cy.get('#app').should('have.class', 'right')
        cy.get('.brain-wrapper').click()
        cy.get('#app').should('have.class', 'center')
        cy.get('.to-portfolio-btn').click()
        cy.get('#app').should('have.class', 'left')
        cy.get('.brain-wrapper').click()
        cy.get('#app').should('have.class', 'center')
    })

    it('Contains six projects', () => {
        cy.get('.to-portfolio-btn').click()
        cy.get('.portfolio-grid .box').should('have.length', 6) 
    })    

})