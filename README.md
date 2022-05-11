```bash
 ____                   _     _         _                             _   _ 
| __ )   _ __    __ _  | |_  (_)  ___  | | __   __ _            ___  | | (_)
|  _ \  | '__|  / _` | | __| | | / __| | |/ /  / _` |  _____   / __| | | | |
| |_) | | |    | (_| | | |_  | | \__ \ |   <  | (_| | |_____| | (__  | | | |
|____/  |_|     \__,_|  \__| |_| |___/ |_|\_\  \__,_|          \___| |_| |_|
```
### Simple deployment utility for our Bratislava projects

## Prerequisites
To be able to work with this utility, you need to have a few things configured:

#### Installations:
1. Installed `git` (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Installed `kubectl` (https://kubernetes.io/docs/tasks/tools/)
3. Installed `docker` (https://docs.docker.com/engine/install)
4. Kustomization files in `/kubernetes` folder


#### Running apps:
These apps should be running when you start `bratiska-cli`:
1. Run `docker`
2. You need to be signed in to our docker repository `harbor.bratislava.sk`. See the manual below.
3. You need to have running `kubect` and be signed into the Kubernetes cluster. If you have issues signing to Kubernetes, contact your administrator.


## Installation

Installing dependencies
```bash
npm install
```

Building cli in repo
```bash
npm run bratiska:build
```

## Usage
There is straightforward usage because the utility tries to obtain all values from the repo automatically, and if something is missing, it will point out.
```bash
npm run bratiska
```

If you need to deploy to staging or production, you need to add a special flag to the command.
```bash
npm run bratiska -- --staging
```
or
```bash
npm run bratiska -- --production
```

### Run with more options

#### Namespace
The default namespace for utility is `standalone`, but you can change it to other like:
```bash
npm run bratiska -- --namespace=bratislava-monorepo
```

#### Deployment
Default deployment for the app names from `project.json`, but you can change it like:
```bash
npm run bratiska -- --deployment=nest-prisma-template-super-duper
```

#### Host
Default deployment host for an app depends on `deployment` and `environment`, but you can change it like:
```bash
npm run bratiska -- --host=starwars.bratislava.sk
```

#### Enviroment
If you want to change the environment, you can specify it there:
```bash
npm run bratiska -- --env=dev
```
Or you switch env with `kubectl config use-context tkg-innov-dev`

#### Registry
If you want to use a different registry like `ghcr.io`, you can change it here, but don`t forget to add new credentials.
```bash
npm run bratiska -- --registry=ghcr.io
```

#### Staging and Production
To deploy to the stage, you need to add `--staging` flag, and your changes need to be committed and pushed to branch to our repository. You can`t have untracked changes.

The same applies to production, so you need to use `--production`, and changes must be merged to master. Otherwise, you can`t update production.

```bash
npm run bratiska -- --staging
```

#### Debug
If you need to debug the deploy process, you can add the `--debug` option. This will save the kustomize manifest to the directory so that you can inspect it. Also, it does not delete the image from docker so that you can have a look at it.

```bash
npm run bratiska -- --debug
```

##### TODO
- add a flag for choosing the kusomisation folder.
- restrict deployment to prod to specific users

## More manuals

### Signing to harbor

We need to configure a harbor connection for uploading images to the registry.

1. Open our registry website: https://harbor.bratislava.sk
2. Sign in with your Azure account
3. Copy CLI secret from your profile. Follow the picture guide:
   - Go to your profile in the right top corner:
   
     ![alt text](./public/readme/user.png)
   
   - Click on `User Profile`
   - Copy `CLI secret`
     ![alt text](./public/readme/profile.png)
4. Sign in docker with the command:
```bash
$ docker login https://harbor.bratislava.sk
```
using your username `your.name@bratislava.sk` and `CLI secret` value
5. When you see `Login Succeeded,` then you are done 👏


## Stay in touch
- If you find some bug, please get in touch with us on GitHub or mail inovacie@bratislava.sk
- Website - [https://inovacie.bratislava.sk/](https://inovacie.bratislava.sk/)
