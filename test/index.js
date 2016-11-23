'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Helper = require('./helper');
const BaseJoi = require('joi');
const Extension = require('../');
const Joi = BaseJoi.extend(Extension);


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('number', () => {

    describe('filesize()', () => {

        it('still validates a number', (done) => {

            Helper.validate(Joi.number().filesize(), [
                [0, true, null, 0],
                [10, true, null, 10],
                [10.5, true, null, 10.5]
            ], done);

        });

        it('validates an falsey value', (done) => {

            const schema = Joi.number().filesize();
            schema.validate(undefined, (err, value) => {

                expect(err).to.not.exist();
                done();
            });

        });

        it('valid file size', (done) => {

            Helper.validate(Joi.number().filesize(), [
                [0, true, null, 0],
                [10, true, null, 10],
                [10.5, true, null, 10.5]
            ], done);

        });

        it('invalid file size', (done) => {

            Helper.validate(Joi.number().filesize(), [
                ['GB', false, null, '"value" must be a valid file size'],
                ['GB 10', false, null, '"value" must be a valid file size'],
                ['10 XX', false, null, '"value" must be a valid file size']
            ], done);
        });

        it('converts with base 10 by default', (done) => {

            Helper.validate(Joi.number().filesize(), [
                ['1kb', true, null, 1000],
                ['1mb', true, null, 1000000],
                ['1gb', true, null, 1000000000]
            ], done);
        });

        it('converts with base 2', (done) => {

            Helper.validate(Joi.number().filesize({ base: 2 }), [
                ['1kb', true, null, 1024],
                ['1mb', true, null, 1048576],
                ['1gb', true, null, 1073741824]
            ], done);
        });

        it('converts with base 10', (done) => {

            Helper.validate(Joi.number().filesize({ base: 10 }), [
                ['1kb', true, null, 1000],
                ['1mb', true, null, 1000000],
                ['1gb', true, null, 1000000000]
            ], done);
        });

        it('fails with bad base', (done) => {

            expect(() => {

                Joi.number().filesize({ base: 5 });
            }).to.throw(/"base" must be one of \[2, 10]/);

            done();
        });

        it('fails without convert', (done) => {

            const schema = Joi.number().filesize();
            schema.validate('foo', { convert: false }, (err) => {

                expect(err).to.be.an.error('"value" must be a number');
                done();
            });
        });

        it('should be correctly described', (done) => {

            const schema = Joi.number().filesize();
            expect(schema.describe()).to.equal({
                type: 'number',
                flags: {
                    filesizeBase: 10
                },
                invalids: [
                    Infinity,
                    -Infinity
                ],
                rules: [
                    {
                        name: 'min',
                        arg: 0
                    },
                    {
                        name: 'filesize',
                        arg: {
                            parserParams: undefined
                        },
                        description: 'Should be a valid file size'
                    }
                ]
            });
            done();
        });

        it('should be correctly described when given a base', (done) => {

            const schema = Joi.number().filesize({ base: 2 });
            expect(schema.describe()).to.equal({
                type: 'number',
                flags: {
                    filesizeBase: 2
                },
                invalids: [
                    Infinity,
                    -Infinity
                ],
                rules: [
                    {
                        name: 'min',
                        arg: 0
                    },
                    {
                        name: 'filesize',
                        arg: {
                            parserParams: {
                                base: 2
                            }
                        },
                        description: 'Should be a valid file size'
                    }
                ]
            });
            done();
        });
    });
});
