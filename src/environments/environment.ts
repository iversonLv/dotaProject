// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_API_URL: 'https://api.opendota.com/api',
  BASE_LOCAL_DATA_URL: '/assets/data',
  // BASE_GIT_RAW_DATA_URL: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build'
  BASE_GIT_RAW_DATA_URL: '/assets/data' || 'https://raw.githubusercontent.com/odota/dotaconstants/master/build',
  HERO_IMG_URL: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/',
  ABILITY_IMG_URL: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities',
  ERROR_IMG: 'this.src=\'./assets/images/Dota2Logo.svg\'',
  STEAMCDN: 'https://steamcdn-a.akamaihd.net',
  OPENDOTA: 'https://www.opendota.com/'
  // ex: https://steamcdn-a.akamaihd.net//apps/dota2/images/heroes/furion_full.png?
  //https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes
  //https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
