import React from "react";
import { useApiGet, useApiLoading } from "react-reqq-lite";
import * as actions from "./actions";

export const useRegionList = () => {
  const isRegionApiLoading = useApiLoading("GET_REGION_LIST", "get");
  const regionList = useApiGet("GET_REGION_LIST", []);
  React.useEffect(() => {
    actions.GET_REGION_LIST();
  }, []);
  return [regionList, isRegionApiLoading];
};

export const useProvinceList = (region_id) => {
  const isProvinceApiLoading = useApiLoading("GET_PROVINCE_LIST", "get");
  const provinceList = useApiGet("GET_PROVINCE_LIST", []);
  React.useEffect(() => {
    if (region_id) {
      actions.GET_PROVINCE_LIST(region_id);
    }
  }, [region_id]);
  return [provinceList, isProvinceApiLoading];
};

export const useMunicipalityList = (region_id, province_id) => {
  const isMunicipalityApiLoading = useApiLoading(
    "GET_MUNICIPALITY_LIST",
    "get"
  );
  const municipalityList = useApiGet("GET_MUNICIPALITY_LIST", []);
  React.useEffect(() => {
    if (region_id && province_id) {
      actions.GET_MUNICIPALITY_LIST(region_id, province_id);
    }
  }, [region_id, province_id]);
  return [municipalityList, isMunicipalityApiLoading];
};

export const useBarangayList = (region_id, province_id, municipality_id) => {
  const isBarangayApiLoading = useApiLoading("GET_BARANGAY_LIST", "get");
  const barangayList = useApiGet("GET_BARANGAY_LIST", []);
  React.useEffect(() => {
    if (region_id && province_id && municipality_id) {
      actions.GET_BARANGAY_LIST(region_id, province_id, municipality_id);
    }
  }, [region_id, province_id, municipality_id]);
  return [barangayList, isBarangayApiLoading];
};
