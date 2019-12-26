import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'

/*
 * 这里创建的窗体是在App容器包裹之外的，无法使用redux，所以需要使用provider包裹
*/
export default function funcfy (Component, props) {
  var div = document.createElement('div')
  
  function destroy () {
    var unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div)
    }
  }

  function render () {
    ReactDOM.render(
      <Component {...props} onDestory={() => destroy()}>
      </Component>
    , div)
  }

  render()
}
