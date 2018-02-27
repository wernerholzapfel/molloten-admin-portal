export const inhoud = [{
  'id': '83ced730-21d1-4365-b3d9-e34f2b466692',
  'display_name': 'Stine Jensen',
  'image_url': 'assets/avatar/stinejensen.jpg',
  'winner': null,
  'mol': null,
  'finalist': null,
  'afgevallen': true,
  'aflevering': 7
}];

export const kandidaten = (state = [], action) => {
  switch (action.type) {
    // case 'FETCH_KANDIDATEN':
    //   return {
    //     ...state,
    //     kandidaten: action.payload,
    //   };
    default:
      return state;
  }
};

