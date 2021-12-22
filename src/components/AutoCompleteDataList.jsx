import React, { useMemo, useCallback } from "react";
import DataListInput from "react-datalist-input";

const AutoCompleteDataList = ({ myValues, setTerm, onSelect, setItem }) => {

  const onInput = useCallback((value) => {
    value === "" && setItem({})
    setTerm(value)
  }, [setTerm, setItem]);

  // the array you want to pass to the react-data-list component
  // key and label are required properties
  const items = useMemo(
    () =>
      myValues.map((oneItem) => ({
        // required: what to show to the user
        label: oneItem.title,
        // required: key to identify the item within the array
        key: oneItem.pageid,
        // feel free to add your own app logic to access those properties in the onSelect function
        someAdditionalValue: oneItem.wordcount,
        // or just keep everything
        ...oneItem,
      })),
    [myValues]
  );

  return (
    <DataListInput
      placeholder="Select an option from the drop down menu..."
      items={items}
      onSelect={onSelect}
      onInput={onInput}
    />
  );
};

export default AutoCompleteDataList;