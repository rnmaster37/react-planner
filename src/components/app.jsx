"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDimensions from 'react-dimensions';

import * as projectActions from '../actions/project-actions';
import * as viewer2DActions from '../actions/viewer2d-actions';
import * as editingActions from '../actions/editing-actions';
import * as viewer3DActions from '../actions/viewer3d-actions';
import * as volumesActions from '../actions/volumes-actions';
import * as drawingActions from '../actions/drawing-actions';
import SceneComponents from '../scene-components/scene-components';
import Layout from './layout.jsx';


class App extends React.Component {

  getChildContext() {
    return {
      projectActions: this.props.projectActions,
      viewer2DActions: this.props.viewer2DActions,
      editingActions: this.props.editingActions,
      viewer3DActions: this.props.viewer3DActions,
      volumesActions: this.props.volumesActions,
      drawingActions: this.props.drawingActions,
      sceneActions: this.props.sceneActions,
      sceneComponents: SceneComponents
    }
  }

  render() {
    let {containerWidth, containerHeight, ...props} = this.props;
    return <Layout width={containerWidth} height={containerHeight} {...props} />;
  }
}

App.childContextTypes = {
  projectActions: React.PropTypes.object,
  viewer2DActions: React.PropTypes.object,
  editingActions: React.PropTypes.object,
  viewer3DActions: React.PropTypes.object,
  volumesActions: React.PropTypes.object,
  drawingActions: React.PropTypes.object,
  sceneActions: React.PropTypes.object,
  sceneComponents: React.PropTypes.object
};


function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(projectActions, dispatch),
    viewer2DActions: bindActionCreators(viewer2DActions, dispatch),
    editingActions: bindActionCreators(editingActions, dispatch),
    viewer3DActions: bindActionCreators(viewer3DActions, dispatch),
    volumesActions: bindActionCreators(volumesActions, dispatch),
    drawingActions: bindActionCreators(drawingActions, dispatch),
    sceneActions: bindActionCreators(drawingActions, dispatch)
  }
}


App = connect(mapStateToProps, mapDispatchToProps)(App);
App = ReactDimensions()(App);
export default App;
