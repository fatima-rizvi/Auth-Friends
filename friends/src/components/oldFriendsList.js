import React from "react";
import AddFriend from './AddFriend';
//import moment from "moment";
//import Loader from "react-loader-spinner";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";

class FriendsList extends React.Component {
  state = {
    friends: []
  };

  componentDidMount() {
    this.getData();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.friends !== this.state.friends){
  //     this.getData();
  //   }
  // }

  getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log('friends list: ', res.data);
        this.setState({
          friends: res.data
        });
      })
      .catch((err) => {
        console.log('Friends error: ', err);
      });
  };

  render() {
    const friendsArr = this.state.friends;
    console.log("Friends array: ", friendsArr);
    return (
      <div>
        <AddFriend setFriends = {this.setState}/>
        <div className="all-friends">
          {
            friendsArr.map((friend) => (
              <p>{friend.name}</p>
            )
            )
          }
        </div>
      </div>
    );
  }
}

export default FriendsList;
