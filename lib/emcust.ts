// lib/emcust.ts
import { getLogDbPool } from "./db";

export interface EMCustData {
  CustName?: string;
  CustID?: number;
  ContTel?: string;
  ContTel1?: string;
  ContTel2?: string;
  ContEMail?: string;
  CustCode?: string;
  CustAddr1?: string;
  CustAddr2?: string;
  District?: string;
  Amphur?: string;
  Province?: string;
  PostCode?: string;
}

/**
 * ดึงข้อมูลลูกค้าจาก EMCust table ผ่านเบอร์โทรศัพท์
 */
export async function getCustomerByPhone(phoneNumber: string): Promise<EMCustData | null> {
  try {
    const pool = await getLogDbPool();
    
    // ทำความสะอาดเบอร์โทรศัพท์ (เอาเครื่องหมายออก)
    const cleanPhone = phoneNumber.replace(/[-\s()]/g, '');
    
    const result = await pool.request()
      .input('phoneNumber', `%${cleanPhone}%`)
      .query(`
        SELECT 
          CustName,
          CustID,
          CustCode,
          ContTel,
          ContTel1,
          ContTel2,
          ContEMail,
          CustAddr1,
          CustAddr2,
          District,
          Amphur,
          Province,
          PostCode
        FROM EMCust 
        WHERE REPLACE(REPLACE(REPLACE(ContTel, '-', ''), ' ', ''), '()', '') LIKE @phoneNumber
           OR REPLACE(REPLACE(REPLACE(ContTel1, '-', ''), ' ', ''), '()', '') LIKE @phoneNumber
           OR REPLACE(REPLACE(REPLACE(ContTel2, '-', ''), ' ', ''), '()', '') LIKE @phoneNumber
      `);
    
    if (result.recordset.length > 0) {
      return result.recordset[0] as EMCustData;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching customer from EMCust:', error);
    throw error;
  }
}

/**
 * ดึงข้อมูลลูกค้าจาก EMCust table ผ่าน CustId
 */
export async function getCustomerById(custId: number): Promise<EMCustData | null> {
  try {
    const pool = await getLogDbPool();
    const result = await pool.request()
      .input('custId', custId)
      .query(`
        SELECT 
          CustName,
          CustID,
          CustCode,
          ContTel,
          ContTel1,
          ContTel2,
          ContEMail,
          CustAddr1,
          CustAddr2,
          District,
          Amphur,
          Province,
          PostCode
        FROM EMCust 
        WHERE CustID = @custId
      `);
    
    if (result.recordset.length > 0) {
      return result.recordset[0] as EMCustData;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching customer from EMCust:', error);
    throw error;
  }
}

/**
 * ค้นหาลูกค้าจาก EMCust table ด้วยหลายเงื่อนไข
 */
export async function searchCustomers(searchTerm: string): Promise<EMCustData[]> {
  try {
    const pool = await getLogDbPool();
    const result = await pool.request()
      .input('searchTerm', `%${searchTerm}%`)
      .query(`
        SELECT TOP 20
          CustName,
          CustID,
          CustCode,
          ContTel,
          ContTel1,
          ContTel2,
          ContEMail,
          CustAddr1,
          CustAddr2,
          District,
          Amphur,
          Province,
          PostCode
        FROM EMCust 
        WHERE CustName LIKE @searchTerm
           OR CustCode LIKE @searchTerm
           OR ContTel LIKE @searchTerm
           OR ContTel1 LIKE @searchTerm
           OR ContTel2 LIKE @searchTerm
        ORDER BY CustName
      `);
    
    return result.recordset as EMCustData[];
  } catch (error) {
    console.error('Error searching customers from EMCust:', error);
    throw error;
  }
}