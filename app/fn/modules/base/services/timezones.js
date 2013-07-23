angular.module('fn.base.services')
    .factory('timezones', function () {
        if (!this.initialized) {
            timezoneJS.timezone.zoneFileBasePath = './fn/lib/timezonejs/tz';
            timezoneJS.timezone.init();
            this.initialized = true;
        }
        return timezoneJS;
    });
