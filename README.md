# socket.io-utils
socket.io-utils adds functions to the main Socket.io object in order to ease common operations. It was inspired by my annoyance during a hackathon when dealing with room specific operations.

### Installation
```
$ npm install socket.io-utils
```

### Usage
##### Initialization
socket.io-utils can be flexibly incorporated into any project. It was designed to not interfer with any pre-existing usage of Socket.io to allow painless incorportation at any stage of development.

To use socket.io-utils with a prexisting Socket.io usage, just pass in the io object to the socket.io-utils initialization.  
```
var io = require('socket.io');
require('socket.io-utils')(io);
```

Alternatively, you can do it this way.  
```
var io = require('socket.io-utils')(require('socket.io')());
```

These options are useful if you want to control which version of Socket.io you're using. However, you can also simply require socket.io-utils and the lastest version of Socket.io will be utilized.  
```
var io = require('socket.io-utils');
```

##### Function Usage
Incorporating socket.io-utils adds functions to the io object by sticking them onto a utils property of it.

To call a socket.io-utils function, the format is:  
```
io.utils.*functionName*();
```

##### Functions
**getRoomData(roomName:string, propName:string)**  
Returns the value of the @propName property in the @roomName room.

**setRoomData(roomName:string, propName:string, propValue:value)**  
Sets the @propName property with @propValue in the @roomName room.

**delRoomData(roomName:string, propName:string)**  
Deletes the @propName property from the @roomName room.

**getAllRoomData(roomName:string)**  
Returns all of the data in the @roomName room.

**setAllRoomData(roomName:string, roomData:object)**  
Adds all of the data in the @roomData object to the @roomName room.

**delAllRomData(roomName:string)**  
Removes all custom data from the @roomName room.

**getSocketsInRoom(roomName:string)**  
Returns an object containing all of the sockets in the @roomName room.

**getRooms()**  
Returns an object containing all of the current rooms.

### Loading Custom Functions
If you have your own functions you'd like to use, you can load them into socket.io-utils and they'll also be attached to the utils property. This is done during initialization.

```
var io = require('socket.io-utils')(null, customFunctions);
```

Acceptable inputs as custom functions are either an array of functions or an object with function properties. 

###### Array Example
When using a function array, you have to be sure to define the functions with a name.  
```
var customFunctions = [foo = function foo(){}];  
var io = require('socket.io-utils')(null, customFunctions);
```
###### Object Example
Passing in an object is much cleaner and should be the prefered method.
```
var customFunctions = {
    foo: function(){};
}
var io = require('socket.io-utils')(null, customFunctions);
```