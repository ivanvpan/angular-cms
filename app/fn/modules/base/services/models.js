angular.module('fn.base.services')
    .factory('UserCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/user', {}, {
            list: {
                method: 'GET',
                params: {}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('UserItem', ['$resource', function ($resource) {
        return $resource('/manager/api/user/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('PageCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/page', {}, {
            list: {
                method: 'GET',
                params: {limit:15}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('PageItem', ['$resource', function ($resource) {
        return $resource('/manager/api/page/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('EventCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/event', {}, {
            list: {
                method: 'GET',
                params: {limit:15}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('EventItem', ['$resource', function ($resource) {
        return $resource('/manager/api/event/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ContentCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/page/:page_id/content', {}, {
            list: {
                method: 'GET',
                params: {
                    limit: 1000
                }
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('ContentSort', ['$resource', function ($resource) {
        return $resource('/manager/api/page/:page_id/content/sort', {}, {
            read: {
                method: 'GET',
                params: {}
            },
            update: {
                method: 'PUT',
                params: {}
            }
        });
    }])
    .factory('ContentItem', ['$resource', function ($resource) {
        return $resource('/manager/api/page/:page_id/content/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('TagCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/tag', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), {endpoint:'/manager/api/tag'});
    }])
    .factory('TagItem', ['$resource', function ($resource) {
        return $resource('/manager/api/tag/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });   
    }])
    .factory('AssetCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/asset', {}, {
            list: {
                method: 'GET',
                params: {limit:24}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('AssetItem', ['$resource', function ($resource) {
        return $resource('/manager/api/asset/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('TopicCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/topic', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('TopicItem', ['$resource', function ($resource) {
        return $resource('/manager/api/topic/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ContributorCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/contributor', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), {endpoint:'/manager/api/contributor'});
    }])
    .factory('ContributorItem', ['$resource', function ($resource) {
        return $resource('/manager/api/contributor/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ShowCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/show', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), {endpoint:'/manager/api/show'});
    }])
    .factory('ShowItem', ['$resource', function ($resource) {
        return $resource('/manager/api/show/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('EpisodeCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/episode', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('EpisodeItem', ['$resource', function ($resource) {
        return $resource('/manager/api/episode/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('SpotifyCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/spotify', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('SpotifyItem', ['$resource', function ($resource) {
        return $resource('/manager/api/spotify/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('VenueCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/venue', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('VenueItem', ['$resource', function ($resource) {
        return $resource('/manager/api/venue/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('FestivalCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/festival', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('FestivalItem', ['$resource', function ($resource) {
        return $resource('/manager/api/festival/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('EventCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/event', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('EventItem', ['$resource', function ($resource) {
        return $resource('/manager/api/event/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('PollCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/poll', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/poll' } );
    }])
    .factory('PollItem', ['$resource', function ($resource) {
        return $resource('/manager/api/poll/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('PollChoice', ['$resource', function ($resource) {
        return $resource('/manager/api/poll/:poll_id/choices/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('PollChoiceSort', ['$resource', function ($resource) {
        return $resource('/manager/api/poll/:poll_id/choices/sort', {}, {
            read: {
                method: 'GET',
                params: {}
            },
            update: {
                method: 'PUT',
                params: {}
            }
        });
    }])
    .factory('TickerCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/ticker', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('TickerItem', ['$resource', function ($resource) {
        return $resource('/manager/api/ticker/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('FrameBucketCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/framebucket', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/framebucket' });
    }])
    .factory('SliderCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/slider', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('SliderItem', ['$resource', function ($resource) {
        return $resource('/manager/api/slider/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('Trending10Collection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/trending10', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('Trending10Item', ['$resource', function ($resource) {
        return $resource('/manager/api/trending10/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('Trending10ContentItem', ['$resource', function ($resource) {
        return $resource('/manager/api/trending10/:trending10_id/content/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('Trending10ContentItemSort', ['$resource', function ($resource) {
        return $resource('/manager/api/trending10/:trending10_id/content/sort', {}, {
            read: {
                method: 'GET',
                params: {}
            },
            update: {
                method: 'PUT',
                params: {}
            }
        });
    }])
    .factory('ListCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/contentcollection', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    }])
    .factory('ListItem', ['$resource', function ($resource) {
        return $resource('/manager/api/contentcollection/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ListContentItem', ['$resource', function ($resource) {
        return $resource('/manager/api/contentcollection/:list_id/content/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ListContentItemSort', ['$resource', function ($resource) {
        return $resource('/manager/api/contentcollection/:list_id/content/sort', {}, {
            read: {
                method: 'GET',
                params: {}
            },
            update: {
                method: 'PUT',
                params: {}
            }
        });
    }])
    .factory('ContestCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/contest', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/contest' });
    }])
    .factory('ContestItem', ['$resource', function ($resource) {
        return $resource('/manager/api/contest/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ContestEntryCollection', ['$resource', function ($resource) {
        return $resource('/manager/api/contestentry', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }])
    .factory('QuizCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/quiz', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/quiz' });
    }])
    .factory('QuizItem', ['$resource', function ($resource) {
        return $resource('/manager/api/quiz/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('FrameBucketCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/framebucket', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/framebucket' });
    }])
    .factory('FrameBucketItem', ['$resource', function ($resource) {
        return $resource('/manager/api/framebucket/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('FrameItemCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/frameitem', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/framebucket' });
    }])
    .factory('FrameItemItem', ['$resource', function ($resource) {
        return $resource('/manager/api/frameitem/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('FrameNotificationCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/framenotification', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/framebucket' });
    }])
    .factory('FrameNotificationItem', ['$resource', function ($resource) {
        return $resource('/manager/api/framenotification/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])
    .factory('ArtistCollection', ['$resource', function ($resource) {
        return _.extend($resource('/manager/api/artist', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }), { endpoint: '/manager/api/artist' });
    }])
    .factory('ArtistItem', ['$resource', function ($resource) {
        return $resource('/manager/api/artist/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    }])

    .factory('QuizCollection', function ($resource) {
        return _.extend($resource('/manager/api/quiz', {}, {
            list: {
                method: 'GET',
                params: {limit:20}
            },
            create: {
                method: 'POST',
                params: {}
            }
        }));
    })
    .factory('QuizItem', function ($resource) {
        return $resource('/manager/api/quiz/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    })
    .factory('QuizResultItem', function ($resource) {
        return $resource('/manager/api/quiz/:quiz_id/results/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    })
    .factory('QuizResultSort', function ($resource) {
        return $resource('/manager/api/quiz/:quiz_id/results/sort', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    })
    .factory('QuizQuestionItem', function ($resource) {
        return $resource('/manager/api/quizquestion/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    })
    .factory('QuizQuestionSort', function ($resource) {
        return $resource('/manager/api/quiz/:quiz_id/questions/sort', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    })
    .factory('QuizAnswerItem', function ($resource) {
        return $resource('/manager/api/quizquestion/:question_id/answers/:id', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    })
    .factory('QuizAnswerSort', function ($resource) {
        return $resource('/manager/api/quizquestion/:question_id/answers/sort', {}, {
            update: {
                method: 'PUT',
                params: {}
            },
            read: {
                method: 'GET',
                params: {}
            }
        });
    });
