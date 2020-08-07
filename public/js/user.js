const addFriend = document.getElementById('add-friend');
const friendId = document.getElementById('friend-Id');
const friendName = document.getElementById('friend-name');
const userSearchInput = document.getElementById('userSearchInput')

const searchResult = document.getElementById('search-result-layout')
const follow_box = document.getElementById('follow-box');

// get user details

function getUserDetails(user_uuid) {
    const my_uuid = localStorage.getItem('my_uuid');
    window.location.replace(`/friendprofile?user_uuid=${user_uuid}&my_uuid=${my_uuid}`);
}

function mapFriendList(data) {
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

function getFriendDetails(user_uuid) {
  const my_uuid = localStorage.getItem("my_uuid");
  console.log(my_uuid)
  window.location.replace(`/message`);
}

function getUserImage(image) {
  if (image) return image
  return '/img/21104.svg'
}

 function searchUser() {
  options.method = "GET"
   fetch(`${base}/search-user?input=${userSearchInput.value}`, options)
  .then((res) => res.json())
     .then((response) => {
      console.log(response)
      const array = [];
      response.data.forEach(x => {
        const el = result(x);
        array.push(el);
      });
       searchResult.innerHTML = array.join("");
  }).catch((error) => console.log(error))
}


const result = (data) => {
  return `
  <div class="room-box d-flex">
      <div class="text-center">
        <img src="${ getUserImage(data.profile.profile_pic)}" class="img-prof img-fluid">
      </div>
      <div class="room-detail mr-2">
        <p onclick="getUserDetails('${data.uuid}')" class="search-name"v><strong><span><a href="#">${ data.name}</a></span></strong>
        </p>
      </div>
      <span><button class="btn btn-primary" onclick="getUserDetails('${data.uuid}')"><i class="fa fa-eye" aria-hidden="true"></i></button></span>
    </div>
  `
}

const followUser = (uuid) => {
      if(follow_box.innerText == 'Un-Follow') {
        unFollowUser(uuid);
      } else {
        options.method = "POST";
        fetch(`${base}follow-user?user_uuid=${uuid}`, options)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.status != "error") {
              TOAST.successToast(response.data)
              follow_box.innerText = 'Un-Follow'
            } else {
               TOAST.errorToast(response.error);
            }
          })
          .catch((e) => console.log(e));
      }
}

const unFollowUser = (uuid) => {
  if (follow_box.innerText == 'Follow') {
    followUser(uuid);
  } else {
    options.method = "PUT";
    fetch(`${base}un-follow-user?user_uuid=${uuid}`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status != "error") {
          TOAST.successToast(response.data)
          follow_box.innerText = 'Follow'
        } else {
          TOAST.errorToast(response.error);
        }
      })
      .catch((e) => console.log(e));
  }

}

const createFriend = (data) => {
  return `<div class="col-md-6 friend_list">
  <div class=" room-box  d-flex-d">
     <div class="text-center">
       <img src="${
         data.profile_pic || "img/4.jpg"
       }" class="img-prof img-fluid">
     </div>
     <div class="room-detail all-list">
         <p><strong><span onclick="getUserDetails('${
           data.user_uuid
         }')"><a href="#">${data.name}</a></span></strong>
         <span><button class="btn btn-info pull-right" onclick="messagePage('${data.user_uuid}')">Message</button></span>
       </p>
       <div><span class="fan-fn"> ${
         data.club
       } </span><span class="fan-fn"> (${data.status})</span></div>
     </div>
  </div>
</div>`;
}

function messagePage(follower_uuid) {
  try {
    console.log(follower_uuid);
  localStorage.setItem('friend_data', follower_uuid);
  window.location.href = '/message'
  } catch (error) {
    console.log(error)
  }
  
}

const listFollowers = () => {
  options.method = 'GET';
  fetch(`${base}list-followers`, options)
   .then((res) => res.json())
   .then((response) => {
     if (response.status != 'error' && response.data.length !== 0) {
      console.log('this is response',response);
      let array = []; 
      const mappedArray = mapFriendList(response.data)
       mappedArray.forEach(element => {
        const el = createFriend(element.Profile)
        array.push(el);
       });
       document.getElementById('all_friends').innerHTML = array.join(" ");
     }
   })
   .catch(e => console.log(e)); 
}


try {
  listFollowers()
} catch (error) {
  console.log(error);
}
