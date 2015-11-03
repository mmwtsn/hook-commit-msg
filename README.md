# hook-commit-msg

[![wercker status](https://app.wercker.com/status/7175563270c6d6a2307fbe02f40a0be1/s/master "wercker status")](https://app.wercker.com/project/bykey/7175563270c6d6a2307fbe02f40a0be1)

A [Hook Script Runner](https://github.com/mmwtsn/hook-script-runner) script for checking commit messages.

### Quick start

Install the [Hook Script Runner](https://github.com/mmwtsn/hook-script-runner) and this module within an existing project that has been Git initialized:

```
$ npm install --save-dev hook-script-runner hook-commit-msg
```

Update your project's package.json to call the linter on commit:

```
"hooks": {
  "commit-msg": "hook-commit-msg"
},
```

This will check your current commit message against the default style.

### Formats

Currently only one commit format is supported. It's loosely based off community
best practices (e.g. jQuery's [commit guidelines](https://contribute.jquery.org/commits-and-pull-requests/#commit-guidelines)).

#### Default

- Subject should be less than or equal to 50 characters
- Subject should not end in a period
- Subject should be followed by two newlines
- Description should be less than or equal to 72 characters

## License

MIT
