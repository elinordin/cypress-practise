describe("/register test suite", () => {
  it("returns 200 when sending in a body", () => {
    const body = {
      name: "Name",
      email: "name@email.com",
      password: "password",
    };
    cy.request("POST", "http://localhost:3000/api/user/register", body).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  });

  it("returns 400 when not sending in a body", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/user/register",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });
});
