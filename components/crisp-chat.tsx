"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("12738ee8-be9f-486e-bfd2-f8fa2eab6b76");
  }, []);
  return null;
};

export default CrispChat;
