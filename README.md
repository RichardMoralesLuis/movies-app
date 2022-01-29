# Movies App

Hello everyone and welcome to my project!!

The Movies App is a simple web created in react that allows the users search information about any film and mark as a
favorite.

## Getting Started

This project is working with the version of node 14.17.0 so before all you must execute the command `nvm use` in your
terminal to download and install the correct node version.

Then, the project has a make script for configure the dependencies so after the `nvm use` the idea is run `make init` to
initialize the project.

## Run the project

If you want to run the project you will need some extra configurations:

* First you must go to https://www.themoviedb.org/?language=es-ES and create an account. Then you need an APIKEY that
  you can take in the configurations section in your profile.
* When you have the APIKEY you need to create a .env file and set the following variables:
    * `REACT_APP_API_KEY=<<APIKEY>>`
    * `REACT_APP_BASE_URL=https://api.themoviedb.org/3`
    * `REACT_APP_MOVIEDB_IMAGE_URL=https://image.tmdb.org/t/p/w300`

As you can see we are using the v3 of the API.


## Tests

For running the test you only need to use the command `Make test`.

## Build

For building the app just make a `yarn build`.

## CI-CD

This project use CI-CD wit GitHub actions, you can see the configuration in the `.github/Workflows` directory. At this moment the project check on each push.
    
    



