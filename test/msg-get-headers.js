/* global describe,it */
'use strict'
let GetBlocks = require('../lib/get-blocks')
let MsgGetHeaders = require('../lib/msg-get-headers')
let asink = require('asink')
let should = require('chai').should()

describe('MsgGetHeaders', function () {
  let hashBuf = new Buffer(32)
  hashBuf.fill(0)
  let hashes = [hashBuf]
  let getblocks = new GetBlocks().fromHashes(hashes)

  it('should exist', function () {
    should.exist(MsgGetHeaders)
    should.exist(new MsgGetHeaders())
  })

  describe('#fromGetBlocks', function () {
    it('should convert from getblocks', function () {
      let msggetblocks = new MsgGetHeaders().fromGetBlocks(getblocks)
      msggetblocks.dataBuf.length.should.equal(4 + 1 + 0 + 32)
    })
  })

  describe('#asyncFromGetBlocks', function () {
    it('should convert from getblocks', function () {
      return asink(function * () {
        let msggetblocks = yield new MsgGetHeaders().asyncFromGetBlocks(getblocks)
        msggetblocks.dataBuf.length.should.equal(4 + 1 + 0 + 32)
      }, this)
    })
  })

  describe('#fromHashes', function () {
    it('should convert from hashes', function () {
      let msggetblocks = new MsgGetHeaders().fromHashes(hashes)
      msggetblocks.dataBuf.length.should.equal(4 + 1 + 0 + 32)
    })
  })

  describe('#asyncFromHashes', function () {
    it('should convert from hashes', function () {
      return asink(function * () {
        let msggetblocks = yield new MsgGetHeaders().asyncFromHashes(hashes)
        msggetblocks.dataBuf.length.should.equal(4 + 1 + 0 + 32)
      }, this)
    })
  })

  describe('#toGetBlocks', function () {
    it('should return getblocks', function () {
      let msggetblocks = new MsgGetHeaders().fromHashes(hashes)
      let getblocks2 = msggetblocks.toGetBlocks()
      getblocks2.toHex().should.equal(getblocks2.toHex())
    })
  })

  describe('#toHashes', function () {
    it('should return getblocks', function () {
      let msggetblocks = new MsgGetHeaders().fromHashes(hashes)
      let hashes2 = msggetblocks.toHashes()
      hashes2.length.should.equal(1)
    })
  })

  describe('#isValid', function () {
    it('should know this is a valid getheaders msg', function () {
      let msggetblocks = new MsgGetHeaders().fromHashes(hashes)
      msggetblocks.getCmd().should.equal('getheaders')
      msggetblocks.isValid().should.equal(true)
    })
  })
})
