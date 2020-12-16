var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.upgrader && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrader = false;
	    }
	    if(!creep.memory.upgrader && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrader = true;
	    }

	    if(creep.memory.upgrader) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
               if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                 } 
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
           if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleUpgrader;