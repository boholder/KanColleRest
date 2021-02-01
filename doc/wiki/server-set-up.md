# Setting up the server

> Attention here.
> Cloning this project will cost 2.3G (the main project 315M + submodules 2G) traffic,
> small bandwidth or billing traffic server should be reconsidered whether to clone this project.
> (Apologize again for the size.)

1. Run install script uploaded on github (or review it before):

```
source <(curl -s https://raw.githubusercontent.com/boholder/KanColleRest/master/install-kcrest.sh) 
```   

(https://raw.githubusercontent.com returns 443? Go to that file on github and manually copy it down and run.)

2. Set `NODE_ENV` environment variable to `production`

```
Windows:
set NODE_ENV=production
Linux:
export NODE_ENV=production
```

3. Start the server.

```
npm start
```

You may be interested in starting server as background service,
check [this discuss on stackoverflow](https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service)
for a proper solution. I have tried to imitate project [
fhs-install-v2ray](https://github.com/v2fly/fhs-install-v2ray) to run the server via Linux systemd, and wrote the logic inside
install script, but I have trouble writing scripts due to leak of bash knowledge.