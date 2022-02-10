const chai=require('chai');
const  assert=chai.assert;
const should=chai.should();
const expect=chai.expect;

var server=require('../index');

const chaiHttp=require('chai-http');

chai.use(chaiHttp);

describe('test',function(){
    it('translate  to hindi',function(done){
        
            chai.request(server)
        .post('/')
        .type('form')
        .send({
            'content': 'how are you',
            'to': 'hindi'
        }).end((err,res)=>{
                expect(res.status).to.be.equal(200);
                console.log(res.text);
                done();
        })
        
    }
    
    ).timeout(5000);
    
})


