const loginEndpoint = "http://localhost:3000/api/user/login"


describe("Login test suite", () => {

    it("logs in with valid user", () => {
        cy.request({
          method: "POST",
          url: loginEndpoint,
          body: { email: "a@name.com", password: "aPassword" }
        }).then((response) => {
          expect(response.status).to.equal(200)
        })
      })

    it("returns 400 if the user does not exist", () => {
      cy.request({
        method: "POST",
        url: loginEndpoint,
        failOnStatusCode: false,
        body: { email: "nonExisting@user.com", password: "validPassword" }
      }).then((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.equal("User not found")
      })
    })

    it("returns 400 if password is not correct", () => {
      cy.request({
        method: "POST",
        url: loginEndpoint,
        failOnStatusCode: false,
        body: { email: "existing@user.com", password: "wrongPassword" }
      }).then((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.equal("Invalid password")
      })
    })
  
    it("returns 400 with invalid email", () => {
        cy.request({
          method: "POST",
          url: loginEndpoint,
          failOnStatusCode: false,
          body: { email: "invalid", password: "validPassword" },
        }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.equal('"email" must be a valid email')
        })
      })
    
      it("returns 400 with no email", () => {
        cy.request({
          method: "POST",
          url: loginEndpoint,
          failOnStatusCode: false,
          body: { password: "validPassword" },
        }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.equal('"email" is required')
        })
      })
    
      it("returns 400 with invalid password", () => {
        cy.request({
          method: "POST",
          url: loginEndpoint,
          failOnStatusCode: false,
          body: { email: "valid@email.com", password: "Fail" },
        }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.equal('"password" length must be at least 6 characters long')
        })
      })
    
      
      it("returns 400 with no password", () => {
        cy.request({
          method: "POST",
          url: loginEndpoint,
          failOnStatusCode: false,
          body: { email: "valid@email.com" },
        }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.equal('"password" is required')
        })
      })
  
})