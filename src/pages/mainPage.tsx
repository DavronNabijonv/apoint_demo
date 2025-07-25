import axios from "axios";
import { useEffect } from "react";

// LocalStorage'dan tokenni olish
const token = localStorage.getItem("token");

type MaterialItem = {
  category: string;
  code: string;
  color: string | null;
  last_price: number;
  material_id: number;
  min_amount: number | null;
  name: string;
  parent: string;
  remind_end_amount: number;
  remind_end_sum: number;
  remind_income_amount: number;
  remind_income_sum: number;
  remind_outgo_amount: number;
  remind_outgo_sum: number;
  remind_start_amount: number;
  remind_start_sum: number;
  unit: string;
  width: string;
};

type GroupedByCategory = {
  [category: string]: MaterialItem[];
};

type GroupedByParent = {
  [parent: string]: GroupedByCategory;
};



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
      .then((res) => console.log(groupMaterialsByParentAndCategory(res.data)));

      function groupMaterialsByParentAndCategory(data: MaterialItem[]): GroupedByParent {
        const grouped: GroupedByParent = {};
      
        data.forEach(item => {
          const parent = item.parent || "Boshqa";
          const category = item.category || "Noma'lum";
      
          if (!grouped[parent]) {
            grouped[parent] = {};
          }
      
          if (!grouped[parent][category]) {
            grouped[parent][category] = [];
          }
      
          grouped[parent][category].push(item);
        });
      
        return grouped;
      }
      
      
  });

  return <div>MainPage</div>;
}
