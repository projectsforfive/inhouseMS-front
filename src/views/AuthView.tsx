'use client'

import { useEffect, useState } from "react"
import type { ChildrenType } from '@core/types';
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";

const AuthView = ({ children }: ChildrenType) => {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    axiosInstance.get('/auth/home')
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setAuthorized(true);
      })
      .catch((err: any) => {
        console.log(err);
        window.location.href = '/login';
      })
  }, []);

  return <>{authorized && children}</>;
}

export default AuthView
