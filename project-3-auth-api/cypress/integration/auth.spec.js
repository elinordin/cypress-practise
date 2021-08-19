describe("/register test suite", () => {
  const registerEndpoint = "http://localhost:3000/api/user/register"

  it("creates user with valid body", () => {
    const body = {
      name: "Name",
      email: "name@email.com",
      password: "password",
    }
    cy.request("POST", registerEndpoint, body).then(
      (response) => {
        expect(response.status).to.equal(200)
        expect(response.body.name).to.equal(body.name)
        expect(response.body.email).to.equal(body.email)
        expect(response.body.password).to.equal(body.password)
      }
    );
  });

  it("returns 400 when not sending in a body", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)
    });
  });
});
