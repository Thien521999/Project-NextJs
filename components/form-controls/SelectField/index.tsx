// libs
import React, { useState } from "react";
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";

type PropsType = {
  form: any;
  name: any;
};

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectField: React.FC<PropsType> = ({ form, name }) => {
  const classes = useStyles();

  // const [state, setState] = useState({
  //   gender: "",
  //   name: "Nam",
  // });

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor="gender-native-simple">Gender</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Select
            {...field}
            native
            // value={state.gender}
            // onChange={handleChange}
            inputProps={{
              name: "gender",
              id: "gender-native-simple",
            }}
          >
            <option value="Name">Nam</option>
            <option value="Nữ">Nữ</option>
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectField;
