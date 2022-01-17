module.exports = {
    branch: 'master',
    plugin: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/github',
            {
                successComment:
                    ':tada: This ${issue.pull_request ? "PR is included" : "issue has been resolved"} in' +
                    '[version ${nextRelease.version}](${releases.filter(release => /github.com/i.test(release.url))[0].url}) :tada:',
                assets: [
                    {
                        path: ['dist'],
                        name: 'build-${nextRelease.gitTag}.js',
                        label: 'build JS (${nextRelease.gitTag}) distribution'
                    }
                ]
            }
        ],
        [
            '@semantic-release/exec',
            {
                successCmd: 'echo "RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV'
            }
        ],
        [
            '@semantic-release/npm',
            {
                tarballDir: 'build-${nextRelease.gitTag}.js'
            }
        ]
    ]
};
