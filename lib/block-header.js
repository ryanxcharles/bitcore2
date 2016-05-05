/**
 * Block Header
 * ============
 *
 * Every block contains a blockHeader. This is probably not something you will
 * personally use, but it's here if you need it.
 */
'use strict'
let dependencies = {
  Bw: require('./bw'),
  Struct: require('./struct')
}

let inject = function (deps) {
  let Bw = deps.Bw
  let Struct = deps.Struct

  class BlockHeader extends Struct {
    constructor (version, prevBlockHashBuf, merklerootbuf, time, bits, nonce) {
      super()
      this.fromObject({version, prevBlockHashBuf, merklerootbuf, time, bits, nonce})
    }

    fromJson (json) {
      this.fromObject({
        version: json.version,
        prevBlockHashBuf: new Buffer(json.prevBlockHashBuf, 'hex'),
        merklerootbuf: new Buffer(json.merklerootbuf, 'hex'),
        time: json.time,
        bits: json.bits,
        nonce: json.nonce
      })
      return this
    }

    toJson () {
      return {
        version: this.version,
        prevBlockHashBuf: this.prevBlockHashBuf.toString('hex'),
        merklerootbuf: this.merklerootbuf.toString('hex'),
        time: this.time,
        bits: this.bits,
        nonce: this.nonce
      }
    }

    fromBr (br) {
      this.version = br.readUInt32LE()
      this.prevBlockHashBuf = br.read(32)
      this.merklerootbuf = br.read(32)
      this.time = br.readUInt32LE()
      this.bits = br.readUInt32LE()
      this.nonce = br.readUInt32LE()
      return this
    }

    toBw (bw) {
      if (!bw) {
        bw = new Bw()
      }
      bw.writeUInt32LE(this.version)
      bw.write(this.prevBlockHashBuf)
      bw.write(this.merklerootbuf)
      bw.writeUInt32LE(this.time)
      bw.writeUInt32LE(this.bits)
      bw.writeUInt32LE(this.nonce)
      return bw
    }
  }

  return BlockHeader
}

inject = require('injecter')(inject, dependencies)
let BlockHeader = inject()
module.exports = BlockHeader