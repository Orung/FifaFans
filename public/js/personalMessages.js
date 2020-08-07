const myUuid = localStorage.getItem('my_uuid');

 function loadMessage (friend_uuid) {
    try {
        localStorage.setItem('friend_data', friend_uuid);
        getFriendMessageData(friend_uuid);
    } catch (error) {
        console.log(error);
    }
}

function mapMessageList(data) {
    const mappedData = data.map((x) => {
      if(localStorage.getItem('my_uuid') === x.user_uuid) {
        x.Profile = { ...x.follower, ...x.FollowerProfile}
        return x;
      } else if (localStorage.getItem('my_uuid') === x.follower_uuid ) {
        x.Profile = { ...x.User, ...x.UserProfile}
        return x;
      }
    })
    return mappedData;
  }


const createAMessagedFriend = (data) => {
    let elArray = [];
    if (data.length !== 0) {
        data.forEach(element =>  {
          const el = `<div class="d-flex bg-bd mt-3" onclick="loadMessage('${element['Profile'].user_uuid}')">
                         <div class="p-2 comment-img text-center mr-2"> 
                            <img src="${element["Profile"].profile_pic || "img/4.jpg"}" class="wd-sz" alt="">
                         </div>
                         <div class="p-2 comments-content"> 
                            <h5>${element["Profile"].name}</h5>
                            <p><span class="fan-fn"> ${
                                element["Profile"].club
                              } </span><span class="fan-fn"> (${element["Profile"].status})</span></p>
                        </div>
                     </div>`;
          elArray.push(el);
        })
        return elArray
    } else {
        return `<div>No data available</div>`
    }
  }

const inflateMessage = (chats) => {
    if ( chats.length !== 0) {
        let x = []
        let el;
        chats.forEach(chat => {
          if ( chat.sender_uuid === localStorage.getItem('friend_data')) {
              el = ` <div class="comment-bot spacing">
                        <div class="owner-text">
                            <p> ${chat.message} </p>
                        </div>
                    </div>`
                    x.push(el)
            } else {
                el = ` <div class="comment-bot spacing">
                            <div class="sender-text">
                                <p> ${chat.message} </p>
                            </div>
                        </div>`
                        x.push(el)
             }
        });
        return x;
    } else {
        return `<div></div>`
    }
}

const createChatBox = (data) => {
    const messageLayout = document.getElementById('message-layout');
    let html = `
      <div class="pd-15 pb-0">
          <div class="d-flex justify-content-start ">
              <div class="comment-img mr-2">
                  <img src="${
                    data["profile"].profile_pic || "img/4.jpg"
                  }" class="img-prof">
              </div>
              <div class="tap-cont-profile pd-3-12 ">
                  <h5 class="font-16 d-flex chat-layout">${data["user"].name}</h5>
              </div>
          </div>
      </div>
      <div class="line-bd"></div>
      <div class="scrollable-text" id="chat_list">
         ${inflateMessage(data.chats)}
      </div>
      <div class="line-bd"></div>
    <div class="d-flex  pd-15 justify-content-start">
        <div class="pd-pos">
            <a href="#"><i class="fa fa-image"></i></a>
        </div>
        <div class="pd-pos">
            <a href="#"><i class="fa fa-paperclip"></i></a>
        </div>
        <form class="form-inline my-2"></form>
        <div class=" green-border-focus w-100">
            <input type="search" placeholder="Type..." aria-label="Search"
                class="form-control post-input bd-r-50 w-100" id="personal-text">
        </div>

        <p class="fa fa-1.5x fa-send  border-none pd-pos send-item-message room-send" onclick="(sendPersonalMessage('${myUuid}&${data["user"].uuid}'))"</p>
        </div>`;
   messageLayout.innerHTML = html;
}





const getFriendMessageData  = (uuid) => {
    options.method = 'GET';
    fetch(`${base}list-friend-message?follower_uuid=${uuid}`, options)
     .then((res) => res.json())
     .then((response) => {
       if (response.status != 'error') {
         createChatBox(response.data);
         };
         joinTheChat(uuid);
       
     })
     .catch(e => console.log(e)); 
  }

  const getFriendsMessages  = () => {
    options.method = 'GET';
    fetch(`${base}list-my-messages`, options)
     .then((res) => res.json())
     .then((response) => {
       if (response.status != 'error') {
        console.log('this is response',response);
        const mapped = mapMessageList(response.data)
        console.log(mapped)
        const el = createAMessagedFriend(mapped);
        document.getElementById('message-area').innerHTML = el.join(" ");
      };
       
     })
     .catch(e => console.log(e)); 
  }

  if ( window.location.pathname === '/message') {

    const friend_uuid = localStorage.getItem('friend_data');
     getFriendMessageData(friend_uuid);
     getFriendsMessages();
 }

 const joinTheChat = (friend_uuid) => {
    joinChat(`${myUuid}&${friend_uuid}`);
 }