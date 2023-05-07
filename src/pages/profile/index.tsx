import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  return <Layout>Profile Page Is Under Construction</Layout>;
};

export default Index;
