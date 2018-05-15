import {
  Project,
  Line,
  Hole,
  Item,
  Area,
  Layer
} from './export';
import { Map, List } from 'immutable';
import { Group as GroupModel } from '../models';
import { history, IDBroker, MathUtils } from '../utils/export';

class Group{

  static select( state, groupID ){
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    state = Project.setAlterate( state ).updatedState;

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      state = Layer.unselectAll( state, groupLayerID ).updatedState;

      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) lines.forEach( lineID => { state = Line.select( state, groupLayerID, lineID ).updatedState; });
      if( holes ) holes.forEach( holeID => { state = Hole.select( state, groupLayerID, holeID ).updatedState; });
      if( items ) items.forEach( itemID => { state = Item.select( state, groupLayerID, itemID ).updatedState; });
      if( areas ) areas.forEach( areaID => { state = Area.select( state, groupLayerID, areaID ).updatedState; });
    });

    state = Project.setAlterate( state ).updatedState;

    let groups = state.getIn(['scene', 'groups']).map( g  => g.set('selected', false) );

    state = state.setIn(['scene', 'groups'], groups).setIn([ 'scene', 'groups', groupID, 'selected' ], true);

    return { updatedState: state };
  }

  static unselect( state, groupID ){
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);
    let reduced = layerList.reduce( ( newState, layer, layerID ) => Layer.unselectAll( newState, layerID ).updatedState, state );
    state = reduced.setIn([ 'scene', 'groups', groupID, 'selected' ], false);

    return { updatedState: state };
  }

  static create( state ){
    let groupID = IDBroker.acquireID();

    state = state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState: state };
  }

  static createFromSelectedElements( state ){
    let groupID = IDBroker.acquireID();

    state = state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );

    state.getIn(['scene', 'layers']).forEach((layer) => {

      let layerID = layer.get('id');
      let layerElements = {
        'lines': layer.get('lines').filter( el => el.get('selected') ),
        'items': layer.get('items').filter( el => el.get('selected') ),
        'holes': layer.get('holes').filter( el => el.get('selected') ),
        'areas': layer.get('areas').filter( el => el.get('selected') )
      };

      for( let elementPrototype in layerElements ) {
        layerElements[elementPrototype].forEach( el => state = this.addElement( state, groupID, layerID, elementPrototype, el.get('id') ).updatedState );
      }
    });

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static addElement( state, groupID, layerID, elementPrototype, elementID ){
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]) || new List();
    let actualGroupDimension = state.getIn(['scene', 'groups', groupID, 'elements']).reduce( ( sum, layer ) => {
      return sum + layer.reduce( ( lSum, elProt ) => lSum + elProt.size, 0 );
    }, 0);

    if( actualList.contains(elementID) )
    {
      return {updatedState: state};
    }

    state = state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.push(elementID));

    let elementDom = document.querySelector(`[data-id="${elementID}"]`);
    let { x: elX, y: elY, width: elW, height: elH } = elementDom.getBoundingClientRect();

    console.log( 'elementDom dimensions', elX, elY, elW, elH );

    let paper = document.getElementById('svg-drawing-paper');
    let { x: pX, y: pY } = paper.getBoundingClientRect();

    console.log( 'elementDom dimensions', pX, pY );

    let elCx = elX - pX + ( elW / 2 );
    let elCy = elY - pY + ( elH / 2 );

    let { a, b, c, d, e, f, SVGHeight } = state.get('viewer2D').toJS();

    console.log( 'elC dimensions', elCx, elCy, SVGHeight - elCy );

    let m1 = [
      [ a, b, c ],
      [ d, e, f ],
      [ 0, 0, 1 ]
    ];

    let m2 = [
      [ elCx, SVGHeight - elCy, 0 ],
      [ 0   , 1   , 0 ],
      [ 0   , 0   , 1 ]
    ];

    let transformResult = MathUtils.multiplyMatrices( m1, m2 );

    let elCxT = transformResult[0][0];
    let elCyT = transformResult[0][1];

    console.log( 'elCT dimensions', elCxT, elCyT );

    let groupX = state.getIn(['scene', 'groups', groupID, 'x']);
    let groupY = state.getIn(['scene', 'groups', groupID, 'y']);

    console.log('actual group', groupX, groupY );

    let medianX = ( ( groupX * actualGroupDimension ) + elCxT ) / ( actualGroupDimension + 1 );
    let medianY = ( ( groupY * actualGroupDimension ) + elCyT ) / ( actualGroupDimension + 1 );

    console.log('median', medianX, medianY );

    state = this.setBarycenter( state, groupID, medianX, medianY ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState: state };
  }

  static setBarycenter( state, groupID, x, y ) {
    if (typeof x !== 'undefined') state = state.setIn(['scene', 'groups', groupID, 'x'], x);
    if (typeof y !== 'undefined') state = state.setIn(['scene', 'groups', groupID, 'y'], y);

    return { updatedState: state };
  }

  static removeElement( state, groupID, layerID, elementPrototype, elementID ) {
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]);

    if( !actualList || !actualList.contains(elementID) )
    {
      return { updatedState: state };
    }

    state = state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.filterNot( el => el === elementID ));

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState : state };
  }

  static setAttributes( state, groupID, attributes ){
    state = state.mergeIn(['scene', 'groups', groupID], attributes);

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState : state };
  }

  static setProperties( state, groupID, properties ){
    state = state.mergeIn(['scene', 'groups', groupID, 'properties'], properties);

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState : state };
  }

  static remove( state, groupID ) {
    state = state.removeIn(['scene', 'groups', groupID]);

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState : state };
  }

  static removeAndDeleteElements( state, groupID ) {
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      state = Layer.unselectAll( state, groupLayerID ).updatedState;

      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) {
        lines.forEach( lineID => {
          state = Line.remove( state, groupLayerID, lineID ).updatedState;
          state = Layer.detectAndUpdateAreas( state, groupLayerID ).updatedState;
        });
      }

      if( holes ) holes.forEach( holeID => { state = Hole.remove( state, groupLayerID, holeID ).updatedState; });
      if( items ) items.forEach( itemID => { state = Item.remove( state, groupLayerID, itemID ).updatedState; });
      //( actually ) no effect by area's destruction
      if( false && areas ) areas.forEach( areaID => { state = Area.remove( state, groupLayerID, areaID ).updatedState; });

      state = state.deleteIn([ 'scene', 'groups', groupID ]);
    });

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState: state };
  }

  static translate( state, groupID, x, y ) {
    let deltaX = x - state.getIn(['scene', 'groups', groupID, 'x']);
    let deltaY = y - state.getIn(['scene', 'groups', groupID, 'y']);

    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) state = lines
        .map( lineID => state.getIn(['scene', 'layers', groupLayerID, 'lines', lineID]) )
        .reduce( ( newState, line ) => {
          let { x: x1, y: y1 } = newState.getIn(['scene', 'layers', groupLayerID, 'vertices', line.vertices.get(0)]);
          let { x: x2, y: y2 } = newState.getIn(['scene', 'layers', groupLayerID, 'vertices', line.vertices.get(1)]);

          return Line.setVerticesCoords( newState, groupLayerID, line.id, x1 + deltaX, y1 + deltaY, x2 + deltaX, y2 + deltaY ).updatedState;
        }, state );

      if( items ) state = items
        .map( itemID => state.getIn(['scene', 'layers', groupLayerID, 'items', itemID]) )
        .reduce( ( newState, item ) => {
          let { x: xI, y: yI } = item;

          console.log( xI, yI );

          return Item.setAttributes( newState, groupLayerID, item.id, new Map({ x: xI + deltaX, y: yI + deltaY }) ).updatedState;
        }, state );
      //if( holes ) holes.forEach( holeID => { state = Hole.select( state, groupLayerID, holeID ).updatedState; });
      //if( areas ) areas.forEach( areaID => { state = Area.select( state, groupLayerID, areaID ).updatedState; });

      state = Layer.detectAndUpdateAreas( state, groupLayerID ).updatedState;
    });

    state = this.setBarycenter( state, groupID, x, y ).updatedState;

    

    return { updatedState: state };
  }

  static rotate( state, groupID, alpha ) {
    console.log('rotate', state.toJS(), groupID, toJS );
    return { updatedState: state };
  }

}

export { Group as default };
