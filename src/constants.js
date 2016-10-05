// ACTIONS project
export const NEW_PROJECT = 'NEW_PROJECT';
export const LOAD_PROJECT = 'LOAD_PROJECT';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const LOAD_PROJECT_FROM_FILE = 'LOAD_PROJECT_FROM_FILE';
export const SAVE_PROJECT_TO_FILE = 'SAVE_PROJECT_TO_FILE';
export const OPEN_CATALOG = 'OPEN_CATALOG';

// ACTIONS editing
export const SELECT_TOOL_EDIT = 'SELECT_TOOL_EDIT';
export const SELECT_LINE = 'SELECT_LINE';
export const SELECT_HOLE = 'SELECT_HOLE';
export const SELECT_AREA = 'SELECT_AREA';
export const SELECT_ITEM = 'SELECT_ITEM';
export const UNSELECT_ALL = 'UNSELECT_ALL';
export const SET_PROPERTIES = 'SET_PROPERTIES';
export const REMOVE = 'REMOVE';

// ACTIONS viewer2D
export const SELECT_TOOL_ZOOM_IN = 'SELECT_TOOL_ZOOM_IN';
export const SELECT_TOOL_ZOOM_OUT = 'SELECT_TOOL_ZOOM_OUT';
export const SELECT_TOOL_PAN = 'SELECT_TOOL_PAN';
export const UPDATE_2D_CAMERA = 'UPDATE_2D_CAMERA';

//ACTIONS viewer3D
export const SELECT_TOOL_3D_VIEW = 'SELECT_TOOL_3D_VIEW';
export const SELECT_TOOL_3D_FIRST_PERSON = 'SELECT_TOOL_3D_FIRST_PERSON';

//ACTIONS items
export const SELECT_TOOL_DRAWING_ITEM = 'SELECT_TOOL_DRAWING_ITEM';
export const UPDATE_DRAWING_ITEM = 'UPDATE_DRAWING_ITEM';
export const END_DRAWING_ITEM = 'END_DRAWING_ITEM';
export const BEGIN_DRAGGING_ITEM = 'BEGIN_DRAGGING_ITEM';
export const UPDATE_DRAGGING_ITEM = 'UPDATE_DRAGGING_ITEM';
export const END_DRAGGING_ITEM = 'END_DRAGGING_ITEM';

//ACTION drawings
export const SELECT_TOOL_DRAWING_LINE = 'SELECT_TOOL_DRAWING_LINE';
export const BEGIN_DRAWING_LINE = 'BEGIN_DRAWING_LINE';
export const UPDATE_DRAWING_LINE = 'UPDATE_DRAWING_LINE';
export const END_DRAWING_LINE = 'END_DRAWING_LINE';
export const SELECT_TOOL_DRAWING_HOLE = 'SELECT_TOOL_DRAWING_HOLE';
export const UPDATE_DRAWING_HOLE = 'UPDATE_DRAWING_HOLE';
export const END_DRAWING_HOLE = 'END_DRAWING_HOLE';
export const BEGIN_DRAGGING_LINE = 'BEGIN_DRAGGING_LINE';
export const UPDATE_DRAGGING_LINE = 'UPDATE_DRAGGING_LINE';
export const END_DRAGGING_LINE = 'END_DRAGGING_LINE';
export const SELECT_TOOL_UPLOAD_IMAGE = 'SELECT_TOOL_UPLOAD_IMAGE';
export const BEGIN_UPLOADING_IMAGE = 'BEGIN_UPLOADING_IMAGE';
export const END_UPLOADING_IMAGE = 'END_UPLOADING_IMAGE';
export const BEGIN_FITTING_IMAGE = 'BEGIN_FITTING_IMAGE';
export const END_FITTING_IMAGE = 'END_FITTING_IMAGE';

//ACTIONS vertices
export const BEGIN_DRAGGING_VERTEX = 'BEGIN_DRAGGING_VERTEX';
export const UPDATE_DRAGGING_VERTEX = 'UPDATE_DRAGGING_VERTEX';
export const END_DRAGGING_VERTEX = 'END_DRAGGING_VERTEX';

//ACTIONS scene
export const SET_LAYER_PROPERTIES = 'SET_LAYER_PROPERTIES';
export const ADD_LAYER = 'ADD_LAYER';
export const SELECT_LAYER = 'SELECT_LAYER';

//MODES
export const MODE_IDLE = 'IDLE';
export const MODE_2D_ZOOM_IN = 'MODE_2D_ZOOM_IN';
export const MODE_2D_ZOOM_OUT = 'MODE_2D_ZOOM_OUT';
export const MODE_2D_PAN = 'MODE_2D_PAN';
export const MODE_3D_VIEW = 'MODE_3D_VIEW';
export const MODE_3D_FIRST_PERSON = 'MODE_3D_FIRST_PERSON';
export const MODE_WAITING_DRAWING_LINE = 'MODE_WAITING_DRAWING_LINE';
export const MODE_DRAGGING_LINE = 'MODE_DRAGGING_LINE';
export const MODE_DRAGGING_VERTEX = 'MODE_DRAGGING_VERTEX';
export const MODE_DRAGGING_ITEM = 'MODE_DRAGGING_ITEM';
export const MODE_DRAWING_LINE = 'MODE_DRAWING_LINE';
export const MODE_DRAWING_HOLE = 'MODE_DRAWING_HOLE';
export const MODE_DRAWING_ITEM = 'MODE_DRAWING_ITEM';
export const MODE_UPLOADING_IMAGE = 'MODE_UPLOADING_IMAGE';
export const MODE_FITTING_IMAGE = 'MODE_FITTING_IMAGE';
export const MODE_VIEWING_CATALOG = 'MODE_VIEWING_CATALOG';

//additional
export const STORAGE_KEY = 'metior_scene_autosave_v1';
export const SAFE_SCENE_MODES = [
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE
];


//unit
export const UNIT_MILLIMETER = 'mm';
export const UNIT_CENTIMETER = 'cm';
export const UNIT_METER = 'm';
export const UNIT_INCH = 'in';
export const UNIT_FOOT = 'ft';
export const UNIT_MILE = 'mi';
