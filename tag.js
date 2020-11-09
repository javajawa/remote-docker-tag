// SPDX-FileCopyrightText: 2020 Benedict Harcourt
//
// SPDX-License-Identifier: BSD-2-Clause

const core     = require("@actions/core");
const requests = require("r2");

const mime = "application/vnd.docker.distribution.manifest.v2+json";

// Based on https://dille.name/blog/2018/09/20/how-to-tag-docker-images-without-pulling-them/
async function main() {
    const registry   = core.getInput("registry");
    const auth       = core.getInput("auth");
    const repository = core.getInput("repository");
    const old_tag    = core.getInput("existing-tag");
    const new_tag    = core.getInput("new-tag");

    const check_url = `https://${registry}/v2/${repository}/manfiests/${old_tag}`;

    core.debug("Checking for manifest at " + check_url);

    const manifest = await requests.get(
        {
            check_url,
            headers: {
                "Accept": mime,
                "Authorization": auth
            }
        }
    );

    core.debug(await manifest.response);

    const tag_url = `https://${registry}/v2/${repository}/manfiests/${new_tag}`;

    core.debug("Checking for manifest at " + tag_url);

    const result = await requests.put(
        tag_url,
        {
            json: manifest.json,
            headers: {
                "Accept": mime,
                "Authorization": auth
            },
        }
    );

    core.debug(await result.response);
}

main().catch(error => core.setFailed(error.message));

// vim: nospell ts=4 expandtab
