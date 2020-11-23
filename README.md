# Microgen project populator
#### Usage
clone url
```sh
$ git clone url
```
Install depedencies
```sh
$ npm install
```

update file `requester.ts` to set endpoint
```
const BACKEND_ENDPOINT = "http://yourendpoint.com"
```

update file `index.ts`as you want, to provided data to microgen table, in that file you can set
- table name => what table will you populate
- token => authorzation token is required to do operation

#### run
example usage to create 1000 record after configuration
```sh
$ npx ts-node index.ts 1000
```