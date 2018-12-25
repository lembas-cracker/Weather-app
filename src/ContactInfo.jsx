import React from "react";
import github from "./github.ico";
import npmjsIco from "./npmjs-ico.png";
import openweathermap from "./openweathermap-ico.png";

export default class ContactInfo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-end">
          <div className="contact-container">
            <div className="contact-title">Know your weather 2018©</div>
            <div className="contact-links">
              <div className="row justify-content-around">
                <a href="https://github.com/lembas-cracker">
                  <img src={github} alt="" title="GitHub" className="github-ico" />
                </a>
                <a href="https://www.npmjs.com/package/react-autosuggest">
                  <img src={npmjsIco} alt="" title="npmjs" className="npmjs-ico" />
                </a>
                <a href="https://github.com/lembas-cracker">
                  <img
                    src={openweathermap}
                    alt=""
                    title="Openweathermap"
                    className="openweathermap-ico"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
