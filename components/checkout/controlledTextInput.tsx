import { Box, TextField } from "@mui/material";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";


 type ControledTextInputProps = {
    name: string;
    label: string;
    defaultValue?: string;
  };
const ControlledTexInput: FC<ControledTextInputProps> = ({name,  label,  defaultValue,}: ControledTextInputProps) => {


    const {control} = useFormContext();
    const {field:{onChange, value, ref}, formState:{errors} } = useController<Record<string, string>>({
        name: name,
        control,
        defaultValue
    })

  return (
    <Box>
          <TextField
            onChange={onChange}
            value={value}
            label={label}
            variant="outlined"
            inputRef={ref}
            error={!!errors[name]}
            helperText={`${errors[name]?.message || ""}`}
          />
    </Box>
  );
};
export default ControlledTexInput;
