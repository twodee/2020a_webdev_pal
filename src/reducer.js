import {Action} from './actions';

const initialState = {
  isWaiting: false,
  memories: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Action.LoadMemories:
      return {
        ...state,
        isWaiting: false,
        memories: action.payload,
      };
    case Action.FinishAddingMemory:
      return {
        ...state,
        isWaiting: false,
        memories: [{...action.payload, isEditing: true}, ...state.memories],
      };
    case Action.EnterEditMode:
      return {
        ...state,
        memories: state.memories.map(memory => {
          if (memory.id === action.payload.id) {
            return {...memory, isEditing: true};
          } else {
            return memory;
          }
        }),
      };
    case Action.LeaveEditMode:
      return {
        ...state,
        memories: state.memories.map(memory => {
          if (memory.id === action.payload.id) {
            return {...memory, isEditing: undefined};
          } else {
            return memory;
          }
        }),
      };
    case Action.FinishSavingMemory:
      return {
        ...state,
        isWaiting: false,
        memories: state.memories.map(memory => {
          if (memory.id === action.payload.id) {
            return action.payload;
          } else {
            return memory;
          }
        }),
      };
    case Action.FinishDeletingMemory:
      return {
        ...state,
        isWaiting: false,
        memories: state.memories.filter(memory => memory.id !== action.payload.id),
      };
    case Action.StartWaiting:
      return {
        ...state,
        isWaiting: true,
      }
    default:
      return state;
  }
}

export default reducer;
