module.exports = {
    branches: ['master', 'next'],
    plugin: [
        [
            '@semantic-release/github',
            {
                successComment:
                    ':tada: This ${issue.pull_request ? "PR is included" : "issue has been resolved"} in' +
                    '[version ${nextRelease.version}](${releases.filter(release => /github.com/i.test(release.url))[0].url}) :tada:',
                assets: [
                    {
                        path: 'dist.zip',
                        label: 'dist-${nextRelease.version}.zip'
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
                tarballDir: 'dist-${nextRelease.version}.zip'
            }
        ]
    ]
};
