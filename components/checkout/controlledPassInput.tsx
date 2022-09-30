import { Box, TextField } from "@mui/material";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

type ControledPassInputProps = {
  name: string;
  label: string;
  defaultValue?: string;

};

const ControlledPassInput: FC<ControledPassInputProps> = ({
  name,
  label,
  defaultValue,

  
}: ControledPassInputProps) => {
  const { control } = useFormContext();
  const {field: { onChange, value, ref },formState: { errors },} = useController<Record<string, string>>({
    name: name,
    control,
    defaultValue,
  });

  return (
    <Box mb="20px">
      <TextField
        type="password"
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
export default ControlledPassInput;
