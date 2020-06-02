import { generateNotification, generateMessage } from './messages';
import helperMethods from '../utils/helpers';


const sendPersonalSms = async (socket_id, user_uuid, message, io) => {
  try {
    await io.to(socket_id).emit('message', generateNotification(user_uuid, message));
    // await io.emit('jobNotification', generateNotification(job_uuid, message));// this is for test
  } catch (error) {
    console.log(error);
  }
};

const joinGroup = async (group_id, user, socket, io) => {
  await helperMethods.createGroupMember({ group_id, user });
  // await socket.join(group_id, () => { console.log(client.rooms)});
  // await io.in(group_id).emit('message', generateMessage('Admin', `Welcome to the group ${user.name}`));
};

const sendMessageToGroup = async (group_id, message, user, io, parent_uuid ="") => {
  try {
    await helperMethods.saveGroupChat(group_id, user.uuid, parent_uuid, message, user.name );
    await io.in(group_id).emit('message', generateMessage(user.name, message));
  } catch (error) {
    console.log(error);
  }
}


/**
 *
 * @param {data} senderuuid id from the senders payload
 * @param {data} recipientuuid id of the recipient
 * @param {text} message message body from the sender
 * @param {token} client socket id of the sender which will be used to emit error messages back to sender.
 */
const sendPrivateMessage = async (senderuuid, recipientuuid, message, client) => {
  try {
    const user = await getUser(recipientuuid);
    if (!user) {
      console.log('User not found')
      await io.to(client).emit('error', generateMessage('Error', 'User not found or available'));
      return;
    };
    const sender = await getUser(senderuuid);
    if (!sender) {
      console.log('User not found')
      await io.to(client).emit('error', generateMessage('Error', "You don't have enough access. Please login to send messages"));
      return;
    };
    await io.to(user.token.socket_id).emit('personalMessage', generateMessage(sender.name, message));
    await savePrivateChat(senderuuid, recipientuuid, message);
  } catch (error) {
    console.log(error);
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sendPersonalSms,
  joinGroup,
  sendMessageToGroup,
  sendPrivateMessage
};