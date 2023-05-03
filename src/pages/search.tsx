import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "../../firebase";
import PageAnimation from "@/components/page-animation";
import Layout from "@/components/Layout";

const Search = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return <div>
    <PageAnimation>
        <Layout>
            Search
        </Layout>
    </PageAnimation>
  </div>;
};

export default Search;
