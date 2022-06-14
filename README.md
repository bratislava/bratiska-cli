##Beta version of

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
3. Installed `kustomize` (https://kubectl.docs.kubernetes.io/installation/kustomize/)
4. Installed `docker` (https://docs.docker.com/engine/install)
5. Kustomization files in `/kubernetes` folder

#### Running apps:

These apps needs be running when you use `bratiska-cli`:

- running `docker`
- You need to be signed in to our docker repository `harbor.bratislava.sk`. See the manual below.

    ```bash
    docker login https://harbor.bratislava.sk
    ```
- You need to have running `kubect` and be signed into the Kubernetes cluster. If you have issues signing to Kubernetes, contact your administrator.

## Installation

Installing dependencies

```bash
yarn global add bratislava/bratiska-cli
```



## Usage

There is straightforward usage because the utility tries to obtain all values from the repo automatically, and if something is missing, it will point out.

```bash
bratiska-cli deploy
```

If you need to deploy to staging or production, you need to add a special flag to the command.

```bash
bratiska-cli deploy -- --staging
```

or

```bash
bratiska-cli deploy -- --production
```

### Run with more options

#### Build image only

If you want to build an image only, run:

```bash
bratiska-cli deploy -- --build_image
```

#### Build image only without push to the registry

If you want to build an image without pushing to registry run:

```bash
bratiska-cli deploy -- --build_image_no_registry
```

#### Build kustomize only

If you want to build a kustomize file, only run

```bash
bratiska-cli deploy -- --build_kustomize
```

#### Build kustomize only with specified docker image

If you want to build kustomize file only run

```bash
bratiska-cli deploy -- --build_kustomize --image harbor.bratislava.sk/standalone/nest-prisma-template:bratiska-cli-3f3ce4fd14c76138a081596b2987a81f18a3c747-master-untracked
```

#### Deploy with special imagee

If you have specified image you can deploy it

```bash
bratiska-cli deploy --  --image harbor.bratislava.sk/standalone/nest-prisma-template:bratiska-cli-3f3ce4fd14c76138a081596b2987a81f18a3c747-master-untracked
```

#### Specify kustomize file or folder

If you want, you can specify the kustomize file or kustomize folder with this command:

```bash
bratiska-cli deploy -- --kustomize ./path/path
```

#### Dry run, without deploying to Kubernetes

If you don`t want to deploy to Kubernetes, then you can run it with a dry run flag:

```bash
bratiska-cli deploy -- --dry_run
```

#### Namespace

The default namespace for utility is `standalone`, but you can change it to other like:

```bash
bratiska-cli deploy -- --namespace=bratislava-monorepo
```

#### Deployment

Default deployment for the app names from `project.json`, but you can change it like:

```bash
bratiska-cli deploy -- --deployment=nest-Prisma-template-super-duper
```

#### Host

Default deployment host for an app depends on `deployment` and `environment`, but you can change it like:

```bash
bratiska-cli deploy -- --host=starwars.bratislava.sk
```

#### Enviroment

If you want to change the environment, you can specify it there:

```bash
bratiska-cli deploy -- --env=dev
```

Or you switch env with `kubectl config use-context tkg-innov-dev`

#### Registry

If you want to use a different registry like `ghcr.io`, you can change it here, but don`t forget to add new credentials.

```bash
bratiska-cli deploy -- --registry=ghcr.io
```

#### Staging and Production

To deploy to the stage, you need to add `--staging` flag, and your changes need to be committed and pushed to branch to our repository. You can`t have untracked changes.

The same applies to production, so you need to use `--production`, and changes must be merged to master. Otherwise, you can`t update production.

```bash
bratiska-cli deploy -- --staging
```

#### Debug

If you need to debug the deploy process, you can add the `--debug` option. This will save the kustomize manifest to the directory so that you can inspect it. Also, it does not delete the image from docker so that you can have a look at it.

```bash
bratiska-cli deploy -- --debug
```

### Examples

Dry run with custom image and specified folder to kustomize.

```bash
bratiska-cli deploy -- --dry_run --image harbor.bratislava.sk/standalone/nest-prisma-template:bratiska-cli-3f3ce4fd14c76138a081596b2987a81f18a3c747-master-untracked --kustomize ./kubernetes/base
```

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
docker login https://harbor.bratislava.sk
```

using your username `your.name@bratislava.sk` and `CLI secret` value 5. When you see `Login Succeeded,` then you are done 👏

## Development

You need to pull this repo with 
`git clone bratislava/bratiska-cli`. Then you can build it with command: `yarn run build`. If everything was builded fine, you can test it localy with `yarn run start`.


## Release

Create tag:
```bash
git tag -a v1.3.5 -m "1.3.5 env fix" 
```

Push tag
```bash
git push origin v1.3.5
```

## Stay in touch

- If you find some bug, please get in touch with us on GitHub or mail inovacie@bratislava.sk
- Website - [https://inovacie.bratislava.sk/](https://inovacie.bratislava.sk/)

TODO
-- secrets creation support


