import React from "react";
import "../css/Home.css";

const Home = (props) => {
  return (
    <div>
      {/*Banner */}
      <div className="container text-center " style={{ marginTop: "100px" }}>
        <a
          className="btn btn-lg btn-warning my-2"
          href="https://meet.jit.si/Demo"
          target="_blank"
        >
          Meet now
        </a>
        
      </div>
    </div>
  );
};

export default Home;
