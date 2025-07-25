import axios from "axios";
import { useEffect } from "react";

// LocalStorage'dan tokenni olish
const token = localStorage.getItem("token");

export default function MainPage() {
  useEffect(() => {
    axios
      .get(
        `/api/reports/reports/materials?sort=name&start=1.07.2025&end=31.07.2025`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res.data));
  });

  return <div>MainPage</div>;
}
