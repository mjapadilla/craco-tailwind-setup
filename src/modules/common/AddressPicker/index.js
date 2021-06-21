import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Select from "react-select";
import * as hooks from "./hooks";

const style = {
  containerClassName: "mb-2 relative",
  labelClassName: "block text-xs font-medium text-gray-500 mb-1",
  className:
    "focus:ring-primary-500 focus:ring-2 block w-full text-gray-500 border border-gray-400 sm:text-sm rounded-md px-3 py-2 disabled:bg-gray-200",
};

const INIT_FORM = {
  region: "",
  province: "",
  municipality: "",
  barangay: "",
  zip_code: "",
  full_address: "",
};

const resetForm = {
  region: {
    province: "",
    municipality: "",
    barangay: "",
    full_address: "",
    zip_code: "",
  },
  province: {
    municipality: "",
    barangay: "",
    full_address: "",
    zip_code: "",
  },
  municipality: {
    barangay: "",
    full_address: "",
    zip_code: "",
  },
  barangay: {
    full_address: "",
    zip_code: "",
  },
};

function AddressPicker({
  isOneLine,
  required,
  errors,
  onChange,
  value,
  disabledRegion,
  isBarangayVisible,
  isZipCodeVible,
  isFullAddressVisible,
}) {
  const [form, setForm] = React.useState({
    ...INIT_FORM,
    ...value,
  });

  const [regionList, isRegionApiLoading] = hooks.useRegionList();
  const [provinceList, isProvinceApiLoading] = hooks.useProvinceList(
    form?.region?.value
  );
  const [municipalityList, isMunicipalityApiLoading] =
    hooks.useMunicipalityList(form?.region?.value, form?.province?.value);

  const [barangayList, isBarangayApiLoading] = hooks.useBarangayList(
    form?.region?.value,
    form?.province?.value,
    form?.municipality?.value
  );

  const handleOnChangeSelect = (key) => (item) => {
    setForm((prevState) => ({
      ...prevState,
      ...resetForm[key],
      [key]: item,
    }));

    onChange({
      ...form,
      ...resetForm[key],
      [key]: item,
    });
  };

  const handleOnChange = ({ target: { name, value: v } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: v,
    }));

    onChange({
      ...form,
      [name]: v,
    });
  };

  return (
    <div
      className={cn("grid", {
        "grid-cols-1": isOneLine,
        "grid-cols-2 gap-3": !isOneLine,
      })}
    >
      {/* Region */}
      <div className={cn("col-span-1")}>
        <div className={style.containerClassName}>
          <label className={style.labelClassName} htmlFor="region">
            Region {required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <Select
              placeholder="Select Region"
              classNamePrefix="react-select"
              className="react-select-container"
              options={regionList}
              id="region"
              isLoading={isRegionApiLoading}
              isDisabled={!disabledRegion ? isRegionApiLoading : disabledRegion}
              value={form?.region ?? ""}
              onChange={handleOnChangeSelect("region")}
              openMenuOnFocus
            />
            {errors?.region && (
              <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
                {errors?.region.message ?? ""}
              </small>
            )}
          </div>
        </div>
      </div>
      {/* Province */}
      <div className={cn("col-span-1")}>
        <div className={style.containerClassName}>
          <label className={style.labelClassName} htmlFor="province">
            Province {required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <Select
              placeholder="Select Province"
              classNamePrefix="react-select"
              id="province"
              className="react-select-container"
              options={provinceList}
              isLoading={isProvinceApiLoading || isRegionApiLoading}
              isDisabled={!regionList.length || !form?.region}
              value={form?.province ?? ""}
              onChange={handleOnChangeSelect("province")}
              openMenuOnFocus
            />
            {errors?.province && (
              <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
                {errors?.province.message ?? ""}
              </small>
            )}
          </div>
        </div>
      </div>
      {/* Municipality */}
      <div className={cn("col-span-1")}>
        <div className={style.containerClassName}>
          <label className={style.labelClassName} htmlFor="municipality">
            Municipality {required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <Select
              placeholder="Select Municipality"
              classNamePrefix="react-select"
              className="react-select-container"
              id="municipality"
              options={municipalityList}
              isLoading={
                isMunicipalityApiLoading ||
                isProvinceApiLoading ||
                isRegionApiLoading
              }
              isDisabled={!provinceList.length || !form?.province}
              value={form?.municipality ?? ""}
              onChange={handleOnChangeSelect("municipality")}
              openMenuOnFocus
            />
            {errors?.municipality && (
              <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
                {errors?.municipality.message ?? ""}
              </small>
            )}
          </div>
        </div>
      </div>
      {/* Barangay */}
      {isBarangayVisible && (
        <div className={cn("col-span-1")}>
          <div className={style.containerClassName}>
            <label className={style.labelClassName} htmlFor="barangay">
              Barangay {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <Select
                placeholder="Select Barangay"
                classNamePrefix="react-select"
                className="react-select-container"
                id="barangay"
                options={barangayList}
                isLoading={
                  isBarangayApiLoading ||
                  isMunicipalityApiLoading ||
                  isProvinceApiLoading ||
                  isRegionApiLoading
                }
                isDisabled={!municipalityList.length || !form?.municipality}
                value={form?.barangay ?? ""}
                onChange={handleOnChangeSelect("barangay")}
                openMenuOnFocus
              />
              {errors?.barangay && (
                <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
                  {errors?.barangay.message ?? ""}
                </small>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Zip code */}
      {isZipCodeVible && (
        <div className={cn("col-span-1")}>
          <div className={style.containerClassName} role="presentation">
            <label className={style.labelClassName} htmlFor="zip_code">
              Zip Code {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                placeholder=""
                name="zip_code"
                id="zip_code"
                autoComplete="none"
                type="text"
                maxLength="4"
                disabled={!barangayList.length || !form?.barangay}
                value={form?.zip_code ?? ""}
                className={style.className}
                onChange={handleOnChange}
              />
              {errors?.zip_code && (
                <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
                  {errors?.zip_code.message ?? ""}
                </small>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Full address */}
      {isFullAddressVisible && (
        <div className={cn("col-span-1")}>
          <div className={style.containerClassName} role="presentation">
            <label className={style.labelClassName} htmlFor="full_address">
              House No./Unit Number/Street{" "}
              {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              {isOneLine ? (
                <textarea
                  placeholder=""
                  name="full_address"
                  id="full_address"
                  autoComplete="none"
                  type="text"
                  rows="3"
                  disabled={!barangayList.length || !form?.barangay}
                  value={form?.full_address ?? ""}
                  className={style.className}
                  onChange={handleOnChange}
                />
              ) : (
                <input
                  placeholder=""
                  name="full_address"
                  id="full_address"
                  autoComplete="none"
                  type="text"
                  disabled={!barangayList.length || !form?.barangay}
                  value={form?.full_address ?? ""}
                  className={style.className}
                  onChange={handleOnChange}
                />
              )}
              {errors?.full_address && (
                <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
                  {errors?.full_address.message ?? ""}
                </small>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
AddressPicker.defaultProps = {
  isOneLine: false,
  required: false,
  errors: false,
  disabledRegion: false,
  isBarangayVisible: true,
  isZipCodeVible: true,
  isFullAddressVisible: true,
  value: {},
};

AddressPicker.propTypes = {
  onChange: PropTypes.instanceOf(Function).isRequired,
  isOneLine: PropTypes.bool,
  required: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.bool]),
  disabledRegion: PropTypes.bool,
  value: PropTypes.instanceOf(Object),
  isBarangayVisible: PropTypes.bool,
  isZipCodeVible: PropTypes.bool,
  isFullAddressVisible: PropTypes.bool,
};

export default React.memo(AddressPicker);
