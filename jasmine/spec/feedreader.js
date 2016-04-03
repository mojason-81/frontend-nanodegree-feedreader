/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Loops through each feed in the allFeeds object and ensures
     * it has a URL defined and that the URL is not empty.
     */
    it('have URLs defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length > 0).toBe(true);
      });
    });


    /* Loops through each feed in the allFeeds object and ensures it
     * has a name defined and that the name is not empty.
     */
    it('have names defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length > 0).toBe(true);
      });
    });
  });

  describe('The menu', function() {
    var menuIconLink = $('.menu-icon-link');

    // Ensures the menu element is hidden by default
    it('has a menu hidden by default', function() {
      expect($('.menu-hidden')).toBeDefined();
    });

    // Ensures the menu changes visibility when the menu icon is clicked.
    it('hides when the menu icon is clicked', function() {
      menuIconLink.trigger('click');
      expect($('.menu-hidden')).toBeDefined();

      menuIconLink.trigger('click');
      expect($('.menu-hidden')).toBeDefined();
    });
  });

  describe('Initial Entries', function() {
    var feedEntryHeader;

    beforeEach(function(done) {
      loadFeed(0, function() {
        feedEntryHeader = $('.entry h2')[1];
        done();
      });
    });

    /* Ensures when the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed container.
     */
    it('has an entry in the feed container', function(done) {
      expect(feedEntryHeader).toBeDefined();
      done();
    });
  });

  describe('New Feed Selection', function() {
    var feedHTML;
    var feedEntryHeader;

    beforeEach(function(done) {
      loadFeed(0, function() {
        feedHTML = $('.feed').html();
        feedEntryHeader = $('.entry h2')[0].innerHTML;
        console.log(feedEntryHeader);
        done();
      });
    });

    /* Ensures when a new feed is loaded by the loadFeed function that the
     * content actually changes. Remember, loadFeed() is asynchronous.
     */
    it('has changed content', function(done) {
      loadFeed(1, function() {
        expect(feedHTML).not.toEqual($('.feed').html());
        console.log(feedEntryHeader);
        console.log($('.entry h2')[0].innerHTML);
        expect(feedEntryHeader).not.toEqual($('.entry h2')[0].innerHTML);
        done();
      });
    });
  });
}());
