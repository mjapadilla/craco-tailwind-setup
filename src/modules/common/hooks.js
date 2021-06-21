import React from "react";
import { useApiGet, useApiLoading } from "react-reqq-lite";
import * as actions from "./actions";

export const useGetBranchList = () => {
  const isLoading = useApiLoading("GET_DATA_SETS", "get");
  const list = useApiGet("GET_BRANCH_LIST", []);
  React.useEffect(() => {
    actions.getDataSet();
  }, []);
  return [isLoading, list];
};
