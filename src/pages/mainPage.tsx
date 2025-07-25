import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { MaterialTable } from "./table/tableInfo";

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

type GroupedData = {
  [parent: string]: {
    [category: string]: MaterialItem[];
  };
};

export default function MainPage() {
  const [allData, setAllData] = useState<GroupedData>({});

  const groupMaterialsByParentAndCategory = useCallback((data: MaterialItem[]): GroupedData => {
    const grouped: GroupedData = {};
  
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
  }, []);

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
      .then((res) => {
        const groupedData = groupMaterialsByParentAndCategory(res.data);
        setAllData(groupedData);
      })
      .catch(error => {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      });
  }, [groupMaterialsByParentAndCategory]);

  return (
    <div>
      <MaterialTable data={allData} />
    </div>
  );
}