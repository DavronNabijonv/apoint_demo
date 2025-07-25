// mainPage.tsx

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { MaterialTable } from "./table/tableInfo";
import type { GroupedData, MaterialItem, RawMaterialItem } from "../types/types";


const token = localStorage.getItem("token");

export default function MainPage() {
  const [allData, setAllData] = useState<GroupedData>({});

  const transformData = useCallback((data: RawMaterialItem[]): GroupedData => {
    const grouped: GroupedData = {};

    data.forEach((item) => {
      const groupName = item.parent || "Boshqa";

      const transformedItem: MaterialItem = {
        id: item.material_id,
        name: item.name,
        color: item.color || "○",
        unit: item.unit,
        article: item.code,
        accountingPrice: item.last_price,
        startBalance: {
          quantity: item.remind_start_amount,
          amount: item.remind_start_sum,
        },
        income: {
          quantity: item.remind_income_amount,
          amount: item.remind_income_sum,
        },
        expense: {
          quantity: item.remind_outgo_amount,
          amount: item.remind_outgo_sum,
        },
        endBalance: {
          quantity: item.remind_end_amount,
          amount: item.remind_end_sum,
        },
      };

      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }

      grouped[groupName].push(transformedItem);
    });

    return grouped;
  }, []);

  useEffect(() => {
    axios
      .get(`/api/reports/reports/materials?sort=name&start=1.07.2025&end=31.07.2025`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const transformed = transformData(res.data);
        setAllData(transformed);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
      });
  }, [transformData]);

  return <MaterialTable data={allData} />;
}
