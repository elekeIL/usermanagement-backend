import Joi from 'joi';

const REQUIRED_STRING = Joi.string().trim().required();
const REQUIRED_NUMBER = Joi.number().required();
const ID = Joi.string().required();

const PERMISSIONS_SCHEMA = Joi.object({
  _id: ID,
  name: Joi.string(),
  path: Joi.string(),
  method: Joi.string(),
});

const GROUPS_SCHEMA = Joi.object({
  _id: ID,
  name: Joi.string(),
  permissions: Joi.array().items(
    Joi.alternatives(
      Joi.string(),
      PERMISSIONS_SCHEMA,
    ),
  ),
});


export const LOGIN_SCHEMA = Joi.object()
  .keys({
    username: REQUIRED_STRING,
    password: REQUIRED_STRING,
  }).required();


  export const REFRESH_TOKEN_SCHEMA = Joi.object()
  .keys({
    token: REQUIRED_STRING
  }).required();


export const LOGOUT_SCHEMA = Joi.object()
  .keys({
    token: REQUIRED_STRING
  }).required();


export const NEW_USER_SCHEMA = Joi.object()
  .keys({
    username: REQUIRED_STRING,
    password: REQUIRED_STRING,
    email: Joi.string().email({ minDomainAtoms: 2 }),
    phoneNumber: REQUIRED_STRING,
    dateOfBirth: REQUIRED_STRING,
    displayName: REQUIRED_STRING,
    firstName: REQUIRED_STRING,
    lastName: REQUIRED_STRING,
    isSuperUser: Joi.boolean(),
    type: Joi.string(),
    groups: Joi.array().items(
      Joi.alternatives(
        Joi.string(),
        GROUPS_SCHEMA,
      ),
    ),
  }).required();


export const EDIT_USER_SCHEMA = Joi.object()
  .keys({
    _id: ID,
    email: Joi.string().email({ minDomainAtoms: 2 }),
    displayName: REQUIRED_STRING,
    isSuperUser: Joi.boolean(),
    type: Joi.string(),
    groups: Joi.array().items(
      Joi.alternatives(
        Joi.string(),
        GROUPS_SCHEMA,
      ),
    ),
  }).required();


export const CHANGE_OWN_INFO_SCHEMA = Joi.object()
  .keys({
    _id: ID,
    email: Joi.string().email({ minDomainAtoms: 2 }),
    displayName: REQUIRED_STRING,
  }).required();


export const CHANGE_PASSWORD_SCHEMA = Joi.object()
  .keys({
    _id: ID,
    oldPassword: REQUIRED_STRING,
    newPassword: REQUIRED_STRING,
  }).required();


export const GET_USER_BY_ID = Joi.object()
  .keys({
    _id: ID,
  }).required();


export const GET_ALL_USERS = Joi.object().keys({
    limit: Joi.number().integer().min(0).required(),
    offset: Joi.number().integer().min(0).required(),
    startDate: Joi.string().allow(null, '').optional(),
    endDate: Joi.string().allow(null, '').optional(),
}).required();


