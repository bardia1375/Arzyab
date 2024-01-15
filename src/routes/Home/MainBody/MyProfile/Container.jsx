// Components
import React, { useEffect } from "react";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-jalaali";

// Styles
import { Profile } from "assets/styles/home/profile";
import { fetchProfile } from "./Module";

export const Container = () => {
  // States && Hooks
  const { Token } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Fetch data from api
  useEffect(() => {
    dispatch(fetchProfile(Token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Shown data
  const informations = [
    { name: "نام", value: items?.profile?.first_name },
    { name: "نام خانوادگی", value: items?.profile?.last_name },
    { name: "کد پرسنلی", value: items?.profile?.personnel_id },
    {
      name: "جنسیت",
      value: items?.profile?.sex === "male" ? "آقا" : "خانم",
    },
    { name: "کد ملی", value: items?.profile?.national_code },
    {
      name: "شماره شناسنامه",
      value: items?.profile?.identification_code,
    },
    {
      name: "تاریخ تولد",
      value: `${
        items?.profile?.birthday
          ? `${moment(items?.profile?.birthday).format("jDD")} ${moment(
              items?.profile?.birthday
            ).format("jMMMM")} ${moment(items?.profile?.birthday).format(
              "jYYYY"
            )}`
          : ""
      }`,
    },
    { name: "محل تولد", value: items?.profile?.city_id },
    { name: "نام پدر", value: items?.profile?.father_name },
    { name: "ملیت", value: items?.profile?.nationality },
    { name: "تحصیلات", value: items?.profile?.education },
    {
      name: "وضعیت تأهل",
      value: items?.profile?.married === 0 ? "مجرد" : "متأهل",
    },
    { name: "ایمیل", value: items?.email },
    { name: "آدرس", value: items?.profile?.address },
  ];

  return (
    <>
      <Profile.RequestBody style={{ marginTop: "80px" }}>
        <Profile.RequestHeader>
          <Profile.TitleStyle selected={true}>اطلاعات شخصی</Profile.TitleStyle>
        </Profile.RequestHeader>
        <Profile.NewRequest>
          <div style={{ height: "100%", width: "100%" }}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {informations.map((item, index) => (
                  <Profile.RowDetailChildren
                    key={index}
                    style={{
                      width: `${
                        item.name === "آدرس" && item.value !== null
                          ? "100%"
                          : "50%"
                      }`,
                      padding: "5px",
                    }}
                  >
                    {item.name}: <span>{item.value}</span>
                  </Profile.RowDetailChildren>
                ))}
              </div>
            )}
          </div>
        </Profile.NewRequest>
      </Profile.RequestBody>
    </>
  );
};
