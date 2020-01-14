import React, { Component } from 'react'
/**
 * 种类
 */

export default class Home extends Component {
  state = {
    info: 'INFO: logcat日志[设备:SJE7N17401005714]'
  }
  changeInfo(str) {
    if (str) {
      const sje = str.match(/日志(\S*)/)
      return (
        <div>
          {str.substr(0, str.indexOf('['))} <a href='/'>{sje[1]}</a>
        </div>
      )
    } else {
      return {}
    }
  }

  render() {
    return <div> {this.changeInfo(this.state.info)}</div>
  }
}
