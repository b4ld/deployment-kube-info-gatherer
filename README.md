# Kubernetes info-gatherer pod

Simple application meant to debug on kubernetes cluster environment
Displays a table with many metadata info that helps you to understand the environment that you are at.


## Getting Started

Node base application using OS module to get:

- freemem
- homedir
- hostname
- platform
- release
- totalmem
- etc

And Kubernetes AWS pod API based on http://169.254.169.254/latest/meta-data to get:

- ipv4
- ami id
- local host name
- public host name
- etc


**Note**: This application was made to Kubernetes on AWS, 
Even it works on a basic Docker environment, it will not be able to show all the parameters.


### Using the Application

This app is stored on [DOCKER HUB](https://cloud.docker.com/repository/docker/b4lddocker/deployment-kube-info-gatherer) repository, and you can pull it and use it on you deployment.yaml.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-infog
  namespace: infog
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
        image:  #<complete with REPO IMAGE>
        imagePullPolicy: Always
        ports:
          - containerPort: 4499 #Container/Application
            name: http
---
apiVersion: v1
kind: Service
metadata:
  name: kube-infog-service
  namespace: infog
  labels:
    app: kube-infog
spec:
  selector:
    app:  kube-infog
  type: NodePort
  ports:
  - name:  http
    port:    4499 #Same the Ingress/Loadbalancer
    targetPort: 4499 #Bind to container/Application
    
```




Or you can clone this repo and make it your own to build it.
```
docker build -f Dockerfile -t [ImageName]:[ImageVersion] .
```


## Built With

* [Node.js](https://nodejs.org/en/) - Base Application Framework

## Contributing

Any change and pull request are welcome.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/b4ld/deployment-kube-info-gatherer/tags). 

## Authors

* **b4ld** - *Initial work* - [b4ld](https://github.com/b4ld)


## License

This project is licensed under the MIT License

## Acknowledgments

* Hat
* Inspiration
* l
