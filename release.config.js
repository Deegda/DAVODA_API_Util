module.exports = {
    branch: 'master',
    plugin: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
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
        ],
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
                tarballDir: 'dist'
            }
        ]
    ]
};
