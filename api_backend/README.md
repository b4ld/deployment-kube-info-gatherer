# Info-gatherer deployment

Simple docker based app created to help debug on cloud providers.
Displays a table with many metadata info that helps you to understand the environment arround you.


## Getting Started

Supports:

###System info like:
- freemem
- homedir
- hostname
- platform
- release
- totalmem


###Docker containers lister:
- by name


###Cloud Provider Metadata Like:
- Node Hostname
- public/local Ip
- Credential Exposure checker



System info based on Node Module "systeminformation". 
 

Metadata Cloud Service API:

Definition of Link-local:[LINK-LOCAL](https://en.wikipedia.org/wiki/Link-local_address)


 Amazon Web Services (AWS) 
 ![Status](https://img.shields.io/badge/Status-Working-green)  
 `http://169.254.169.254/latest/meta-data/ami-id`                            
 https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html            

 Google Cloud           
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://metadata.google.internal/computeMetadata/v1/instance/machine-type`  
  https://cloud.google.com/compute/docs/storing-retrieving-metadata                         

 Microsoft Azure        
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://169.254.169.254/metadata/instance?api-version=2017-12-01`           
  https://docs.microsoft.com/en-us/azure/virtual-machines/windows/instance-metadata-service 
 
 DigitalOcean               
 `http://169.254.169.254/metadata/v1/hostname`                                       
  https://www.digitalocean.com/docs/droplets/resources/metadata/                            

 OpenStack              
![Status](https://img.shields.io/badge/Status-InProgress-yellow)
`http://169.254.169.254/openstack/latest`
 https://blogs.vmware.com/openstack/introducing-the-metadata-service/                      
 
 Rancher (Kubernetes)   
 ![Status](https://img.shields.io/badge/Status-InProgress-yellow)    
 `http://rancher-metadata/2015-07-25/`
https://rancher.com/introducing-rancher-metadata-service-for-docker/                      



### Using the Application

This app is stored on [DOCKER HUB](https://cloud.docker.com/repository/docker/b4lddocker/deployment-kube-info-gatherer) repository


#### Using it With Docker

In order to use it with docker, the container must know the docker socket, so it is mandatory that you map it with the volume.

```bash
docker run -d --name infog -p 4490:4490 -v /var/run/docker.sock:/var/run/docker.sock b4lddocker/deployment-kube-info-gatherer:latest-v1
```

---

NOTE: If you are on Windows Docker-for-Desktop - you may whant to map like this instead.

```bash
docker run -d --name infog -p 4490:4490 -v //var/run/docker.sock:/var/run/docker.sock b4lddocker/deployment-kube-info-gatherer:latest-v1

```


#### Using it With Kubernetes

You can pull it and use it on you deployment.yaml.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-infog
  # namespace: infog
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kube-infog
  template:
    metadata:
      labels:
        app: kube-infog
    spec:
      containers:
      - name: kube-infog
        image: b4lddocker/deployment-kube-info-gatherer:latest
        command: ["npm","run","build"]
        imagePullPolicy: Always
        ports:
          - containerPort: 4490 #Container/Application
            name: http
        volumeMounts:
          - name: dockersock
            mountPath: /var/run/docker.sock
      volumes:
         - name: dockersock
           hostPath:
              path: /var/run/docker.sock
---
apiVersion: v1
kind: Service
metadata:
  name: kube-infog-service
  # namespace: infog
  labels:
    app: kube-infog
spec:
  selector:
    app:  kube-infog
  type: NodePort
  ports:
  - name: http
    port: 4499 #Same the Ingress/Loadbalancer
    targetPort: 4499 #Bind to container/Application




```
Or you can clone this repo and build it on your own

```
docker build -f Dockerfile -t [ImageName]:[ImageVersion] .
```


## Built With

* [Node.js](https://nodejs.org/en/) - Base Application Framework

## Contributing

Any change and pull request are welcome.

## Docker Images Versioning


**Release 1.1.0** 
![Version](https://img.shields.io/badge/Version-V1.x-blue) 
![Maintenance](https://img.shields.io/badge/Maintenance-false-yellow)

```
b4lddocker/deployment-kube-info-gatherer:1.1.0
```
Notes:
- Working with AWS Meta API
- Node.OS Module
- SystemInfoModule
- Pug render
- Static Page

**Last Build on V1**

------

**Release 2.0.0+** 
![Version](https://img.shields.io/badge/Version-V2.x-blue) 


Frontend
```
b4lddocker/deployment-kube-info-gatherer:app-2.0.0
```
Backend
```
b4lddocker/deployment-kube-info-gatherer:api-2.0.0
```
Notes:
- Working with AWS Meta API
- SystemInfoModule
- Node
- Decoupled Front End
- React Frontend

Manisfest Yaml to deploy in Kubernetes
```
EEEEEEEEEEEEEEEEEEEEE
```



------




## Authors

* **b4ld** - *Initial work* - [b4ld](https://github.com/b4ld)


## License

This project is licensed under the MIT License
