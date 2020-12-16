var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == '挖矿');
    console.log('挖矿: ' + harvesters.length);

    if(harvesters.length < 4) {
        var newName = '挖矿' + Game.time;
        console.log('Spawning new 挖矿: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: '挖矿'}});        
    }
     var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == '升级');
    console.log('升级: ' + harvesters.length);

    if(harvesters.length < 4) {
        var newName = '升级' + Game.time;
        console.log('Spawning new 升级: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: '升级'}});        
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == '建筑');
    console.log('建筑: ' + harvesters.length);

    if(harvesters.length < 3) {
        var newName = '建筑' + Game.time;
        console.log('Spawning new 建筑: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: '建筑'}});        
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }        

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == '挖矿') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == '升级') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == '建筑') {
            roleBuilder.run(creep);
        }
    }
}