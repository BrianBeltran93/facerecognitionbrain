import React from "react";
import Popup from "reactjs-popup";
import "./Profile.css";



const Profile = ({user, onSubmitDelete }) => {
  return(
    <div className="pt5">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
              <legend className="f1 fw6 ph0 mh0 center">Profile</legend>
              <div className="mt3 tl f4">
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Entries:</b> {user.entries}</p>
                <p><b>Joined:</b> {user.joined.substring(0,10)}</p>
              </div>
          </div>
        </main>
      </article>
      <Popup
        trigger={<button className="button f5 link grow br3 ph3 pv2 mb2 dib white bg-dark-red"
        > DELETE ACCOUNT </button>}
        modal
        nested
      >
        {close => (
          <div className="modal ba popup-bg dim-page">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header f3 b"> DELETE ACCOUNT </div>
            <div className="content f5 b">
              {' '}
              ARE YOU SURE YOU WOULD LIKE TO DELETE YOUR ACCOUNT?
            </div>
            <div className="actions">
              <button className="button f5 link grow br3 ph3 pv2 mb2 mr6 dib white bg-dark-red" 
              onClick={() => onSubmitDelete()}> Yes </button>
              <button
                className="button f5 link grow br3 ph3 pv2 mb2 dib white bg-green"
                onClick={() => {
                  console.log('modal closed ');
                  close();
                }}
              >
                NO
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Profile;