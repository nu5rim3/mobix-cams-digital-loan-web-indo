export interface User {
    id: number;
    name: string;
    email: string;
  }

export interface SlickUpdate {
    slkIdx: string,
    appraisalId: string,
    batchNumber: string,
    customerName: string,
    customerKTP: string,
    slkStatus: 'P',
    callVerStatus: 'F',
    status: 'A',
    appraisalType: 'GRPL' | 'IND',
    centerCode: string,
    fusionCenterCode: string,
    groupIdx: string
}
