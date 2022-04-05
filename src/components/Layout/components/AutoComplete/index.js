import React, { Component } from "react";
import Select from "react-select";

import "./style.scss";

export default function BrandAutocomplete({ data }) {
  const options = data.map((dat) => {
    return { value: dat.key, label: `${dat.key}(${dat.value.count})` };
  });
  return <Select className='brand-autocomplete' options={options} />;
}
