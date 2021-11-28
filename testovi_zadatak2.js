let assert = chai.assert;

describe('TestoviParser', function() {  
 describe('dajTacnost()', function() {

  //provjera vracanja odgovarajucih vrijednosti tacnosti i gresaka

  it('Tacnost 100%, nema gresaka', function() {
     let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":3,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Prvitest1\",\"fullTitle\":\"Prvitestbezgresaka1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prvitest2\",\"fullTitle\":\"Prvitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prvitest3\",\"fullTitle\":\"Prvitestbezgresaka3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"Prvitest1\",\"fullTitle\":\"Prvitestbezgresaka1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prvitest2\",\"fullTitle\":\"Prvitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prvitest3\",\"fullTitle\":\"Prvitestbezgresaka3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "100%");
     assert.equal(rezultat.greske.length, 0);
  });

  it('Tacnost 0%, 2 greske', function() {
     let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":0,\"pending\":0,\"failures\":2,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Drugitest1\",\"fullTitle\":\"Drugitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Drugitest2\",\"fullTitle\":\"Drugitestgreska2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Drugitest1\",\"fullTitle\":\"Drugitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Drugitest2\",\"fullTitle\":\"Drugitestgreska2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 2);
  });

  it('Tacnost 33.3% (zaokruzivanje na 1 decimalu + prolazi samo 1 test), 2 greske', function() {
    let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":1,\"pending\":0,\"failures\":2,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Test1\",\"fullTitle\":\"Testgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test2\",\"fullTitle\":\"Testgreska2\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test3\",\"fullTitle\":\"Testbezgresaka3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Test1\",\"fullTitle\":\"Testgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Test2\",\"fullTitle\":\"Testgreska2\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Test3\",\"fullTitle\":\"Testbezgresaka3\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "33.3%");
     assert.equal(rezultat.greske.length, 2);
   });

  it('Tacnost 50%, 2 greske', function() {
     let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":4,\"tests\":4,\"passes\":2,\"pending\":0,\"failures\":2,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Trecitest1\",\"fullTitle\":\"Trecitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Trecitest2\",\"fullTitle\":\"Trecitestgreska2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Trecitest3\",\"fullTitle\":\"Trecitestbezgresaka3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Trecitest4\",\"fullTitle\":\"Trecitestbezgresaka4\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Trecitest1\",\"fullTitle\":\"Trecitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Trecitest2\",\"fullTitle\":\"Trecitestgreska2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Trecitest3\",\"fullTitle\":\"Trecitestbezgresaka3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Trecitest4\",\"fullTitle\":\"Trecitestbezgresaka4\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "50%");
     assert.equal(rezultat.greske.length, 2);
  });

  it('Tacnost 66.7% (zaokruzivanje na 1 decimalu), 1 greska', function() {
     let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":2,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Cetvrtitest1\",\"fullTitle\":\"Cetvrtitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Cetvrtitest2\",\"fullTitle\":\"Cetvrtitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Cetvrtitest3\",\"fullTitle\":\"Cetvrtitestbezgresaka3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Cetvrtitest1\",\"fullTitle\":\"Cetvrtitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Cetvrtitest2\",\"fullTitle\":\"Cetvrtitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Cetvrtitest3\",\"fullTitle\":\"Cetvrtitestbezgresaka3\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "66.7%");
     assert.equal(rezultat.greske.length, 1);
  });

  //neisprani formati - provjera da funkcija vraca odgovarajucu poruku

  it('Neispravan format - ne sadrzi trazene podatke', function() {
     let rezultat = TestoviParser.dajTacnost("Prolazi: 3 od 9 testova i niko ne voli da pise testove ali moramo");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 1);
  });

  it('Neispravan format - ne poklapaju se vrijednosti(ima vise passed testova od ukupnog broja testova)', function() {
     let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":4,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Sestitest1\",\"fullTitle\":\"Sestitestbezgresaka1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Sestitest2\",\"fullTitle\":\"Sestitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"Sestitest1\",\"fullTitle\":\"Sestitestbezgresaka1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Sestitest2\",\"fullTitle\":\"Sestitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"SestitestVISAK\",\"fullTitle\":\"SestitestbezgresakaVISAK\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 1);
  });

  it('Neispravan format - ne poklapaju se vrijednosti(ima vise failed testova od ukupnog broja testova)', function() {
    let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":0,\"pending\":0,\"failures\":5,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Sedmitest1\",\"fullTitle\":\"Sedmitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Sedmitest2\",\"fullTitle\":\"Sedmitestgreska2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Sedmitest1\",\"fullTitle\":\"Sedmitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Sedmitest2\",\"fullTitle\":\"Sedmitestgreska2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"SedmitestVISAK\",\"fullTitle\":\"SedmitestgreskaVISAK\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 1);
  });

  it('Neispravan format - ne poklapaju se vrijednosti(broj passed testova i velicina passes array nisu isti)', function() {
    let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":1,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Osmitest1\",\"fullTitle\":\"Osmitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Osmitest2\",\"fullTitle\":\"Osmitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Osmitest1\",\"fullTitle\":\"Osmitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Osmitest2\",\"fullTitle\":\"Osmitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"OsmitestVISAK\",\"fullTitle\":\"OsmitestbezgresakaVISAK\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 1);
  });

  it('Neispravan format - ne poklapaju se vrijednosti(broj failed testova i velicina failures array nisu isti)', function() {
    let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":1,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Devetitest1\",\"fullTitle\":\"Devetitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Devetitest2\",\"fullTitle\":\"Devetitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Devetitest1\",\"fullTitle\":\"Devetitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"DevetitestVISAK\",\"fullTitle\":\"DevetitestgreskaVISAK\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Devetitest2\",\"fullTitle\":\"Devetitestbezgresaka2\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 1);
   });

  it('Neispravan format - ne poklapaju se vrijednosti(broj testova i velicina tests array nisu isti)', function() {
    let rezultat = TestoviParser.dajTacnost("{\"stats\":{\"suites\":3,\"tests\":3,\"passes\":0,\"pending\":0,\"failures\":3,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Desetitest1\",\"fullTitle\":\"Desetitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Desetitest2\",\"fullTitle\":\"Desetitestgreska2\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Desetitest1\",\"fullTitle\":\"Desetitestgreska1\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Desetitest2\",\"fullTitle\":\"Desetitestgreska2\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}");
     assert.equal(rezultat.tacnost, "0%");
     assert.equal(rezultat.greske.length, 1);
   });
  
   
  });
});
