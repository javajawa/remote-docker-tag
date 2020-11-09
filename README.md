<!--
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
