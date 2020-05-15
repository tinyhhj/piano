cd myapp
npm run build
cd ../
./mvnw install -Dmaven.test.skip=true
../yt_web_down/build.sh
docker image pull linuxserver/transmission
