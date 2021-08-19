const registerEndpoint = "http://localhost:3000/api/user/register"
const deleteEndpoint = "http://localhost:3000/api/user/delete"

describe("Delete test suite", () => {
    
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
          expect(response.body).to.equal("User not found")
        })
      })

})
