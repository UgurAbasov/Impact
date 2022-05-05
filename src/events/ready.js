module.exports = {
    name: 'ready',
    once: 'true',
    execute(client) { 
        client.user.setStatus('idle');
        console.log('| ———————————————————————————————— |');
        console.log('| Impact succeful connected        |');
        console.log('| ———————————————————————————————— |');
}
}