const addFriend = document.getElementById('add-friend');
const friendId = document.getElementById('friend-Id');
const friendName = document.getElementById('friend-name');
const userSearchInput = document.getElementById('userSearchInput')

const searchResult = document.getElementById('search-result-layout')

// addFriend.addEventListener('click', followFriend)

// function followFriend() {
//     options.method = "POST";

//     if (!friendId || friendName) {
//         errorMessage.innerHTML = 'Please put a valid input'
//     } else {
//         const formData = new FormData();
//         formData.append("friend_uuid", friendId.value);
//         formData.append("friend_name", friendName.value);
//         options.body = formData;
//         fetch(`${base}}/add-follow-users`, options)
//           .then((res) => res.json())
//           .then((response) => {
//             console.log(response);
//             if (response.status != "error") {
//               Swal.fire(response.data);
//               window.location.reload();
//             } else {
//               Swal.fire(response.error, "", "error");
//             }
//           })
//           .catch((e) => console.log(e));
//     }
    
// }

// get user details

function getUserDetails() {
    options.method = "GET";
    fetch(`${base}/view-user-details?user_uuid=`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
}


 function searchUser() {
   
   console.log('it is getting a string')
  options.method = "GET"
   fetch(`${base}/search-user?input=${userSearchInput.value}`, options)
  .then((res) => res.json())
     .then((response) => {
      
      const array = [];
      response.data.forEach(x => {
        const el = result(x);
        array.push(el);
      });
       searchResult.innerHTML = array;
  }).catch((error) => console.log(error))
}


const result = (data) => {
  return `
    <div class="flex-container border-b mt-2">
                    <div>
                        <a href="">
                            <img src="">
                        </a>
                    </div>
                    <div class="side-content">
                        <a href="#" >
                            <p onclick="followUser('${data.uuid}')">${ data.name } </p>
                        </a>
                        <p class="status-color">Coach</p>
                
                    </div>
                
                    <div class="side-button">
                        <button class="btn btn-primary" onclick="followUser('${data.uuid}')">Follow</button
                    </div>
                </div>
  `
}

const followUser = (uid) => {
  Swal.fire(uid);
}

