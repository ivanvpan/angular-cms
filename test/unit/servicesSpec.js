'use strict';

/* jasmine specs for services go here */

describe('fn.login.services.auth', function() {
    beforeEach(module('fn.login.services.auth'));

    describe('RetryQueue', function() {
        it('should not be undefined', inject(function(RetryQueue) {
            expect(RetryQueue).not.toBeUndefined();
        }));

        it('should be empty', inject(function(RetryQueue) {
            expect(RetryQueue.hasMore()).toBe(false);
        }));

        it('should not be empty after inserting an item', inject(function(RetryQueue) {
            RetryQueue.enqueue({});
            expect(RetryQueue.hasMore()).toBe(true);
        }));
    });
});
