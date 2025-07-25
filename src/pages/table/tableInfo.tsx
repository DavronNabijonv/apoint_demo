import { useState } from 'react';

interface Material {
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
}

interface GroupedData {
  [parent: string]: {
    [category: string]: Material[];
  };
}

interface Totals {
  count: number;
  sum: number;
}

export const MaterialTable = ({ data }: { data: GroupedData }) => {
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Parent va category bo'yicha toggle funksiyalari
  const toggleParent = (parent: string) => {
    setExpandedParents(prev => ({
      ...prev,
      [parent]: !prev[parent]
    }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Umumiy hisoblar
  const calculateTotals = (materials: Material[]): Totals => {
    return {
      count: materials.length,
      sum: materials.reduce((acc, curr) => acc + (curr.last_price || 0), 0)
    };
  };

  // Barcha materiallar uchun umumiy hisob
  const allMaterials = Object.values(data).flatMap(parent =>
    Object.values(parent).flatMap(category => category)
  );
  const grandTotals = calculateTotals(allMaterials);

  return (
    <div className="overflow-x-auto p-4">
      {/* Umumiy jadval hisoblari , everything will be okey */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-2">Umumiy hisob</h2>
        <div className="flex justify-between">
          <span>Jami mahsulotlar: {grandTotals.count}</span>
          <span>Jami summa: {grandTotals.sum.toLocaleString()} so'm</span>
        </div>
      </div>

      {/* Asosiy jadval */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nomi</th>
            <th className="py-2 px-4 border-b">Kodi</th>
            <th className="py-2 px-4 border-b">Narxi</th>
            <th className="py-2 px-4 border-b">Miqdori</th>
            <th className="py-2 px-4 border-b">Summa</th>
            <th className="py-2 px-4 border-b">Birlik</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([parent, categories]) => {
            const parentMaterials = Object.values(categories).flat();
            const parentTotals = calculateTotals(parentMaterials);

            return (
              <>
                {/* Parent qatori */}
                <tr 
                  key={parent} 
                  className="bg-blue-50 cursor-pointer hover:bg-blue-100"
                  onClick={() => toggleParent(parent)}
                >
                  <td className="py-2 px-4 border-b font-bold" colSpan={6}>
                    <div className="flex justify-between items-center">
                      <span>{parent}</span>
                      <span className="text-sm font-normal">
                        {parentTotals.count} ta mahsulot | Jami: {parentTotals.sum.toLocaleString()} so'm
                      </span>
                      <span>{expandedParents[parent] ? '−' : '+'}</span>
                    </div>
                  </td>
                </tr>

                {/* Parent kengaytirilganda */}
                {expandedParents[parent] && Object.entries(categories).map(([category, materials]) => {
                  const categoryTotals = calculateTotals(materials);

                  return (
                    <>
                      {/* Category qatori */}
                      <tr
                        key={`${parent}-${category}`}
                        className="bg-gray-50 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleCategory(`${parent}-${category}`)}
                      >
                        <td className="py-2 px-6 border-b font-semibold" colSpan={6}>
                          <div className="flex justify-between items-center">
                            <span>{category}</span>
                            <span className="text-sm font-normal">
                              {categoryTotals.count} ta mahsulot | Jami: {categoryTotals.sum.toLocaleString()} so'm
                            </span>
                            <span>{expandedCategories[`${parent}-${category}`] ? '−' : '+'}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Category kengaytirilganda */}
                      {expandedCategories[`${parent}-${category}`] && materials.map((material, index) => (
                        <tr key={material.material_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-2 px-8 border-b">{material.name}</td>
                          <td className="py-2 px-4 border-b">{material.code || '-'}</td>
                          <td className="py-2 px-4 border-b">{material.last_price.toLocaleString()} so'm</td>
                          <td className="py-2 px-4 border-b">{material.remind_end_amount}</td>
                          <td className="py-2 px-4 border-b">
                            {(material.last_price * material.remind_end_amount).toLocaleString()} so'm
                          </td>
                          <td className="py-2 px-4 border-b">{material.unit}</td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};