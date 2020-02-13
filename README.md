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



####  Kubernetes Deployment

You can pull it and use it on you deployment.yaml.
This deployment is for V2 only

Segregation of API and the APP

Manifests
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-infog-api
  # namespace: infog
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kube-infog-api
  template:
    metadata:
      labels:
        app: kube-infog-api
    spec:
      containers:
      - name: kube-infog-api
        image: b4lddocker/deployment-kube-info-gatherer:latest-v2-api
        command: ["npm","start"] 
        imagePullPolicy: Always
        ports:
          - containerPort: 4499 #Container/Application
            name: api
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
  name: kube-infog-service-api
  # namespace: infog
  labels:
    app: kube-infog-api
spec:
  selector:
    app:  kube-infog-api
  type: NodePort 
  ports:
  - name:  api
    port:    4499 #Same the Ingress/Loadbalancer
    targetPort: 4499 #Bind to container/Applicatio
---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-infog-app
  # namespace: infog
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kube-infog-app
  template:
    metadata:
      labels:
        app: kube-infog-app
    spec:
      containers:
      - name: kube-infog-app
        image: b4lddocker/deployment-kube-info-gatherer:latest-v2-app
        command: ["npm","start"] 
        imagePullPolicy: Always
        ports:
          - containerPort: 4490 #Container/Application
            name: app
        ports:
          - containerPort: 4499 #Container/Application
            name: api
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
  name: kube-infog-app-service
  # namespace: infog
  labels:
    app: kube-infog-app
spec:
  selector:
    app:  kube-infog-app
  type: NodePort
  ports:
  - name:  app
    port:    4490 #Same the Ingress/Loadbalancer
    targetPort: 4490 #Bind to container/Application

```

## Built With

* [Node.js](https://nodejs.org/en/) - Base API Framework
*[React.js](https://reactjs.org) - Base APP Framework

## Contributing

Any change and pull request are welcome.

## Docker Images Versioning

**Release 1.1.0** master-v1
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

------




## Authors

* **b4ld** - *Initial work* - [b4ld](https://github.com/b4ld)


## License

This project is licensed under the MIT License
