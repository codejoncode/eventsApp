import React from "react";
import logo from "../../Images/users.png";
import LandingPage from "../../Images/2.jpg";

//stateless functional component
const HomePage = ({history}) => {
  // style ={{backgroundImage: `url(${LandingPage}) !important`, backgroundSize: "cover !important"}}
  return (
    <div >
      <div  id = "landingPage" className="ui inverted vertical masthead center aligned segment" >
        <div className="ui text container" >
          <h1 className="ui inverted stackable header">
            {/* <img
              className="ui image massive"
              src={logo}
              alt="logo"
            />
            <div className="content">Re-vents</div> */}
          </h1>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h2>Do whatever you want to do</h2>
          <div onClick = {() => history.push('/events')} className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        &copy; 2019 Fleek Session {" "}
        
      </div>
    </div>
  );
};

export default HomePage;
