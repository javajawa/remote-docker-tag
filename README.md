<!--
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
SPDX-FileCopyrightText: 2020 Benedict Harcourt

SPDX-License-Identifier: BSD-2-Clause
-->

Helper action to remotely duplicate the tag of a docker image.

```yaml
- name: Tag "stable".
  uses: javajawa/remote-docker-tag@v1
  with:
    registry: ${{ needs.build.outputs.docker_registry }}
    repository: ${{ needs.build.outputs.docker_repo }}
    existing-tag: ${{ needs.build.outputs.docker_tag }}
    new-tag: stable
```

The authorisation value can either by passed by the `auth` input, or it will be
automatically taken from `~/.docker/config.json`.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://blog.harcourtprogramming.co.uk"><img src="https://avatars.githubusercontent.com/u/653482?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Benedict Harcourt</b></sub></a><br /><a href="https://github.com/javajawa/remote-docker-tag/commits?author=javajawa" title="Code">💻</a> <a href="#infra-javajawa" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!