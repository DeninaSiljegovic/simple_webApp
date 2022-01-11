chai.should()
var expect = chai.expect
var example = null;
describe('VjezbeAjax', function(){
    beforeEach(function(){
        this.ajax = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.ajax.onCreate = function(ajax){
            this.requests.push(ajax)
        }.bind(this)
    })

    afterEach(function() { 
        this.ajax.restore()
    })


    //dodajInputPolja testovi

    it('TEST 1 - broj vjezbi je 2, treba dodati 2 input polja sa default vrijednostima 4',function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,2)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(2)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(2)
        let arr = div.firstChild.querySelectorAll("input")

        for(let i = 0; i < arr.length; i++){
            parseInt(arr[i].value).should.deep.equal(4)
            expect(arr[i].type).to.equal('number')
        }
        done()
    })


    it('TEST 2 - broj vjezbi je 14, treba dodati 14 input polja sa default vrijednostima 4',function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,14)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(14)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(14)
        let arr = div.firstChild.querySelectorAll("input")

        for(let i = 0; i < arr.length; i++){
            parseInt(arr[i].value).should.deep.equal(4)
            expect(arr[i].type).to.equal('number')
        }
        done()
    })


    it('TEST 3 - broj vjezbi veci od 16 - ne treba dodati polja ', function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,18)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(0)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(0)

        done()
    })

    it('TEST 4 - broj vjezbi je manji od 0 - ne treba dodati polja ', function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,-5)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(0)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(0)
        done()
    })


    // posaljiPodatke

    it('TEST 5 - POST zahtjev', function(){
        var data = {brojVjezbi: 6, brojZadataka:[6,5,4,3,2,1]}
        var dataJSON = JSON.stringify(data)
        VjezbeAjax.posaljiPodatke(data, function(err,result) { 
        });
        this.requests[0].requestBody.should.equal(data)
    })

    it('TEST 6 - POST zahtjev, neispravan brojVjezbi (<1)', function(){
        var data = {brojVjezbi: -3, brojZadataka:[]}
        var dataJSON = JSON.stringify(data)
        VjezbeAjax.posaljiPodatke(data, function(err,result) { 

        });
        this.requests[0].requestBody.should.equal(data)
    })

    it('TEST 7 - neispravan brojVjezbi (>15)', function() {
        var data = { brojVjezbi: 17, brojZadataka: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] };
        var povrat = { status: "error",data:"Pogrešan parametar brojVjezbi"}
        var dataJson = JSON.stringify(povrat);
   
        VjezbeAjax.posaljiPodatke(data, function() { });
   
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });


    it('TEST 8 - neispravan brojZadataka (<0)', function() {
        var data = { brojVjezbi: 5, brojZadataka: [1,2,3,-4,5] };
        var povrat = { status: "error",data:"Pogrešan parametar z4"}
        var dataJson = JSON.stringify(povrat);
   
        VjezbeAjax.posaljiPodatke(data, function() { });
   
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });

    it('TEST 9 - neispravan brojZadataka (>10)', function() {
        var data = { brojVjezbi: 5, brojZadataka: [1,2,3,4,15] };
        var povrat = { status: "error",data:"Pogrešan parametar z5"}
        var dataJson = JSON.stringify(povrat);
   
        VjezbeAjax.posaljiPodatke(data, function() { });
   
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });


    it('TEST 10 - neispravni parametri: brojVjezbi, brojZadataka', function() {
        var data = { brojVjezbi: -3, brojZadataka: [1,2,3,-4,15] };
        var povrat = { status: "error",data:"Pogrešan parametar brojVjezbi,z4,z5"}
        var dataJson = JSON.stringify(povrat);
   
        VjezbeAjax.posaljiPodatke(data, function() { });
   
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });


    // dohvatiPodatke

     it('TEST 11 - GET zahtjev', function(done){
        var data = new Object()
        data.brojVjezbi = 3
        data.brojZadataka = [2,4,5]
        var dataJSON = JSON.stringify(data)

        VjezbeAjax.dohvatiPodatke(function(err,result){ 
            result.should.deep.equal(dataJSON)
            expect(err).to.be.null
            done()
        })

        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJSON);
    })


    it('TEST 12 - GET zahtjev, neispravan brojVjezbi',function(done){
        var obj = new Object()
        obj.status = "err"
        obj.data = "Pogrešan parametar brojVjezbi"
        var objJSON = JSON.stringify(obj)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            expect(result).to.be.null
            done()
        })
        this.requests[0].respond(400, { 'Content-Type': 'text/json' }, objJSON);
    })


    it('TEST 13 - GET zahtjev, neispravan brojZadataka',function(done){
        var obj = new Object()
        obj.status = "err"
        obj.data = "Pogrešan parametar z2,z5"
        var objJSON = JSON.stringify(obj)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            expect(result).to.be.null
            done()
        })
        this.requests[0].respond(400, { 'Content-Type': 'text/json' }, obj.data);
    })


    it('TEST 14 - GET zahtjev, neispravni podaci: brojVjezbi, brojZadataka', function(done){
        var obj = new Object()
        obj.status = "err"
        obj.data = "Pogrešan parametar brojVjezbi,z5"
        var objJSON = JSON.stringify(obj)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            expect(result).to.be.null
            done()
        })
        this.requests[0].respond(400, { 'Content-Type': 'text/json' }, objJSON);
    })


    // iscrtajVjezbe

    it('TEST 15 - iscrtajVjezbe, sve OK',function(done){
        var div = document.createElement("odabirVjezbeId")
        VjezbeAjax.iscrtajVjezbe(div, JSON.stringify({brojVjezbi:5,brojZadataka:[5,4,3,2,1]}))
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("button").should.have.lengthOf(5) 
        done()
    })


    it('TEST 16 -neispravan brojVjezbi (<0)', function(done){
        var div = document.createElement("odabirVjezbe")
        VjezbeAjax.iscrtajVjezbe(div,JSON.stringify({brojVjezbi:-3,brojZadataka:[]}))
        div.querySelectorAll("button").should.have.lengthOf(0)
        div.querySelectorAll("div").should.have.lengthOf(0)
        done()
    })


     it('TEST 17 -neispravan brojVjezbi (>15)', function(done){
        var div = document.createElement("odabirVjezbe")
        VjezbeAjax.iscrtajVjezbe(div,JSON.stringify({brojVjezbi:17,brojZadataka:[]}))
        div.querySelectorAll("button").should.have.lengthOf(0)
        div.querySelectorAll("div").should.have.lengthOf(0)
        done()
    })


    // iscrtajZadatke
     it('TEST 18 - odabrane su sve vjezbe',function(done){
        var div = document.createElement("odabirVjezbe")
        var v1 = document.createElement("div")
        v1.id = "v1"
        var v2 = document.createElement("div")
        v2.id = "v2"
        var v3 = document.createElement("div")
        v3.id = "v3"

        VjezbeAjax.iscrtajZadatke(v1, 4)
        VjezbeAjax.iscrtajZadatke(v2, 3)
        VjezbeAjax.iscrtajZadatke(v3, 2)

        v1.querySelectorAll("button").should.have.lengthOf(4)
        v2.querySelectorAll("button").should.have.lengthOf(3)
        v3.querySelectorAll("button").should.have.lengthOf(2)
        var arr = div.querySelectorAll("button")

        for(let i = 0; i < arr; i++){
            expect(arr[i].id).to.equal("zadatak" + (i+1).toString())
            expect(arr[i].innerHTML).to.equal("Zadatak " + (i+1).toString())
        }

        v1.style.display = 'none'
        v2.style.display = 'none'
        v3.style.display = 'none'

        // Ne treba dodavati nove zadatke 

        VjezbeAjax.iscrtajZadatke(v1, 4)
        VjezbeAjax.iscrtajZadatke(v2, 3)
        VjezbeAjax.iscrtajZadatke(v3, 2)


        v1.querySelectorAll("button").should.have.lengthOf(4)
        v2.querySelectorAll("button").should.have.lengthOf(3)
        v3.querySelectorAll("button").should.have.lengthOf(2)
        done()
    })



});