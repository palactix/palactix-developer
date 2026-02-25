"use client";

import { useProfile } from "./hook";

export const ProfilePage = () => {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (isError || !data) {
    return <p>Unable to load profile.</p>;
  }

  return (
    <main>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </main>
  );
};
