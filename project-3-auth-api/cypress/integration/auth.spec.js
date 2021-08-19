const registerEndpoint = "http://localhost:3000/api/user/register"
const deleteEndpoint = "http://localhost:3000/api/user/delete"

describe("/register test suite", () => {

  it("creates user with valid body", () => {
    cy.request({
        method: "POST", 
        url: registerEndpoint, 
        body: { name: "Test Name", email: "test@email.com", password: "testPassword" }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.name).to.equal("Test Name")
      expect(response.body.email).to.equal("test@email.com")
      expect(response.body.password).to.not.equal("testPassword")
    })
    cy.request({
      method: "DELETE",
      url: deleteEndpoint,
      body: { email: "test@email.com" }
    })
  })

  it("returns 400 when registering an existing user", () => {
    cy.request({
      method: "POST", 
      url: registerEndpoint, 
      failOnStatusCode: false,
      body: { name: "Existing User", email: "existing@user.com", password: "existingUserPassword" }
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal("User email already registered")
    })
  })

  it("returns 400 with invalid name", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: { name: "I", email: "valid@email.com", password: "validPassword" },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('"name" length must be at least 2 characters long')
    })
  })

  it("returns 400 with no name", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: { email: "valid@email.com", password: "validPassword" },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('"name" is required')
    })
  })

  it("returns 400 with invalid email", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: { name: "Valid Name", email: "invalid", password: "validPassword" },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('"email" must be a valid email')
    })
  })

  it("returns 400 with no email", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: { name: "Valid Name", password: "validPassword" },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('"email" is required')
    })
  })

  it("returns 400 with invalid password", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: { name: "Valid Name", email: "valid@email.com", password: "Fail" },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('"password" length must be at least 6 characters long')
    })
  })

  
  it("returns 400 with no password", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
      body: { name: "Valid Name", email: "valid@email.com" },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body).to.equal('"password" is required')
    })
  })

  it("returns 400 when not sending in a body", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)
    })
  })
})

describe("/delete test suite", () => {
    
    it("deletes the user if it exists", () => {
      cy.request({
        method: "POST", 
        url: registerEndpoint, 
        body: { name: "Test Name", email: "test@email.com", password: "testPassword" }
      })
      cy.request({
        method: "DELETE",
        url: deleteEndpoint,
        body: { email: "test@email.com" }
      }).then((response) => {
        expect(response.status).to.equal(200)
      })
    })

    it("returns 400 if the user does not exist", () => {
        cy.request({
          method: "DELETE",
          url: deleteEndpoint,
          failOnStatusCode: false,
          body: { email: "nonExisting@user.com" }
        }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.equal("User was not found in the database")
        })
      })

})
