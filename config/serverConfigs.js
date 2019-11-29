module.exports = {
    downloadPath: './../Downloads/',
    serverConfigurations: [
        {
            info: {
                name: "default",
                mainURL: "https://31cc54b4-dd05-4f74-addc-4426b400ce8e.mock.pstmn.io/",
                port: 4499
            },
            subpath: {
                publicip: "public-ipv4",
                localip: "local-ipv4",
                amiId: "ami-id",
                // publichostName: "public-hostname",
                // localhostName: "local-hostname",
                // az: "placement/availability-zone",
                workername: "iam/security-credentials",
                // creds: "iam/security-credentials/' + workername",
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