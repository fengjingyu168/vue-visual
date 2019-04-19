'use strict'

process.env.NODE_PATH = __dirname + '/node_modules/'

const envFile = __dirname + '/ENV.js'
const fs = require('fs')
const path = require('path')
const program = require('commander')
const warningLine = '//[warning!] This file was generated automatically， please do not change anything!\n'
const creatEnvFile = (env) => {
	fs.writeFile(envFile, new Buffer(warningLine + 'module.exports = "' + env + '"\n'), (err) => {
		if (err) {
			console.error(err)
			return
		 }
	})
}

program
	.version(require('./package').version)

program
	.usage('<command>')

program
  .command('local')
  .description('Using local environment...')
  .alias('d')
  .action(() => {
    creatEnvFile('local')
  })

program
	.command('development')
	.description('Using development environment...')
	.alias('d')
	.action(() => {
		creatEnvFile('development')
	})

program
	.command('production')
	.description('Using production environment...')
	.alias('p')
	.action(() => {
		creatEnvFile('production')
	})

program
	.command('testing')
	.description('Using testing environment...')
	.alias('t')
	.action(() => {
		creatEnvFile('testing')
	})

program
  .command('sit')
  .description('Using sit environment...')
  .alias('t')
  .action(() => {
    creatEnvFile('sit')
  })


program
	.command('APP_Test')
	.description('Using APP environment...')
	.alias('at')
	.action(() => {
		creatEnvFile('APP_Test')
	})

program
	.command('APP_Prod')
	.description('Using APP environment...')
	.alias('ap')
	.action(() => {
		creatEnvFile('APP_Prod')
	})

program.parse(process.argv)

if(!program.args.length){
  program.help()
}
