# ReGoBlog
An open source blog, designed to be a "plug and play" solution for `ButterCMS`. Written using React and Go. 

## Prerequisites
- [Go](https://golang.org/pkg/) (version >= `1.11.5`)
  - [Viper](https://github.com/spf13/viper)
  - [Gorilla Mux](https://github.com/gorilla/mux)
  - [ButterCMS](https://github.com/buttercms/buttercms-go)
- [create-react-app](https://facebook.github.io/create-react-app/) (version >= `1.5.2`)
- A [butterCMS](https://buttercms.com/) account

## Usage Instructions
- Add your ButterCMS and BasicAuth information to `server > config > config.json`
- Add your Server BasicAuth credentials to `frontend > .env`

## Running in Development mode
- Run the `run.sh` script in the `server` directory
- Run `npm start` in the `frontend` directory 

## Building for Production
- Run the `build.sh` script in the `server` directory. This will create a `build` folder with the compiled versions.
- Run `npm run build` in the `frontend` directory. This will create a `build` folder with the optimised production ready code.
