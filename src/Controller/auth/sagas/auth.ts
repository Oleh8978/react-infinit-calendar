import { all, put, takeEvery, select } from 'redux-saga/effects';
import {
  DeviceDTO,
  AuthRefreshRequestDTO,
  AuthUserResponseDTO,
} from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from 'utils/API/Exceptions';

// actions

import {
  signIn,
  loginByToken,
  signOut,
  setAuthenticatedStatus,
} from '../actions';
