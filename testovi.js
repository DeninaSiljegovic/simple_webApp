var chai = require('chai')
chai.use(require('chai-http'))
const db = require('./modules/database.js')
var app = require('./index.js')
var expect = chai.expect;
describe('/student', function(){
    it('ovaj test treba padati (jer samo tako ova dva ispod rade ispravno) - Novi student', (done) => {
        chai.request('http://localhost:3000').post('/student').send({ime: 'Nina', prezime: 'Siljegovic', index: '18600', grupa: 'RMA18'}).then(function(res){
            expect(JSON.parse(res.text).status).to.equal("Kreiran student!") 
            done()         
        }).catch(err => done(err))
    })

    it('Kreiran student', (done) => {
        chai.request('http://localhost:3000').post('/student').send({ime: 'Denina', prezime: 'Siljegovic', index: '18625', grupa: 'RMA18'}).then(function(res){
            expect(JSON.parse(res.text).status).to.equal('Kreiran student!')
            done()
        }).catch(err => done(err))
    })

     it('Ponavljanje vec unesenog studenta', (done) => {
        chai.request('http://localhost:3000').post('/student').send({ime: 'Denina', prezime: 'Siljegovic', index: '18625', grupa: 'RMA18'}).then(function(res){
            expect(JSON.parse(res.text).status).to.equal('Student sa indeksom 18625 već postoji!')
            done()
        }).catch(err => done(err))
    })
})



describe('/student/:index', () => {
    it('Izmjena grupe studentu (grupa se mora kreirati)',  (done) => {
        chai.request('http://localhost:3000').put('/student/18625').send({grupa: 'DM17'}).then(function(res){
            expect(JSON.parse(res.text).status).to.equal("Promjenjena grupa studentu 18625")
            db.student.findOne({where: {index: '18625'}}).then(function(s){
                expect(s.grupa).to.not.equal('RMA18')
                expect(s.grupa).to.equal('DM17')
                done()
            }).catch(err => done(err))
        }).catch(err => done(err))
    })

    it('Student ne postoji', (done) => {
        chai.request('http://localhost:3000').put('/student/bb').send({grupa: 'DM17'}).then(function(res){
            expect(JSON.parse(res.text).status).to.equal("Student sa indexom bb ne postoji")
            done()
        }).catch(err => done(err))
    })

    after(function(){
        db.sequelize.sync({force:true})
    })
})





describe('/batch/student', function(){
    it('Dodavanje 1 studenta', function(done) {
        chai.request('http://localhost:3000').post('/batch/student').send([{ime: 'Iris', prezime: 'Ski', index: '213', grupa: 'DM17'}]).then(function(res){
            expect(JSON.parse(res.text).status).to.equal("Dodano 1 studenata!")
            done()
        }).catch(err => done(err))
    })

    // it('Jedan novi i jedan vec upisani student', function(done) {
    //     chai.request('http://localhost:3000').post('/batch/student').send([{ime: 'Iris', prezime: 'Ski', index: '213', grupa: 'DM17'}, {ime: 'Kuku', prezime: 'Lele', index: '345', grupa: 'Mu43'}]).then(function(res){
    //         expect(JSON.parse(res.text).status).to.equal("Dodano 2 studenata!")
    //         done()
    //     }).catch(err => done(err))
    // })  DUGO TRAJE

    after(function(){
        db.sequelize.sync({force:true})
    })
})
