// types.ts

export interface RawMaterialItem {
    name: string;
    color?: string;
    unit: string;
    code: string;
    last_price: number;
    material_id: number;
    min_amount: number | null;
    category: string;
    parent: string;
    remind_start_amount: number;
    remind_start_sum: number;
    remind_income_amount: number;
    remind_income_sum: number;
    remind_outgo_amount: number;
    remind_outgo_sum: number;
    remind_end_amount: number;
    remind_end_sum: number;
    width: string;
  }
  
  export interface MaterialItem {
    id: number;
    name: string;
    color: string;
    unit: string;
    article: string;
    accountingPrice: number;
    startBalance: {
      quantity: number;
      amount: number;
    };
    income: {
      quantity: number;
      amount: number;
    };
    expense: {
      quantity: number;
      amount: number;
    };
    endBalance: {
      quantity: number;
      amount: number;
    };
  }
  
  export interface GroupedData {
    [groupName: string]: MaterialItem[];
  }
  