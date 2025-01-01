import { body, param } from "express-validator";

const VALID_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

const classIdValidator = () =>
    param("classId")
    .isString()
    .trim()
    .notEmpty()

const nameValidator = () => 
    body("name")
    .isString()
    .trim()
    .notEmpty()

const professorValidator = () => 
    body("professor")
    .isString()
    .trim()
    .notEmpty()

const startValidator = () => 
    body("start")
    .isISO8601()
    .trim()
    .notEmpty()

const endValidator = () => 
    body("end")
    .isISO8601()
    .trim()
    .notEmpty()

const locationValidator = () => 
    body("location")
    .isString()
    .trim()
    .notEmpty()

const daysValidator = () => 
    body("days.*")  //  checks each element in the array
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Each day must be a valid day of the week');

const semesterValidator = () => 
    body("semester")
    .isString()
    .trim()
    .notEmpty()

export const validateAddClass = [
    nameValidator(),
    professorValidator().optional(),
    startValidator().optional(),
    endValidator().optional(),
    locationValidator().optional(),
    daysValidator().optional(),
    semesterValidator().optional()
]

export const validateUpdateClass = [
    classIdValidator(),
    nameValidator().optional(),
    professorValidator().optional(),
    startValidator().optional(),
    endValidator().optional(),
    locationValidator().optional(),
    daysValidator().optional(),
    semesterValidator().optional()
]

export const validateDeleteClass = [
    classIdValidator()
]