import NameSpace from '../name-space';

export const getCurrentCity = (state) => state[NameSpace.APP].currentCity;

export const getCurrentSortingOption = (state) => state[NameSpace.APP].currentSortingOption;

export const getActiveOfferId = (state) => state[NameSpace.APP].activeOfferId;
