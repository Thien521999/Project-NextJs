// libs
import { Checkbox } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

type CheckboxFieldProps = {
  form: any;
  name: string;
  disabled?: boolean;
  category?: string[];
  cate?: any;
  onChangeCategory?: (a: string[]) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ form, name, disabled, category, cate, onChangeCategory }) => {
  const handleCheck = (e: any) => {
    const isCheck = e.target.checked; // true
    const value = e.target.value;

    const findIdx = category.findIndex((cateId) => cateId === value);
    const isExisting = findIdx !== -1;

    if (!isExisting && isCheck) {
      // ko ton tai va check vao ô thì push vào
      onChangeCategory([...category, value]);
    } else if (!isCheck) {
      onChangeCategory(category.filter((id) => id !== value));
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        render={() => (
          <input
            type="checkbox"
            name={name}
            checked={category.indexOf(cate.id.toString()) !== -1}
            value={cate.id}
            onChange={handleCheck}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};

export default CheckboxField;
