# DotaProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## API DOC
https://docs.opendota.com/

## Deploy to github page
This project I deployed on github page, as follow some info for it:  

`git checkout gh-pages` from `dev` branch  
`git merge dev`  
`npm run predeploy`  
Create 404.html copied from index.html if not  
`git add .`  
`git commit -am "built base {dev merge to main commit}"`  
`git push https://github.com/iversonLv/dotaProject.git`  

https://angular.cn/guide/deployment  

`ng build --prod --output-path docs --base-href /dotaProject/`  

## Deploy to netlify
Same with above Deploy to github page, but need a _redirect page


https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site  

environment.ts
environment.pro.ts
| Key       | Value     | Description     |
| :------------- | :----------: | :----------: |
|  BASE_API_URL | https://api.opendota.com/api  | Main Api could open swagger to view |
| BASE_LOCAL_DATA_URL   | /assets/data | This is some static json data, current most json data is grab from git raw(same with below), for dev phase, use this. |
| BASE_GIT_RAW_DATA_URL   | [raw_data](https://raw.githubusercontent.com/odota/dotaconstants/master/build) | this git raw json is continue updating, so prod phase, use this. |

[x] Setup general service  
  - [x] GET  
  - [x] POST  
  - [] PUT  
  - [] DELETE  
  - [x] errorHandle  
[x] Setup Service/Store/Action/Reducers/Effects
  - [X] constants TODO: now all constants are locally, we should update use api call: Fixed, we now use dotaconstants package
  - [x] Player service
    - [x] GET Player data  
    - [x] GET Player win lose  
    - [x] GET Player recent matches  
    - [x] GET Player matches  
    - [x] GET Player heroes 
    - [x] GET Player peers  
    - [x] GET Player pros
    - [x] GET Player totals
    - [x] GET Player counts (GET matches)
    - [X] GET Player histograms
    - [X] GET Player trends (GET matches)
    - [x] GET Player wardmap 
    - [x] GET Player wordcloud
    - [x] GET Player ratings
    - [x] GET Player rankings
    - [x] POST Player refresh 
    - [x] GET pro player data (2021.3.1)
    - [X] GET duration data (2020.10.20) 
  - [x] Teams service
    - [x] GET Teams list data (2021.2.5)
    - [x] GET Teams general data detail page top hero part (2021.2.6)
    - [x] GET Teams matches (2021.2)
    - [x] GET Teams players (2021.2)
    - [x] GET Teams heroes (2021.2)
    [x] Heroes service
    - [x] GET Heroes list data (2021.2.16)
    - [x] GET Heroes Stats data (2021.2.16)
    - [x] GET Heroes Rankings (2021.2.16)
    - [x] GET Heroes Benchmarks (2021.2.16)
    - [x] GET Heroes Matches (2021.2.16)
    - [x] GET Heroes Matchups (2021.2.16)
    - [x] GET Heroes Durations (2021.2.16)
    - [x] GET Heroes Players (2021.2.16)
    - [x] GET Heroes ItemPopularity (2021.2.16)
      <!-- local data -->
    - [x] GET Heroes local (2021.1) deprecated, load from dotaconstants directly(2021.10.4)
    - [x] GET Heroes Abilities (2021.2) deprecated, load from dotaconstants directly(2021.10.4)
    - [x] GET Ablitities Talents List (2021.2) deprecated, load from dotaconstants directly(2021.10.4)
    - [X] GET Heros stas (2021.3.1)(2021.3.2) deprecated, load from dotaconstants directly(2021.10.4)
  - [x] Records service
    - [x] GET Records list data (2021.2.26)
  - [x] Matches service
    - [x] GET pro matches list data (2021.3.2)
    - [x] GET public matches list data (2021.3.2)
    - [x] GET matches detail data (2021.3.1)
    - [99%] POST parsed matches (2022.2.28) after parse match, reload page, set static 30 second which not flexible
  - [x] Search
    - [x] GET serch (2021.2.28)
  - [x] Find Matches
[] Setup/Finish pages
  - [X] Home page (2021.3.27)
  - [99%] Search page: Search matches/Players (2021.2.28) TODO: search term is empty the public table and match tables are odd behavior
  - [x] 404 not found page (2021.2.28)
  - [x] Heros page  (2021.3.1)(2021.3.2)
    - [x] Heros list page : QA: the total matches seems divided 10? and the percentage seems are permil(2021.3.1)(2021.3.2)
      - [99%] Heros list professional page (2021.3.1)(2021.3.2)
      - [99%] Heros list public page: (2021.3.1)(2021.3.2)
      - [99%] Heros list turbo page: (2021.3.1)(2021.3.2)
    - [99%] Hero detail page
      - [x] Heros detail top hero part (2021.2.8)(2021.2.14) TODO: attack speed is different, magic resistence current is static 25%
            Heros specter and shard(2022.10.19)
      - [100%] Heros detail rankings page (2021.2.15)(2021.2.18)(2021.2.27 fixed table setTimeout())
      - [100%] Heros detail benchmarks page(2021.2.18): Charts (2021.2.20)(2021.2.27 fixed table setTimeout())
      - [x] Heros detail recent page: (2021.2.15, 4.12)
      - [100%] Heros detail matchups page: (2021.2.16)(2021.2.18)

      - [100%] Heros detail durations page (2021.2.20-21)
      - [x] Heros detail players page: (2021.2.16, 4.12)
      - [X] Heros detail items page: (2022.10.19)
  - [] Players page  
    - [99%] Players overview page:land_role don't know how to definde roaming (2021.1)(2021.3.10) TODO: include turbo seems contary with official website
    - [x] Players matches page (2021.1)
    - [x] Players heroes page  (2021.1)
    - [x] Players peers page   (2021.1)
    - [x] Players pro page   (2021.1)
    - [x] Players records page (2021.3.6) 
    - [x] Players totals page   (2021.1)
    - [x] Players counts page (2021.3.6)   
    - [99%] Players histograms page  (2021.3.5) TODO: array remove all data if it's 0 till end
    - [99%] Players trends page  (2021.3.8) TODO: Don't how to grab title Avg data, it's not the match field avarage data
    - [x] Players wardmap page  (2021.3.9) currently, can't do heatmap, use scatter effect
    - [x] Players wordcloud page  (2021.3.8) I used treemap rather than use word cloud as no suite plugin for it currently
    - [x] Players mmr page (2021.3.8)
    - [95%] Players rankings page TODO: rank coulmn, don't know how to cal(2021.1)
    - [99%] Players Activities page (2021.2.22,23 ) TODO: cell style for click,
  - [x] Matches page  (2021.3)  SETUP pages and route for all pages, tabs
    - [x] Matches list page (2021.3.2)(2021.3.3)
      - [x] Matches pro TODO: first column the time is start_time + duration, now mine is only start_time
      - [x] Matches public TODO: first column the time is start_time + duration, now mine is only start_time
    - [] Match detail page
      - [x] Top over part (2021.3.11) TODO: parse match button function
      - [90%] OVERVIEW (2021.3.16, 17)(2021.3.23) overview table, abilit updagrades table
      - [x] BENCHMARKS (2021.3.13) TODO: table column highlight not implemented yet
      - [X] DRAFT (2021.3.12) now, use picks_bans for data, the draft_timings looked odd and some ban pick are skip
      - [x] PERFORMANCES (2021.3.14, 15)
      - [70%] LANING (2021. 4.28, 29)
      - [X] COMBAT (2021.3.14, 19) merge kills and damage table together
      - [99%] FARM (2021.3.14, 19, 20, 21) TODO: last_hit sort not work, the finalData does not grab the spread data
      - [x] ITEMS (2021.3.22)
      - [x] GRAPHS (2021.3.22, 23)
      - [99%] CASTS (2021.3.14, 18) TODO: hover on other image, ability target image will fresh(only happen if open the dev tools), some error in dev tools for undefinded
      - [99%] OBJECTIVES (2021.3.18) TODO: RAXT, RAXM, RAXB chartbar need improve, need calperfect number for plus data, now only for one data
      - [x] VISION (2021.3.30,31,4.6, 4.8, 4.9, 4.11, 4.14(single-vision-map, 4.14))
      - [X] ACTIONS (2021.3.14)
      - [85%] TEAMSFIGHTS (2021.3.27,28) TODO click the fight icon does not update the data, left map
      - [] ANALYSIS onhold
      - [x] COSMETICS (2021.3.15)
      - [99%] LOG (2021.4.17, 18, 4.25) Building kill text need update readable
      - [X] FANTASY (2021.3.26) observer column number fomular is odd, current is observer + ser uses
      - [x] CHAT (2021.4.15, 16) Filter logic is too long, need rethink how could be more simple
      - [] STORY
  - [99%] Teams page (2021.2.8)
    - [99%] Teams list page : The sort result is different from officaily one (2021.2.5)
    - [x] Team detail page (2021.2.8)
      - [x] Top hero part which will be for all detail sub pages (2021.2.6)
      - [x] Team detail overview page (2021.2.8)
      - [x] Team detail matches page (overview page limit 20 rows without pagination)(2021.2.7)
      - [x] Team detail heroes page (2021.2.8)
      - [x] Team detail players page (some player does not have avatar will use onError="this.src='./assets/images/portrait.png'") (2021.2.8)
  - [x] Records page (2021.2.26)
    - [x] sub pages very similar: duration, kills, deaths, assists, gold per min, xp per min, last hits, denies, hero damage, tower damage, hero healing (2021.2.26)
  - [X] Dota2 pro player world population (2021.4.11)
    - [x] Click the world dot will show modal to show the country pro player list(2021.4.12)
  - [90%] Patch pages (2021. 4.12, 4.13) Now the patch notes is not readable for heroes, so we don't dispose the page yet.
[x] Items pages (2022.10.17)
  - [x] items list base on client
  - [x] Updated items added category and qual
[x] Medals pages (2022.10.20)
  - [x] Rank tier bar chart (2022.10.20)
  - [x] Medals icon
[] Improve
  - [] Update ngfor with trackby?
  - [x] Update sub navigation as share component (2021.2.6)
  - [x] update nav title to support teams detail and player detail (2021.2.6)
  - [x] Update all isLoading = true for all page? update all subscribe method with !data.isLoading?
  - [x] Updated ability modal, item modal pass local data from parent compnent, then won't need read the json every hover, just one fetch
  - [] Maybe update abliltiy modal and item modal like player box in separated component with img and modal?
  - [] Update all win game player slot 120 as some RPG co op RADIENT player slot from 0-25
  - [X] Update all image onError="this.src='./assets/images/Dota2Logo.svg'"
  - [] Improve the match page 5K matches load speed, now looked freeze the page
[] Deploy
  - [x] Setup the repo on github page(2021.2.26)
  - [x] Deploy to github page (2021.2.26)  
[x] Integrate sign in with steam (2022.12.11)  
[x] Added progressbar for http interceptor (2022.12.15)  

# Useful info
https://dota2.gamepedia.com/Armor

# Formular
KDA fomular: (kills + assists) / (deaths + 1)  
(血量跟力量有关)HP: base_health + base_str * 20  
(魔法跟智力有关)MP: base_mana + base_int * 12  
Base attack: base_attack_min + base_agi  base_attack_max + base_agi  
(护甲跟敏捷有关)Base armor: base_armor + 0.167 * base_agi  

# Idea
analize player fond of using item, and hate?  
analize player fond of using which primary attr heroes? agi, str, int?  
analize player fond of using which type heroes? 远程？刺客？坦克？爆发？  
analize player fond of using which role heroes? soft support? hard support? mid? safe? off land?  
analize player heroes keep winning?  

# QA
How could we know a hero is roaming or not, current can't be



video for heror
<video
  class="heropage_HeroPortrait_22nJ5"
  [poster]="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/'+ (hero['name'] | nameDestruct: '_' : '3') +'.png'"
  autoplay=""
  preload="auto"
  loop=""
  playsinline="">
    <source
      type="video/webm"
      [src]="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/'+ (hero['name'] | nameDestruct: '_' : '3') +'.webm'"
    >
    <img [src]="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/'+ (hero['name'] | nameDestruct: '_' : '3') +'.png'">
</video>