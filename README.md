# mutantRecognition
## This repo contains the code to determin if given a DNA matrix sequence the DNA is mutant or not

## Prerequisites
* Node
* npm

## Running it locally (without saving into )
```
CMD=true node index.js
```

## Change the parameter when running locally
Update the inputMatrix value with the matrix you want to test

## Running it on a docker environment
```
1) Run
  docker-compose up --build
2) Load the postman suite (inside tests folder) which contains both methods to test
3) Load the jmeter suite (inside tests folder) which contains both methods to test (the test is set to 100 concurrent users executing the suite 100 times)
```
