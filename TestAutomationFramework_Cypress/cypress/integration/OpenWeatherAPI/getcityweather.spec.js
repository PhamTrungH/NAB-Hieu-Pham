describe('API Testing-OpenWeather', () => {

    //Cypress.config('baseUrl', 'https://api.openweathermap.org/data/2.5')
    //let OpenWeartherAppKey = '&appid=2ace8e8a776a7ae0a0428de14a963061'

    it('OpenWeatherAPI_03: OpenWeather: Search City Weather API - Validate response fields return corrrect data for existed city', () => {        
        cy.request({
            method: 'GET', 
            //url: Cypress.env('base_url') + '/weather?q=ho chi minh' + Cypress.env('app_id_key')
            url: Cypress.env('base_url') + '/weather?q=ho chi minh' + Cypress.env('app_id_key')
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.sys.country).to.eq('VN')    
            expect(res.body.name).to.eq('Ho Chi Minh City')
        })    
    })

    it('OpenWeatherAPI_04: OpenWeather: Search City Weather API - Validate response fields with inexistent city', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=ho chi minh1' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404)                        
            expect(res.body.message).to.eq('city not found')
        })    
    })

    it('OpenWeatherAPI_05: OpenWeather: Search City Weather API - Validate response fields with invalid city (contain special characters)', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=%23%!@%23$%23%%^%%23$^' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404)                        
            expect(res.body.message).to.eq('city not found')
        })    
    })

    it('OpenWeatherAPI_06: OpenWeather: Search City Weather API - Validate response fields with empty city value', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(400)                        
            expect(res.body.message).to.eq('Nothing to geocode')
        })    
    })

    it('OpenWeatherAPI_07: OpenWeather: Search City Weather API - Validate response fields with long city value (150 character)', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=abcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwertabcdefghopqwert' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404)                        
            expect(res.body.message).to.eq('city not found')
        })    
    })

    it('OpenWeatherAPI_08: OpenWeather: Search City Weather API - Validate response fields with valid city name, state code', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=ho chi minh,70000' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(200)                        
            expect(res.body.coord.lon).to.eq(106.6667)
            expect(res.body.coord.lat).to.eq(10.75)            
            expect(res.body.sys.country).to.eq('VN')    
            expect(res.body.name).to.eq('Ho Chi Minh City')
        })    
    })

    it('OpenWeatherAPI_09: OpenWeather: Search City Weather API - Validate response fields with valid postal code', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=70123' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(200)                                    
            expect(res.body.sys.country).to.eq('IT')    
            expect(res.body.name).to.eq('Bari')
        })    
    })

    it('OpenWeatherAPI_10: OpenWeather: Search City Weather API - Validate response fields with smallest postal code (0)', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=0' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404)                                                
            expect(res.body.message).to.eq('city not found')
        })    
    })

    it('OpenWeatherAPI_11: OpenWeather: Search City Weather API - Validate response fields with big postal code (0)', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=9876543210' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404)                                                
            expect(res.body.message).to.eq('city not found')
        })    
    })

    it('OpenWeatherAPI_12: OpenWeather: Search City Weather API - Validate response fields with inexistent appid', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=ho chi minh&appid=2ace8e8a776a7ae0a0428de14a96306' , 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401)                                                
            expect(res.body.message).to.eq('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.')
        })    
    })

    it('OpenWeatherAPI_13: OpenWeather: Search City Weather API - Validate response fields with empty appid value', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=ho chi minh&appid=' , 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401)                                                
            expect(res.body.message).to.eq('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.')
        })    
    })

    it('OpenWeatherAPI_14: OpenWeather: Search City Weather API - Validate response fields with invalid appid value', () => {        
        cy.request({
            method: 'GET', 
            url: Cypress.env('base_url') + '/weather?q=ho chi minh&appid=#@%#%^N$&%^&^B' , 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401)                                                
            expect(res.body.message).to.eq('Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.')
        })    
    })

    it('OpenWeatherAPI_15: OpenWeather: Search City Weather API - Validate response fields return corrrect data with incorrect end point    ', () => {        
        cy.request({
            method: 'GET', 
            url: 'https://api.openweathermap.org/data/2./weather?q=ho%20chi%20minh' + Cypress.env('app_id_key'), 
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404)                                                
            expect(res.body.message).to.eq('Internal error')
        })    
    })

})

