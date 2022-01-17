module.exports = {
    branch: 'master',
    plugin: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/npm',
            {
                pkgRoot: 'src'
            }
        ],
        [
            '@semantic-release/github',
            {
                assets: 'dist/*.tgz'
            }
        ],
        [
            '@semantic-release/exec',
            {
                successCmd: 'echo "RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV'
            }
        ]
    ]
};
