it('returns 200 with post-request to /register', () => {

    cy.request('POST', 'http://localhost:3000/api/user/register')
        .then((response) => {
            expect(response.status).to.equal(200)
        })

})