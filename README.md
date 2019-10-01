# Kubernetes info-gatherer pod

Simple application meant to debug on kubernetes cluster environment
Displays a table with many metadata info that helps you to understand the environment that you are at.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

os.freemem()
os.homedir()
os.hostname()
os.platform()
os.release()
os.totalmem()


Note: This application was made to Kubernetes on AWS, 
Even this application works on a basic Docker environment, it will not be able to show all the parameters.

```
Give examples
```

### Using the Application

This app is stored on DOCKER HUB repository, and you can pull it and use it on you deployment.yaml.

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
        image:  #<IMG FROM REPO>
        imagePullPolicy: Always
        ports:
          - containerPort: 4499 #Container/Application
            name: http
---
apiVersion: v1
kind: Service
metadata:
  name: kube-infog-service
  namespace: fnn
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


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Node.js](https://nodejs.org/en/) - Base Application Framework

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
