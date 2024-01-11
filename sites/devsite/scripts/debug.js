#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { spawn } = require('child_process')
const colors = require('colors')
const numeral = require('numeral')
const pidusage = require('pidusage')
const psTree = require('ps-tree')

let MAXMEM = 0
let MAXCPU = 0

function getChildren(pid, callback) {
  psTree(pid, (err, children) => {
    if (err) {
      callback(err)
    } else {
      callback(
        null,
        children.map((p) => parseInt(p.PID))
      )
    }
  })
}

function logUsage(pid) {
  pidusage(pid, (err, stats) => {
    if (err) {
      console.error(err)
    } else {
      let shouldPrint = false
      if (stats.memory > MAXMEM) {
        shouldPrint = true
        MAXMEM = stats.memory
      }
      if (stats.cpu > MAXCPU) {
        shouldPrint = true
        MAXCPU = stats.cpu
      }
      if (shouldPrint) {
        console.log(colors.green(`PID ${pid} - CPU: ${MAXCPU.toFixed(0)}%, Memory: ${numeral(MAXMEM).format('0.0 b')}`))
      }
    }
  })
}

/**
 * This script is used to debug memory leaks in Gatsby.
 */
function runDebugger() {
  console.log('Running Gatsby with debugger')
  const childproc = spawn('../../node_modules/.bin/gatsby', ['serve', '--verbose'], {
    shell: true,
  })

  childproc.stdout.on('data', (data) => {
    process.stdout.write(data)
  })

  childproc.stderr.on('data', (data) => {
    process.stderr.write(data)
  })

  childproc.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    process.exit(code)
  })

  setInterval(() => {
    getChildren(childproc.pid, (err, children) => {
      if (err) {
        console.error(err)
      } else {
        logUsage(childproc.pid)
        children.forEach(logUsage)
      }
    })
  }, 1000) // update every second
}

runDebugger()
