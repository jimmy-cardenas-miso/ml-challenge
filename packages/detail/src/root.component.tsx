import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./root.router";
export default function Root(props) {
  return <RouterProvider router={router} />
}
