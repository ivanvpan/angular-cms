# Services

```
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');
```


## Proprosed CRUD Services
```
// Documents

GET     /manager/api/<resource>                       LIST
POST    /manager/api/<resource>                       CREATE
GET     /manager/api/<resource>/:id                   READ
PUT     /manager/api/<resource>/:id                   UPDATE
DELETE  /manager/api/<resource>/:id                   DELETE

// Document Attributes

GET     /manager/api/<resource>/:id/<noun>            READ
PUT     /manager/api/<resource>/:id/<noun>            UPDATE
DELETE  /manager/api/<resource>/:id/<noun>            DELETE

// Embeded Documents

GET     /manager/api/<resource>/:id/<embeded>         LIST
POST    /manager/api/<resource>/:id/<embeded>         CREATE
GET     /manager/api/<resource>/:id/<embeded>/:eid    READ
PUT     /manager/api/<resource>/:id/<embeded>/:eid    UPDATE
DELETE  /manager/api/<resource>/:id/<embeded>/:eid    DELETE

// Document Sorting

GET     /manager/api/<resource>/:id/<embeded>/order   READ
PUT     /manager/api/<resource>/:id/<embeded>/order   UPDATE
```


## Account Services
```
GET    /manager/account
POST   /manager/account
```

## Artist Services
```
GET    /manager/artists
POST   /manager/artists/:id
GET    /manager/artists/:id/edit
GET    /manager/artists/:id/remove
GET    /manager/artists/add
GET    /manager/artists/twitter
GET    /manager/artists/tags
```

## Assets Services
```
GET    /manager/assets
GET    /manager/assets/:id/edit
POST   /manager/assets/:id/edit
GET    /manager/assets/:id/remove
GET    /manager/assets/get
POST   /manager/assets/create
GET    /manager/assets/search
```

## Contests Services
```
GET    /manager/contests
GET    /manager/contests/:id/edit
POST   /manager/contests/:id/edit
GET    /manager/contests/new
POST   /manager/contests/new
GET    /manager/contests/:id/remove
GET    /manager/contests/:id/entries
GET    /manager/contests/:id/export
GET    /manager/contests/entries/:id/remove
```

## Contibutors Services
```
GET    /manager/contributors
GET    /manager/contributors/:id/edit
POST   /manager/contributors/:id/edit
GET    /manager/contributors/:id/remove
GET    /manager/contributors/new
POST   /manager/contributors/new
GET    /manager/contributors/search
```

## Episodes Services
```
GET    /manager/shows/:id/episodes
GET    /manager/shows/:id/edit
POST   /manager/shows/:id/edit
GET    /manager/episodes/new/:id/
POST   /manager/episodes/create
GET    /manager/episodes/:id/remove
```

## Events Services (Consider Renaming)
```
GET     /manager/events
POST    /manager/events/new
GET     /manager/events/:id
POST    /manager/events/:id
GET     /manager/events/:id/remove
```

## Festivals Services
```
GET     /manager/festivals
GET     /manager/festivals/:id/edit
POST    /manager/festivals/:id/edit
GET     /manager/festivals/:id/remove
POST    /manager/festivals/:id/event/:event
GET     /manager/festivals/:id/event/:event/remove
GET     /manager/festivals/new
POST    /manager/festivals/new

// (Are the following temporary and no longer needed?)
GET     /manager/festivals/import/events
GET     /manager/festivals/import/vans
GET     /manager/festivals/clear
GET     /manager/festivals/remove/2012
GET     /manager/festivals/update/all
```

## Frame Services
```
GET     /manager/frame/update
GET     /manager/frame/debug
```

## Frame Bucket Services
```
GET     /manager/frame
GET     /manager/frame/search
GET     /manager/frame/new
POST    /manager/frame
GET     /manager/frame/moderate
GET     /manager/frame/:bucket/list
GET     /manager/frame/image
GET     /manager/frame/:id/edit
POST    /manager/frame/:id/edit
GET     /manager/frame/approve/:id
GET     /manager/frame/reject/:id
GET     /manager/frame/notification
GET     /manager/frame/import/:id
```

## Gallery Services
```
GET     /manager/pages/:id/gallery
GET     /manager/pages/:id/gallery.json
GET     /manager/pages/:id/gallery/order
POST    /manager/pages/:id/gallery
GET     /manager/pages/:id/gallery/add
POST    /manager/pages/:id/gallery/:slide
GET     /manager/pages/:id/gallery/:slide/metadata
GET     /manager/pages/:id/gallery/:slide/remove
```

## Index Services
```
GET     /manager/login
POST    /manager/login
GET     /manager/info
```

## Listicle Services
```
GET     /manager/pages/:id/listicle/order
POST    /manager/pages/:id/listicle
```

## Ooyala Services
```
GET     /manager/ooyala
```

## Pages Services
```
GET     /manager/pages
GET     /manager/pages/search
GET     /manager/pages/get
GET     /manager/pages/new
POST    /manager/pages/new
GET     /manager/pages/:id/edit
POST    /manager/pages/:id/edit
GET     /manager/pages/:id/preview
GET     /manager/pages/:id/publish
GET     /manager/pages/:id/unpublish
GET     /manager/pages/:id/content
POST    /manager/pages/:id/content/:content/edit
GET     /manager/pages/:id/add
GET     /manager/pages/:id/content/:content/remove
PUT     /manager/pages/update
GET     /manager/pages/:id/remove
```

## Picks Services
```
GET     /manager/picks
GET     /manager/picks/:id/edit
POST    /manager/picks/:id/edit
GET     /manager/picks/new
POST    /manager/picks/new
GET     /manager/picks/:id/remove
```

## Polls Services
```
GET     /manager/polls
GET     /manager/api/poll/:id
POST    /manager/api/poll
GET     /manager/poll/search
GET     /manager/api/poll/:poll_id/choice/:choice_id
POST    /manager/api/poll/:poll_id/choice
GET     /manager/api/poll
GET     /manager/api/poll/:poll_id/choice
POST    /manager/api/poll/:poll_id/choice_sort
```

## Search Services
```
GET     /manager/search/index
```

## Shows Services
```
GET     /manager/shows
GET     /manager/shows/:id/edit
POST    /manager/shows/:id/edit
GET     /manager/shows/new
POST    /manager/shows/new
GET     /manager/shows/:id/remove
```

## Sliders Services
```
GET     /manager/sliders
GET     /manager/sliders/:id/edit
POST    /manager/sliders/:id/edit
GET     /manager/sliders/new
POST    /manager/sliders/new
GET     /manager/sliders/:id/remove
PUT     /manager/sliders/update
GET     /manager/sliders/:id
PUT     /manager/sliders/:id
PUT     /manager/sliders/:id/slide/:slide
DEL     /manager/sliders/:id/slide/:slide
POST    /manager/sliders/:id/slide
```

## Spotify Services
```
GET     /manager/spotify
GET     /manager/spotify/create
POST    /manager/spotify/create
GET     /manager/spotify/:id/edit
POST    /manager/spotify/:id/edit
```

## Tags Services
```
GET     /manager/tags
GET     /manager/tags/:id/edit
POST    /manager/tags/:id/edit
GET     /manager/tags/new
POST    /manager/tags/create
GET     /manager/tags/:id/remove
GET     /manager/tags/search
```

## Top 40 Services
```
GET     /manager/top40
GET     /manager/top40/counts
GET     /manager/api/round/:id
PUT     /manager/api/round/:id
POST    /manager/api/round
DELETE  /manager/api/round/:id
GET     /manager/api/match/:id
PUT     /manager/api/match/:id
POST    /manager/api/match
DELETE  /manager/api/match/:id
GET     /manager/api/contestant/:id
PUT     /manager/api/contestant/:id
POST    /manager/api/contestant
DELETE  /manager/api/contestant/:id
GET     /manager/api/round
GET     /manager/api/match
GET     /manager/api/contestant
```

## Topics Services
```
GET     /manager/topics
GET     /manager/topics/:id/edit
POST    /manager/topics/:id/edit
GET     /manager/topics/new
POST    /manager/topics/create
GET     /manager/topics/:id/remove
```

## Trending 10 Services
```
GET     /manager/trending-10/twitter-search
GET     /manager/trending-10/:id/content/:content/twitter
POST    /manager/trending-10/:id/content/:content/twitter
GET     /manager/trending-10/:id/content/:content/twitter/:status/remove     
GET     /manager/trending-10
GET     /manager/trending-10/new
POST    /manager/trending-10/new
GET     /manager/trending-10/:id
POST    /manager/trending-10/:id
GET     /manager/trending-10/:id/remove
GET     /manager/trending-10/:id/content
GET     /manager/trending-10/:id/add
PUT     /manager/trending-10/update
POST    /manager/trending-10/:id/content/:content
GET     /manager/trending-10/:id/content/:content/remove
```

## Tweet Central ervices
```
GET     /manager/tweet-central
GET     /manager/tweet-central/:id/edit
POST    /manager/tweet-central/:id/edit
GET     /manager/tweet-central/new
POST    /manager/tweet-central/new
GET     /manager/tweet-central/:id/search
GET     /manager/tweet-central/:id/remove
```

## Users Services
```
GET     /manager/users
GET     /manager/users/export/fb
GET     /manager/users/affiliate
GET     /manager/users/:id/password
POST    /manager/users/:id/password
GET     /manager/users/new
POST    /manager/users/new
```

## Venues Services
```
GET     /manager/venues
POST    /manager/venues/new
GET     /manager/venues/:id
POST    /manager/venues/:id
GET     /manager/venues/:id/remove
```

## Warped Services
```
GET     /manager/warpedroadies
GET     /manager/warpedroadies/:id/edit
POST    /manager/warpedroadies/:id/edit
GET     /manager/warpedroadies/:id/assets
POST    /manager/warpedroadies/:id/assets
GET     /manager/warpedroadies/:id/videos
POST    /manager/warpedroadies/:id/videos
GET     /manager/warpedroadies/new
POST    /manager/warpedroadies/create
GET     /manager/warpedroadies/:id/remove
POST    /manager/warpedroadies/order
```