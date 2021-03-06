'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- DELETE - stub backend project', () => {
  describe('without Authentication', () => {
    context('when the url doesnt contain any id', ()=>{
      it('returns a valid reponse', (done) => {
        request(app)
            .delete('/story/nathan')
            .set('Accept', 'application/json')
            .send({ 'name': 'Nathan' })
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal({
                'custom': 'response'
              });
              done();
            });
      });
    });

    context('when the url contain an id and param', ()=>{
      it('returns a valid reponse', (done) => {
        request(app)
            .delete('/customers/1234/session?scenario=aaa')
            .set('Accept', 'application/json')
            .send({ 'custom': 'any data' })
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal({
                'response': 'any'
              });
              done();
            });
      });

      it('returns a not found response when param does not exist', (done) => {
        request(app)
            .delete('/customers/1234/session?scenario=aa')
            .set('Accept', 'application/json')
            .send({ 'custom': 'any data' })
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(404);
              expect(res.body).to.deep.equal({
                errorCode: 404,
                message: 'Scenario not found in the resources! :('
              });
              done();
            });
      });
    });

    context('when the _body of "_res" is empty', ()=>{
      it('should return empty', (done)=>{
        request(app)
            .delete('/res/body/empty')
            .set('Accept', 'application/json')
            .send({ 'custom': 'any data' })
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.empty;
              done();
            });
      });
    });
  });
});
