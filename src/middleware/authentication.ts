import jwt from 'jsonwebtoken';
import { UserResponse } from '../types/User.types';
import { AuthResponse } from '../types/AuthResponse';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env'})

/*
keep auth middleware for validation and route protection 
implementlater
*/