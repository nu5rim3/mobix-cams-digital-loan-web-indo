import { axiosInstance } from "../../config";
import { SlickUpdate } from "./types";

const api = axiosInstance;

const getSlikRequestById = (id: string) => {
  return api.get(`/mobixCamsCredit/v1/sliks/slkIdx/${id}`);
};

const getSliksByBranchAndType = ({
  userId,
  branchCode,
  status,
  type,
}: {
  userId: string;
  branchCode: string;
  status: "P";
  type: "GRPL" | "IL" | "";
}) => {
  return api.get(
    `/mobixCamsCredit/v1/sliks/${userId}/${branchCode}/${status}/${type}`
  );
};

const getSliksByGroupsAndCenter = ({
  userId,
  branchCode,
  group,
  center,
  status,
}: {
  userId: string;
  branchCode: string;
  group: string;
  center: string;
  status: "P" | "C" | "INPG";
}) => {
  return api.get(
    `/mobixCamsCredit/v1/sliks/${userId}/${branchCode}/${status}/${center}/${group}`
  );
};

const getSliksWithPagination = ({
  userId,
  branchCode,
  status,
  type,
  appriasalId,
  page,
  size,
  center,
  group,
  batchNo,
  identificationNo,
  customerName,
}: {
  userId: string;
  branchCode: string;
  status: "P" | "C" | "INPG";
  type: "GRPL" | "IL" | "";
  appriasalId?: string | number;
  page?: number | string;
  size?: number | string;
  center?: string;
  group?: string;
  batchNo?: string;
  identificationNo?: string;
  customerName?: string;
}) => {
  const _page = page ? Number(page) - 1 : "";
  return api.get(
    `/mobixCamsCredit/v1/sliks/filters?user=${userId}&branch=${branchCode}&status=${status}&type=${type}&appraisal=${
      appriasalId ?? ""
    }&center=${center ?? ""}&group=${
      group ?? ""
    }&page=${_page}&size=${size}&batchNo=${batchNo}&identificationNo=${identificationNo}&customerName=${customerName}`
  );
};

const getSlikGroupWithPagination = ({
  userId,
  branchCode,
  status,
  appriasalId,
  page,
  size,
  center,
  group,
  role,
}: {
  userId: string;
  branchCode: string;
  status: "P" | "C" | "INPG";
  appriasalId?: string | number;
  page?: number | string;
  size?: number | string;
  center?: number | string;
  group?: number | string;
  role: string;
}) => {
  const _page = page ? Number(page) - 1 : "";
  return api.get(
    `/mobixCamsCredit/v1/sliks/groups/filters?role=${role}&user=${userId}&branch=${branchCode}&status=${status}&type=GRPL&appraisal=${
      appriasalId ?? ""
    }&center=${center ?? ""}&group=${group ?? ""}&page=${_page}&size=${size}`
  );
};

const getGroupInnerSliksWithPagination = ({
  userId,
  branchCode,
  status,
  type,
  appriasalId,
  page,
  size,
  center,
  group,
}: {
  userId: string;
  branchCode: string;
  status: "P" | "C" | "INPG";
  type: "GRPL";
  appriasalId?: string | number;
  page?: number | string;
  size?: number | string;
  center?: string;
  group?: string;
}) => {
  const _page = page ? Number(page) - 1 : "";
  return api.get(
    `/mobixCamsCredit/v1/sliks/filters?user=${userId}&branch=${branchCode}&status=${status}&type=${type}&appraisal=${
      appriasalId ?? ""
    }&center=${center ?? ""}&group=${group ?? ""}&page=${_page}&size=${size}`
  );
};

const getSliksByStatus = ({
  userId,
  branchCode,
}: {
  userId: string;
  branchCode: string;
}) => {
  // this API provides status inprogress and completed sliks (this is status not slik status)
  return api.get(`/mobixCamsCredit/v1/sliks/${userId}/${branchCode}`);
};

const updateSlik = ({
  slikId,
  data,
}: {
  slikId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; //SlickUpdate
}) => {
  // this API provides status inprogress and completed sliks (this is status not slik status)
  return api.put(`/mobixCamsCredit/v1/sliks/${slikId}`, data);
};

const updateSlikBulck = (data: SlickUpdate[]) => {
  // this API provides status inprogress and completed sliks (this is status not slik status)
  return api.post(`/mobixCamsCredit/v1/sliks/bulk`, data);
};

/**
 * get Excel Slik Data
 * @param param0
 * @returns
 */
const getExcelSlikData = ({
  userId,
  branchCode,
  status,
  type,
  appraisal,
  center,
  group,
  role,
}: {
  userId: string;
  branchCode: string;
  status: "P" | "C" | "INPG";
  type: "GRPL" | "IL" | "";
  appraisal?: string | "";
  center?: string | "";
  group?: string | "";
  role: string;
}) => {
  return api.get(`/mobixCamsCredit/v1/sliks/excels/filters?user=${userId}&branch=${branchCode}&status=${status}&type=${type}&appraisal=${appraisal}&center=${center}&group=${group}&role=${role}
`);
};

export default {
  getSlikRequestById,
  getSliksByBranchAndType,
  getSliksWithPagination,
  getSlikGroupWithPagination,
  getSliksByGroupsAndCenter,
  getSliksByStatus,
  updateSlik,
  updateSlikBulck,
  getGroupInnerSliksWithPagination,
  getExcelSlikData,
};
