# Pull Request Template

Here are some guidelines you may use when making pull request. **Note** that you don't need to follow every guideline presented here, and some of them are not applicable depending on the situation. For example, there is no *Possible Drawbacks* when improving the documentation in a pull request. Nonetheless, the pull request must at least have a **description of the change** and a **release note**.

## Description of the Change

We must be able to understand the design of your change from this description. If we can't get a good idea of what the code will be doing from the description here, the pull request may be closed at the maintainers' discretion. Keep in mind that the maintainer reviewing this pull request may not be familiar with or have worked with the code here recently, so please walk us through the concepts.

## Possible Drawbacks

What are the possible side-effects or negative impacts of the code change?

## Verification Process

What process did you follow to verify that the change has not introduced any regressions? Describe the actions you performed and describe the results you observed.

## Applicable Issues

Enter any applicable Issues here

## Release Notes

Please describe the changes in a single line that explains this improvement in terms that a user can understand.  This text will be used in DataTable's release notes.

If this change is not user-facing or notable enough to be included in release notes you may use the strings "Not applicable" or "N/A" here.

Examples:

- The GitHub package now allows you to add co-authors to commits.
- Fixed an issue where multiple cursors did not work in a file with a single line.
- Increased the performance of searching and replacing across a whole project.

## Attribution

This template is adapted from the [Atom's Feature Request template](https://github.com/atom/atom/blob/master/PULL_REQUEST_TEMPLATE.md).
