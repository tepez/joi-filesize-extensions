<!-- version -->
# 1.0.1 API Reference
<!-- versionstop -->

<!-- toc -->

- [Rules](#rules)
  - [`number.filesize(options)`](#numberfilesizeoptions)

<!-- tocstop -->

# Rules

## `number.filesize(options)`

The following options are allowed:
- `base` - The [base](https://en.wikipedia.org/wiki/Gigabyte#Definition) for unit sizes either 10 (decimal) or 2 (binary). Defaults to 10.

```js
const schema = Joi.number().filesize();
```
