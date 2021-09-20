const tests = require('../../fixtures/testdata.json')

describe('API Testing-OpenWeather', () => {
    tests.forEach(test => {
        it(test.testid + test.test_name, () => {
            cy.request({
                method: 'GET',             
                url: Cypress.env('base_url') + '/weather?q=' + test.q + Cypress.env('app_id_key'),
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(test.status_code)                
            });
        });
    });
});

