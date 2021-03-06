import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {

  let fetchedStub;
  let promise;

  beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach( () => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?query=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?query=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?query=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });

  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=artist');

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Muse&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=album');

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Muse&type=album')
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=track');

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Muse&type=track')
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const playlists = searchPlaylists('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=playlist');

      const playlists2 = searchPlaylists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?query=Muse&type=playlist')
    });
  });

});
