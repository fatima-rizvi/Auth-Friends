import React, { useState, useEffect } from "react";
import AddFriend from './AddFriend';

import { axiosWithAuth } from "../utils/axiosWithAuth.js";

const FriendsList = () => {
  const [friends, setFriends] = useState([])

  const getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log('friends list: ', res.data);
        setFriends(res.data);
      })
      .catch((err) => {
        console.log('Friends error: ', err);
      });
  };

  useEffect(() => {
    getData()
  }, [])

  const deleteFriend = (friendId) => {
    console.log('target ID: ', friendId);
    axiosWithAuth()
            .delete(`/friends/${friendId}`)
            .then((res) => {
                console.log('delete friend: ', res)
                setFriends(res.data)
            })
            .catch((err) => {
                console.log('delete Error: ', err)
            })
  }

  return (
    <div>
        <AddFriend setFriends = {setFriends}/>
        <h4>Click on a friend to delete them</h4>
        <div className="all-friends">
          {friends &&
            friends.map((friend) => (
                <p onClick = {() => deleteFriend(friend.id)} >{friend.name}</p>
              ))
          }
        </div>
      </div>
  )

}

export default FriendsList;