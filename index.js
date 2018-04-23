// Version 1.24 r:02

const Command = require('command')
const config = require('./config.json')

const GHILLIEGLADE = { x: 52232, y: 117318, z: 4388 }

// credit : https://github.com/Some-AV-Popo
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }

module.exports = function RedirectGg(d) {
	const command = Command(d)

	let enable = config.enable

	let	myZone = 0

	// code
	d.hook('S_LOAD_TOPO', (e) => { myZone = e.zone })

	d.hook('S_SPAWN_ME', (e) => {
		if (!enable) return
		// Ghillieglade dungeon
		if (myZone === 9713) {
			Object.assign(e.loc, GHILLIEGLADE)
			return true
		} 
		// auto-reset at Velik's Sanctuary
		else if (myZone === 9714) {
			d.toServer('C_RESET_ALL_DUNGEON', {})
		}
	})

	// command
	// toggle
	command.add(['gg', 'ㄱㄹ'], () => {
		enable = !enable
		send(`${enable ? 'Enabled'.clr('56B4E9') : 'Disabled'.clr('E69F00')}`)
	})
	function send(msg) { command.message(`[redirect-gg] : ` + msg) }

}