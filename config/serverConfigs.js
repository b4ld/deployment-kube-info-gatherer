module.exports = {
    downloadPath: './../Downloads/',
    serverConfigurations: [
        {
            info: {
                provider: "default",
                mainURL: "https://reqres.in/api/",
                port: 4499
            },
            subpath: {
                publicip: "users",
                localip: "usersqwe",
            }
        
        },
        {
            info: {
                provider: "aws",
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
                workername: "iam/security-credentials"
            }

        },
        {
            info: {
                provider: "google",
                mainURL: "http://metadata.google.internal/computeMetadata/v1/",
                port: 4499
            },
            subpath: {
                publicip: "instance",
            }

        },
        {
            info: {
                provider: "azure",
                mainURL: "http://metadata.google.internal/computeMetadata/v1/",
                port: 4499
            },
            subpath: {
                publicip: "instance",
            }

        },
        {
            info: {
                provider: "digitalocean",
                mainURL: "http://169.254.169.254/metadata/v1/",
                port: 4499
            },
            subpath: {
                publicip: "hostname",
            }

        },
        {
            info: {
                provider: "openstack",
                mainURL: "http://169.254.169.254/openstack/latest/",
                port: 4499
            },
            subpath: {
                publicip: "instance?",
            }

        },
        {
            info: {
                provider: "rancher",
                mainURL: "http://rancher-metadata/2015-07-25/",
                port: 4499
            },
            subpath: {
                publicip: "instance?",
            }

        },
    ]
}