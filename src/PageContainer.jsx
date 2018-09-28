import React from 'react'
import Title from './Title.jsx'

export default class PageContainer extends React.Component {
  render() {
    return <div className="wrapper">
        <div className="container main-container">
          <div className="row justify-content-center">
            <Title />
            <div className='col-md-5 form-container'>
              {this.props.children}
            </div>
          </div>
        </div>
    </div>
  }
}
