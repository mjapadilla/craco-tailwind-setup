import { req } from "react-reqq-lite";
import { formatedSelectOption } from "../helper";

export const GET_REGION_LIST = () => {
  req.get({
    key: "GET_REGION_LIST",
    url: `/api/region`,
    transform: ({ data }) => formatedSelectOption(data, "code", "name"),
  });
};

export const GET_PROVINCE_LIST = (region_id) =>
  req.get({
    key: "GET_PROVINCE_LIST",
    url: `/api/region/${region_id}/province`,
    transform: ({ data }) => formatedSelectOption(data, "code", "name"),
  });

export const GET_MUNICIPALITY_LIST = (region_id, province_id) =>
  req.get({
    key: "GET_MUNICIPALITY_LIST",
    url: `/api/region/${region_id}/province/${province_id}/municipality`,
    transform: ({ data }) => formatedSelectOption(data, "code", "name"),
  });

export const GET_BARANGAY_LIST = (region_id, province_id, municipality_id) =>
  req.get({
    key: "GET_BARANGAY_LIST",
    url: `/api/region/${region_id}/province/${province_id}/municipality/${municipality_id}/barangay`,
    transform: ({ data }) => formatedSelectOption(data, "code", "name"),
  });
