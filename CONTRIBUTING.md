# Contributing to VueDataTable

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to Vue Data Table. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table Of Contents

[Code of Conduct](#code-of-conduct)

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Pull Requests](#pull-requests)

[Styleguides](#styleguides)

- [Git Commit Messages](#git-commit-messages)
- [JavaScript Styleguide](#javascript-styleguide)
- [Vue Styleguide](#vue-styleguide)

[Additional Notes](#additional-notes)

- [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the [author's email](mailto:andresouzaabreu.dev@gmail.com).

## How to Contribute

### Reporting Bugs

This section guides you through submitting a bug report for VueDataTable. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-to-submit-a-good-bug-report). Fill out [the required template](ISSUE_TEMPLATE_BUG_REPORT.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

**Try debugging.** You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem in the latest version of DataTable, and and if you can get the desired behavior by changing the options that you pass to DataTable.

**Perform a [cursory search](https://github.com/search/advanced)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How To Submit A (Good) Bug Report

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). When you are creating an issue, please provide the following information:

- Description
- Steps to Reproduce
- Expected behavior
- Actual behavior
- Reproduces how often
- Versions
- Additional Information

Explain the problem and include additional details to help maintainers reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible. When listing steps, **don't just say what you did, but explain how you did it**.
- **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable blocks of code, which you use in those examples.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

Provide more context by answering these questions:

- If the problem started happening recently, **can you reproduce the problem in an older version of DataTable?** What's the most recent version in which the problem doesn't happen? You can download older versions of DataTable from [the releases page](https://github.com/AndreSouzaAbreu/vue-data-table/releases).
- **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

- **Which version of DataTable are you using?**
- **Which npm packages do you have installed?**

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for VueDataTable, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-to-submit-a-good-enhancement-suggestion). Fill in [the template](ISSUE_TEMPLATE_FEATURE_REQUEST.md), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

- **Check the [documentation](README.md)** — you might discover that the enhancement is already available. Most importantly, check if you're using the latest version of VueDataTable and if you can get the desired behavior by changing VueDataTable's config settings.
- **Perform a [cursory search](https://github.com/search/advanced)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How To Submit A (Good) Enhancement Suggestion

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). When creating an issue, please provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of VueDataTable which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
- **Explain why this enhancement would be useful** to most users.
- **Specify which version of VueDataTable you're using.**

### Your First Code Contribution

Unsure where to begin contributing to VueDataTable? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
- [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

### Pull Requests

The process described here has several goals:

- Maintain VueDataTable's quality
- Fix problems that are important to users
- Enable a sustainable system for DataTable's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow the instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or fewer
- Reference issues and pull requests liberally after the first line
- When only changing documentation, include `[doc]` in the commit title
- Consider starting the commit message with an applicable emoji:
  - :art: `:art:` when improving the format/structure of the code
  - :racehorse: `:racehorse:` when improving performance
  - :memo: `:memo:` when writing docs
  - :bug: `:bug:` when fixing a bug
  - :fire: `:fire:` when removing code or files
  - :white_check_mark: `:white_check_mark:` when adding tests
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies
  - :shirt: `:shirt:` when removing linter warnings

### JavaScript Styleguide

In general, most of the JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/). However, there are some exceptions:

- Use `tabs` instead of `spaces` for indentation
- Use 4 for `Tab Size`
- Use double quotes for strings except to avoid escaping.

    ```javascript

        console.log("hello there")    // ok
        console.log('hello there')    // avoid
        console.log(`hello there`)    // avoid

        $("<div class='box'>")        // ok
        console.log(`hello ${name}`)  // ok
    ```

- Inline `export`s with expressions whenever possible

    ```javascript
    // Use this:
    export default class ClassName {}

    // Instead of:
    class ClassName {}
    export default ClassName;
    ```

- For var declarations, write all code in oneline

   ```javascript
    // avoid
    var silent = true
    var verbose = true

    // ok
    var silent = true, verbose = true

    // ok
    var silent = true,
        verbose = true
    ```

### Vue Styleguide

All `.vue` files must follow [Vue's official styleguide](https://vuejs.org/v2/style-guide/). In addition to that, please adhere to the following guidelines:

- The `template` (`.vue`), `script` (`.js`), and `style` (`.scss|.css`) must be in different files under the same directory.
- The style can be placed together with the `template` file, but only if it (the style) has 10 lines or fewer.
- The file name must be the same as the component's name (e.g, DataTableFilter => DataTableFilter.vue, DataTableFilter.js, and DataTableFilter.scss)
- Use Pascal case for a component's name in the script, and kebab case for the component's html tag in the `template`.

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

[GitHub search](https://help.github.com/articles/searching-issues/) makes it easy to use labels for finding groups of issues or pull requests you're interested in. For example, you might be interested in open issues across VueDataTable packages which are labeled as bugs, but still need to be reliably reproduced, or perhaps open pull requests which haven't been reviewed yet.

To help you find issues and pull requests, each label is listed with search links for finding open items with that label. We encourage you to read about [other search filters](https://help.github.com/articles/searching-issues/) which will help you write more focused queries.

The labels are loosely grouped by their purpose, but it's not required that every issue have a label from every group or that an issue can't have more than one label from the same group.

Please open an issue on `AndreSouzaAbreu/vue-data-table` if you have suggestions for new labels.

#### Type of Issue and Issue State

| Label name | Description |
| -----------| --------------------- |
| `enhancement` | Feature requests. |
| `bug` | Confirmed bugs or reports that are very likely to be bugs. |
| `question` | Questions more than bug reports or feature requests (e.g. how do I do X). |
| `feedback` | General feedback more than bug reports or feature requests. |
| `help-wanted` | DataTable's team would appreciate help from the community in resolving these issues. |
| `beginner` | Less complex issues which would be good first issues to work on for users who want to contribute to DataTable. |
| `more-information-needed` | More information needs to be collected about these problems or feature requests (e.g. steps to reproduce). |
| `needs-reproduction` | Likely bugs, but haven't been reliably reproduced. |
| `blocked` | Issues blocked on other issues. |
| `duplicate` | Issues which are duplicates of other issues, i.e. they have been reported before. |
| `invalid` | Issues which aren't valid (e.g. user errors). |

## Attributions

This Contributing is adapted from the [Atom's Contributing file](https://github.com/atom/atom/blob/master/CONTRIBUTING.md).
