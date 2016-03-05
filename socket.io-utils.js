module.exports = function(newIo, customFunctions){
    //Allows using socket.io-utils with or without previously requiring socket.io
    var io = (newIo) ? newIo : require('socket.io')();
    //Todo: add readme
    io.utils = {
        /**
         * Returns the value of the @propName property in the @roomName room.
         * @param {string} roomName: The name of the room to look in.
         * @param {string} propName: The name of the property to retrieve.
         * @returns {value} io.sockets.adapter.rooms[@roomName][@propName]
         */
        getRoomData: function(roomName, propName){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: getRoomData: No roomName specified.');
            if(propName === undefined) throw new ReferenceError('socket.io-utils: getRoomData: No propName specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: getRoomData: The inputted roomName is not a string.');
            if(typeof propName !== 'string') throw new TypeError('socket.io-utils: getRoomData: The inputted propName is not a string.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: getRoomData: No room found with inputted name');
            return io.sockets.adapter.rooms[roomName][propName];
        },

        /**
         * Sets the @propName property with @propValue in the @roomName room.
         * @param {string} roomName: The name of the room to look in.
         * @param {string} propName: The name of the property to set.
         * @param {value} propValue: The value of the property to set. Can be any value.
         */
        setRoomData: function(roomName, propName, propValue){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: setRoomData: No roomName specified.');
            if(propName === undefined) throw new ReferenceError('socket.io-utils: setRoomData: No propName specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: setRoomData: The inputted roomName is not a string.');
            if(typeof propName !== 'string') throw new TypeError('socket.io-utils: setRoomData: The inputted propName is not a string.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: setRoomData: No room found with inputted name');
            io.sockets.adapter.rooms[roomName][propName] = propValue;
        },

        /**
         * Deletes the @propName property from the @roomName room.
         * @param {string} roomName: The name of the room to look in.
         * @param {string} propName: The name of the property to remove.
         */
        delRoomData: function(roomName, propName){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: delRoomData: No roomName specified.');
            if(propName === undefined) throw new ReferenceError('socket.io-utils: delRoomData: No propName specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: delRoomData: The inputted roomName is not a string.');
            if(typeof propName !== 'string') throw new TypeError('socket.io-utils: delRoomData: The inputted propName is not a string.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: delRoomData: No room found with inputted name');
            delete io.sockets.adapter.rooms[roomName][propName];
        },

        /**
         * Returns all of the data in the @roomName room.
         * @param {string} roomName: The name of the room to look in.
         * @returns {object} io.sockets.adapter.rooms[@roomName]
         */
        getAllRoomData: function(roomName){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: getAllRoomData: No roomName specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: getAllRoomData: The inputted roomName is not a string.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: getAllRoomData: No room found with inputted name');
            return io.sockets.adapter.rooms[roomName];
        },

        /**
         * Adds all of the data in the @roomData object to the @roomName room.
         * @param {string} roomName: The name of the room to set the data in.
         * @param {object} roomData: The data to set in the @roomName room.
         */
        setAllRoomData: function(roomName, roomData){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: setAllRoomData: No roomName specified.');
            if(roomData === undefined) throw new ReferenceError('socket.io-utils: setAllRoomData: No roomData specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: setAllRoomData: The inputted roomName is not a string.');
            if(typeof roomData !== 'object') throw new TypeError('socket.io-utils: setAllRoomData: The inputted roomData is not an object.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: setAllRoomData: No room found with inputted name');
            for(var key in roomData){
                io.sockets.adapter.rooms[roomName][key] = roomData[key];
            }
        },

        /**
         * Removes all custom data from the @roomName room.
         * Custom data means anything except the 'sockets', 'length', 'add', and 'del' properties.
         * @param {string} roomName: The name of the room to remove all custom data in.
         */
        delAllRoomData: function(roomName){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: delAllRoomData: No roomName specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: delAllRoomData: The inputted roomName is not a string.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: delAllRoomData: No room found with inputted name');
            for(var key in io.sockets.adapter.rooms[roomName]){
                if(key !== 'sockets' && key !== 'length' && key !== 'add' && key !== 'del'){
                    delete io.sockets.adapter.rooms[roomName][key];
                }
            }
        },

        /**
         * Returns an object containing all of the sockets in the @roomName room.
         * @param {string} roomName: The name of the room to get the current sockets in.
         * @returns {object} io.sockets.adapter.rooms
         */
        getSocketsInRoom: function(roomName){
            if(roomName === undefined) throw new ReferenceError('socket.io-utils: getSocketsInRoom: No roomName specified.');
            if(typeof roomName !== 'string') throw new TypeError('socket.io-utils: getSocketsInRoom: The inputted roomName is not a string.');
            if(io.sockets.adapter.rooms[roomName] === undefined) throw new ReferenceError('socket.io-utils: getSocketsInRoom: No room found with inputted name');
            return io.sockets.adapter.rooms[roomName].sockets;
        },
        getRooms: function(){
            return io.sockets.adapter.rooms;
        }
    };

    //Handles the adding of user defined functions to io.utils
    if(customFunctions){
        if(Array.isArray(customFunctions) === true){
            for(var i = 0; i < customFunctions.length; i++){
                if(typeof customFunctions[i] !== 'function') throw new TypeError('socket.io-utils: Initialization: Passed in object is not a function.');
                if(!customFunctions[i].name) throw new Error('Function has no name.');
                io.utils[customFunctions[i].name] = customFunctions[i];
            }
        } else if(typeof customFunctions === 'object') {
            for(var key in customFunctions){
                if(typeof customFunctions[key] !== 'function') throw new TypeError('socket.io-utils: Initialization: Passed in object is not a function.');
                io.utils[key] = customFunctions[key];
            }
        } else{
            throw new TypeError('socket.io-utils: Initialization: The inputted customFunctions object is not an array or object.');
        }
    }

    return io;
}