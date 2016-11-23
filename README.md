
# joi-filesize-extensions

Joi extensions for file size.

[![npm version](https://badge.fury.io/js/joi-filesize-extensions.svg)](http://badge.fury.io/js/joi-filesize-extensions)
[![Build Status](https://secure.travis-ci.org/tepez/joi-filesize-extensions.svg?branch=master)](http://travis-ci.org/tepez/joi-filesize-extensions)
<!--

Remove those badges until they work properly on semver.

[![Dependencies Status](https://david-dm.org/hapijs/joi-filesize-extensions.svg)](https://david-dm.org/hapijs/joi-filesize-extensions)
[![DevDependencies Status](https://david-dm.org/hapijs/joi-filesize-extensions/dev-status.svg)](https://david-dm.org/hapijs/joi-filesize-extensions#info=devDependencies)

-->
<!--

Maybe add this in the future

[![NSP Status](https://nodesecurity.io/orgs/hapijs/projects/0394bf83-b5bc-410b-878c-e8cf1b92033e/badge)](https://nodesecurity.io/orgs/hapijs/projects/0394bf83-b5bc-410b-878c-e8cf1b92033e)

-->
[![Known Vulnerabilities](https://snyk.io/test/npm/joi-filesize-extensions/badge.svg)](https://snyk.io/test/npm/joi-filesize-extensions)

Lead Maintainer: [Tom Yam](https://github.com/tepez)

File sizes are parsed with [patrickkettner/filesize-parser](https://github.com/patrickkettner/filesize-parser).
All issues regarding parsing should be opened there.

# Usage

Usage is a two steps process. First, a schema is constructed using the provided types and constraints:

```js
const BaseJoi = require('joi');
const Extension = require('joi-filesize-extensions');
const Joi = BaseJoi.extend(Extension);

// By default all units (KB and KiB) are base 10
Joi.validate('1 KB', Joi.number().filesize()).value   // 1000
Joi.validate('1 KiB', Joi.number().filesize()).value   // 1000

// Units can also be base 2
Joi.validate('1 KB', Joi.number().filesize({ base: 2 })).value    // 1024
Joi.validate('1 KiB', Joi.number().filesize({ base: 2 })).value    // 1024

// Or size 10 explicitly
Joi.validate('1 KB', Joi.number().filesize({ base: 10 })).value   // 1000
Joi.validate('1 KiB', Joi.number().filesize({ base: 10 })).value   // 1000

// If value cannot be parsed it's an error
Joi.validate('1 XX', Joi.number().filesize({ base: 10 })).error.message   // "value" must be a valid file size'
```

# API
See the [API Reference](https://github.com/tepez/joi-filesize-extensions/blob/v1.0.3/API.md).

Based on [hapijs/joi-date-extensions](https://github.com/hapijs/joi-date-extensions)