// SPDX-FileCopyrightText: 2020 Benedict Harcourt
//
// SPDX-License-Identifier: BSD-2-Clause

const core     = require("@actions/core");
const requests = require("r2");
const fs       = require("fs");

const mime = "application/vnd.docker.distribution.manifest.v2+json";

// Based on https://dille.name/blog/2018/09/20/how-to-tag-docker-images-without-pulling-them/
async function main() {
    const registry   = core.getInput("registry");
    const repository = core.getInput("repository");
    const oldTag     = core.getInput("existing-tag");
    const newTag     = core.getInput("new-tag");

    const auth = getAuth(registry);

    core.debug("Registry:   " + registry);
    core.debug("Repositroy: " + repository);
    core.debug("Old Tag:    " + oldTag);
    core.debug("New Tag:    " + newTag);

    const checkUrl = `https://${registry}/v2/${repository}/manifests/${oldTag}`;

    core.debug("Checking for manifest at " + checkUrl);

    const manifest = await requests.get(
        checkUrl,
        {
            headers: {
                "Accept": mime,
                "Authorization": auth
            }
        }
    );

    const manifestData = await manifest.json.catch( async e => {
        core.setFailed(e.message);
        core.setFailed(await manifest.text);
    });

    const tagUrl = `https://${registry}/v2/${repository}/manifests/${newTag}`;

    core.debug("Posting manifest to      " + tagUrl);

    const call = await requests.put(
        tagUrl,
        {
            body: JSON.stringify(manifestData),
            headers: {
                "Accept": mime,
                "Content-Type": mime,
                "Authorization": auth
            },
        }
    );
    const result = await call.response.catch(async e => {
        core.debug("Failed to 'put' new tag");
        core.debug(e.message);
    });

    if (result.status === 201) {
        core.debug("Successful");
        return;
    }
    core.debug("Status: "+ result.status);
    core.debug(result);
}

function getAuth(registry) {
    const auth = core.getInput("auth");

    if (auth) {
        return auth;
    }

    const home      = process.env.HOME;
    const rawConfig = fs.readFileSync(home + "/.docker/config.json");
    const config    = JSON.parse(rawConfig);

    if (!("auths" in config)) {
        core.setFailed("No docker authorization info found");
        return;
    }

    const auths = config.auths;

    if (!(registry in auths)) {
        core.setFailed("No docker authorisation for " + registry);
        return;
    }

    core.setSecret(auths[registry].auth);

    return "Basic " + auths[registry].auth;
}

main().catch(error => core.setFailed(error.message));

// vim: nospell ts=4 expandtab
