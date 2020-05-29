const users = [];


const addUser = ({ socket_instance_id, name, roomId}) => {

  console.log({name});
  name = name.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  const existingUser = users.find((user) => user.roomId === roomId && user.name === name);
  if(existingUser) {
    return { error: 'Username is taken'};
  }

  const user = { socket_instance_id, name, roomId };
  users.push(user);
  return { user }
}



const deleteUser = (socket_instance_id) => {
  const index = users.findIndex((user) => user.socket_instance_id === socket_instance_id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}



const getUser = (socket_instance_id) => {
  return users.find((user) => user.socket_instance_id === socket_instance_id);
}



const getRoomUsers = (roomId) => {
  return users.filter((user) => user.roomId === roomId)
}


module.exports = { addUser, deleteUser, getUser, getRoomUsers};
