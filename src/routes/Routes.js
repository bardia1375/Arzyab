/* eslint-disable react-hooks/exhaustive-deps */
import { setAuthToken } from "config/httpService";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";

// Routes
import AuthRoutes from "routes/Auth/routes";
import HomeRoutes from "routes/Home/routes";
import { verifyToken } from "./Auth/Module";
import axios from "axios";
import api from "config/config.json";
import "leaflet/dist/leaflet.css";
const Routes = () => {
  const { isAuthenticated, authLoading, Token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  // const token = localStorage.getItem("tickmentAd_AccessToken");

  const authRoutes = useRoutes(AuthRoutes);
  const homeRoutes = useRoutes(HomeRoutes);

  const [loading, setLoading] = useState(authLoading);
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  useEffect(() => {
    setLoading(authLoading);
    if (Token) {
      setAuthToken(Token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(
          `${api.api}/v1/user?includes[0]=profile.company&includes[1]=positions`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem(
            "personsData",
            JSON.stringify({
              CompanyName: res.data.data.user.profile?.company?.name,
              CompanyCode: res.data.data.user.profile?.company?.code,
              FirstName: res.data.data.user.profile?.first_name,
              LastName: res.data.data.user.profile?.last_name,
              Avatar: res.data.data.user.profile?.avatar,
              Position: res.data.data.user.positions[0]?.name,
              PositionId: res.data.data.user.positions[0]?.id,
              UserId: res.data.data.user.profile?.id,
            })
          );
        });
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div className="logoLoading">Loading...</div>;
  }
  return (
    <>
      {!isAuthenticated && authRoutes}
      {isAuthenticated && homeRoutes}
    </>
  );
};

export default Routes;
