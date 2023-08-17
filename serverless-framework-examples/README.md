
# Serverless 
## Deploy
```shell
  $ sls deploy

  $ sls deploy -c ./admin-serverless.yaml
```

## Package
```shell
  $ sls package

  $ sls package -c ./admin-serverless.yaml
```

## Offline
```shell
  $ sls offline start

  $ sls offline start -c ./admin-serverless.yaml
```

## Remove Resource
```shell
  $ sls remove -c ./serverless.ts
```

## Function (local, deploy, log)
```shell
  $ sls invoke local -f index -c ./serverless.ts -s dev
  $ sls invoke -f index -c ./serverless.ts -s dev
  $ sls logs -f index -c ./serverless.ts
```

# Install plugin
```shell
  $ sls plugin install --name serverless-webpack
```
