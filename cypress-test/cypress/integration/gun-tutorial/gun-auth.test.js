/// <reference types="cypress" />
const user = {
  username: `Dummy${Math.random(9999 * 3)}`,
  pwd: "password123",
};

describe("Auth", () => {
  before(() => {
    cy.visit("http://127.0.0.1:8080");
  });

  it("Has't message form", () => {
    cy.get("#messageForm").should("not.be.visible");
  });

  it("Has auth form", () => {
    cy.get("#signForm").should("exist");
  });

  it("SignUp", () => {
    cy.get(authFormData.auth.username).type(user.username);
    cy.get(authFormData.auth.pwd).type(user.pwd);

    cy.get(authFormData.auth.signUp).click();
    cy.get("#messageForm").should("be.visible");
    cy.get("#signForm").should("not.be.visible");
  });

  it("SignIn", () => {
    cy.reload();
    cy.get(authFormData.auth.username).type(user.username);
    cy.get(authFormData.auth.pwd).type(user.pwd);

    cy.get(authFormData.auth.signIn).click();
    cy.get("#messageForm").should("be.visible");
    cy.get("#signForm").should("not.be.visible");
  });
});

const authFormData = {
  auth: {
    username: "[data-testid=username]",
    pwd: "[data-testid=pwd]",
    signIn: "[data-testid=signin]",
    signUp: "[data-testid=signup]",
  },
};
