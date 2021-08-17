const { response } = require("express")

it('returns register with post-request to /register', () => {

    cy.request('POST', 'http://localhost:3000/api/user/register')
        .then((response) => {
            expect(response.body).to.contain('Register')
        })

})