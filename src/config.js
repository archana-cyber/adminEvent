import axios from "axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL;


axios.interceptors.request.use(
    config => {
      config.headers['token'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywiZW1haWwiOiJjYXJjaGFuYTIwMDdAZ21haWwuY29tIiwiaWF0IjoxNjcwNjg5Mzg4LCJleHAiOjE2NzA2OTY1ODh9.uTJuzKRvDVme9uLxpYcokXq3tkA-dZGQc_4rxRBI_qg`;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );