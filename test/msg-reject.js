/* global describe,it */
'use strict'
let Reject = require('../lib/reject')
let MsgReject = require('../lib/msg-reject')
let VarInt = require('../lib/var-int')
let asink = require('asink')
let should = require('chai').should()

describe('MsgReject', function () {
  it('should exist', function () {
    should.exist(MsgReject)
    should.exist(new MsgReject())
  })

  describe('#fromReject', function () {
    it('should convert from a reject', function () {
      let reject = new Reject().fromObject({
        typeVi: new VarInt().fromNumber(2),
        typeStr: 'tx',
        codeNum: 1,
        reasonVi: new VarInt().fromNumber(2),
        reasonStr: 'hi',
        extraBuf: new Buffer(0)
      })
      let msgreject = new MsgReject().fromReject(reject)
      Buffer.compare(msgreject.dataBuf, reject.toBuffer()).should.equal(0)
    })
  })

  describe('@fromReject', function () {
    it('should convert from a reject', function () {
      let reject = new Reject().fromObject({
        typeVi: new VarInt().fromNumber(2),
        typeStr: 'tx',
        codeNum: 1,
        reasonVi: new VarInt().fromNumber(2),
        reasonStr: 'hi',
        extraBuf: new Buffer(0)
      })
      let msgreject = MsgReject.fromReject(reject)
      Buffer.compare(msgreject.dataBuf, reject.toBuffer()).should.equal(0)
    })
  })

  describe('#asyncFromReject', function () {
    it('should convert from a reject', function () {
      return asink(function * () {
        let reject = new Reject().fromObject({
          typeVi: new VarInt().fromNumber(2),
          typeStr: 'tx',
          codeNum: 1,
          reasonVi: new VarInt().fromNumber(2),
          reasonStr: 'hi',
          extraBuf: new Buffer(0)
        })
        let msgreject = yield new MsgReject().asyncFromReject(reject)
        Buffer.compare(msgreject.dataBuf, reject.toBuffer()).should.equal(0)
      }, this)
    })
  })

  describe('@asyncFromReject', function () {
    it('should convert from a reject', function () {
      return asink(function * () {
        let reject = new Reject().fromObject({
          typeVi: new VarInt().fromNumber(2),
          typeStr: 'tx',
          codeNum: 1,
          reasonVi: new VarInt().fromNumber(2),
          reasonStr: 'hi',
          extraBuf: new Buffer(0)
        })
        let msgreject = yield MsgReject.asyncFromReject(reject)
        Buffer.compare(msgreject.dataBuf, reject.toBuffer()).should.equal(0)
      }, this)
    })
  })

  describe('#toReject', function () {
    it('should convert to a reject', function () {
      return asink(function * () {
        let reject = new Reject().fromObject({
          typeVi: new VarInt().fromNumber(2),
          typeStr: 'tx',
          codeNum: 1,
          reasonVi: new VarInt().fromNumber(2),
          reasonStr: 'hi',
          extraBuf: new Buffer(0)
        })
        let reject2 = new MsgReject().fromReject(reject).toReject()
        Buffer.compare(reject2.toBuffer(), reject.toBuffer()).should.equal(0)
      }, this)
    })
  })

  describe('#isValid', function () {
    it('should know this is a valid msgreject', function () {
      let reject = new Reject().fromObject({
        typeVi: new VarInt().fromNumber(2),
        typeStr: 'tx',
        codeNum: 1,
        reasonVi: new VarInt().fromNumber(2),
        reasonStr: 'hi',
        extraBuf: new Buffer(0)
      })
      let msgreject = new MsgReject().fromReject(reject)
      msgreject.isValid().should.equal(true)
    })
  })
})
