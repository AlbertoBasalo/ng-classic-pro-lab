export type Action = {
  type: ActionTypes;
  payload: any;
};

export type ActionTypes =
  | 'LOAD_ASSETS'
  | 'ADD_ASSET'
  | 'UPDATE_ASSET'
  | 'DELETE_ASSET';

