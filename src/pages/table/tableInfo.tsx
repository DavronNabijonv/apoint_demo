// tableInfo.tsx
import React, { useState } from "react";
import type { GroupedData } from "../../types/types";

export const MaterialTable = ({ data }: { data: GroupedData }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const calculateTotals = () => {
    let totals = {
      startBalanceQty: 0,
      startBalanceAmt: 0,
      incomeQty: 0,
      incomeAmt: 0,
      expenseQty: 0,
      expenseAmt: 0,
      endBalanceQty: 0,
      endBalanceAmt: 0,
    };

    Object.values(data).forEach((group) => {
      group.forEach((item) => {
        totals.startBalanceQty += item.startBalance.quantity;
        totals.startBalanceAmt += item.startBalance.amount;
        totals.incomeQty += item.income.quantity;
        totals.incomeAmt += item.income.amount;
        totals.expenseQty += item.expense.quantity;
        totals.expenseAmt += item.expense.amount;
        totals.endBalanceQty += item.endBalance.quantity;
        totals.endBalanceAmt += item.endBalance.amount;
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">№</th>
            <th className="border p-2">Nomi</th>
            <th className="border p-2">Rangi</th>
            <th className="border p-2">Birlik</th>
            <th className="border p-2">Artikul</th>
            <th className="border p-2">Hisob narxi</th>
            <th className="border p-2" colSpan={2}>Boshlang'ich qoldiq</th>
            <th className="border p-2" colSpan={2}>Kirim</th>
            <th className="border p-2" colSpan={2}>Chiqim</th>
            <th className="border p-2" colSpan={2}>Yakuniy qoldiq</th>
          </tr>
          <tr className="bg-gray-50">
            <th colSpan={6}></th>
            <th className="border p-2">Soni</th>
            <th className="border p-2">Summa</th>
            <th className="border p-2">Soni</th>
            <th className="border p-2">Summa</th>
            <th className="border p-2">Soni</th>
            <th className="border p-2">Summa</th>
            <th className="border p-2">Soni</th>
            <th className="border p-2">Summa</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={6} className="border p-2">Jami</td>
            <td className="border p-2">{formatNumber(totals.startBalanceQty)}</td>
            <td className="border p-2">{formatNumber(totals.startBalanceAmt)}</td>
            <td className="border p-2">{formatNumber(totals.incomeQty)}</td>
            <td className="border p-2">{formatNumber(totals.incomeAmt)}</td>
            <td className="border p-2">{formatNumber(totals.expenseQty)}</td>
            <td className="border p-2">{formatNumber(totals.expenseAmt)}</td>
            <td className="border p-2">{formatNumber(totals.endBalanceQty)}</td>
            <td className="border p-2">{formatNumber(totals.endBalanceAmt)}</td>
          </tr>

          {Object.entries(data).map(([groupName, items]) => (
            <React.Fragment key={groupName}>
              <tr
                className="bg-blue-50 cursor-pointer hover:bg-blue-100"
                onClick={() => toggleGroup(groupName)}
              >
                <td colSpan={14} className="border p-2 font-bold">
                  <div className="flex justify-between">
                    <span>{groupName}</span>
                    <span>{expandedGroups[groupName] ? "−" : "+"}</span>
                  </div>
                </td>
              </tr>

              {expandedGroups[groupName] &&
                items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.color}</td>
                    <td className="border p-2">{item.unit}</td>
                    <td className="border p-2">{item.article}</td>
                    <td className="border p-2">{formatNumber(item.accountingPrice)}</td>
                    <td className="border p-2">{formatNumber(item.startBalance.quantity)}</td>
                    <td className="border p-2">{formatNumber(item.startBalance.amount)}</td>
                    <td className="border p-2">{formatNumber(item.income.quantity)}</td>
                    <td className="border p-2">{formatNumber(item.income.amount)}</td>
                    <td className="border p-2">{formatNumber(item.expense.quantity)}</td>
                    <td className="border p-2">{formatNumber(item.expense.amount)}</td>
                    <td className="border p-2">{formatNumber(item.endBalance.quantity)}</td>
                    <td className="border p-2">{formatNumber(item.endBalance.amount)}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
