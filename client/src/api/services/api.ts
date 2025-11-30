/// <reference types="vite/client" />
import axios from 'axios';

// აქ ვიყენებთ "Environment Variable"-ს.
// თუ Vercel-ზე ვართ, ის წაიკითხავს VITE_API_URL ცვლადს.
// თუ ლოკალურად ვართ, გამოიყენებს localhost-ს.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
});