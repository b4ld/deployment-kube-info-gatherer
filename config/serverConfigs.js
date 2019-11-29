module.exports = {
    serverConfigurations: [
        {
            info: {
                name: "default",
                mainURL: "http://httpbin.org/get/",
                port: 4499
            },
            subpath: {
                publicip: "origin",
                agent: "user",
            }
        
        },
        {
            info: {
                name: "aws",
                mainURL: "http://169.254.169.254/latest/meta-data/",
                port: 4499
            },
            subpath: {
                publicip: "public-ipv4",
                localip: "local-ipv4",
                amiId: "ami-id",
                localhostName: "local-hostname",
                publichostName: "public-hostname",
                region: "placement/availability-zone",
                workername: "iam/security-credentials",
                credentials: "false"
            }

        },
        {
            info: {
                name: "azure",
                mainURL: "http://169.254.169.254/latest/meta-data/",
                port: 4499
            },
            subpath: {
                publicip: "public-ipv4",
                localip: "local-ipv4",
                amiId: "ami-id",
                localhostName: "local-hostname",
                publichostName: "public-hostname",
                region: "placement/availability-zone",
                workername: "iam/security-credentials",
                credentials: "false"
            }

        },
    ]
}