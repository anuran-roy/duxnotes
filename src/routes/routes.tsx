import { Redirect } from "raviger";
import Notes from "../components/notes/notes";
import Trash from "../components/notes/trash";
import NotFound404 from "../components/not_found";
// import { lazy } from 'react';
import ComingSoon from "../components/coming_soon";

// const Notes = lazy(() => import('../components/notes/notes'));
// const Trash = lazy(() => import('../components/notes/trash'));
// const NotFound404 = lazy(() => import('../components/not_found'));
// const ComingSoon = lazy(() => import('../components/coming_soon'));

const routes = {
  "/": () => <Redirect to="/notes"></Redirect>,
  "/notes": () => <Notes />,
  "/reminders": () => <ComingSoon />,
  "/trash": () => <Trash />,
  "*": () => <NotFound404 />,
};

export default routes;