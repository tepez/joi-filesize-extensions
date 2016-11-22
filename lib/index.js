'use strict';

// Load modules

const Joi = require('joi');
const FilesizeParser = require('filesize-parser');

module.exports = {

    name: 'number',

    base: Joi.number().min(0),

    language: {
        fileSize: 'must be a valid file size'
    },

    coerce(value, state, options) {

        if (typeof value === 'number') {
            return value;
        }

        if (options.convert) {
            try {
                return FilesizeParser(FilesizeParser(value, {
                    base: this._flags.filesizeBase
                }));
            }
            catch (ignore) {
                return this.createError('number.fileSize', { value }, state, options);
            }
        }

        return value;
    },

    rules: [
        {
            name: 'filesize',
            description: 'Should be a valid file size',
            params: {
                parserParams: Joi.object().keys({
                    base: Joi.only(2, 10)
                })
            },
            setup(params) {

                const parserParams = params.parserParams || {};

                this._flags.filesizeBase = parserParams.base || 10;
            },
            validate(params, value, state, options) {

                // No-op just to enable description
                return value;
            }
        }
    ]

};
