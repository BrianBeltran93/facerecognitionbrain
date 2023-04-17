import React from "react";

const Profile = ({user}) => {
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
    </div>
  )
}

export default Profile;