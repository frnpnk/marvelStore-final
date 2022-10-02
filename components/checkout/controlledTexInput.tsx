import { Box, FormControl, TextField } from "@mui/material";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

type ControledTextInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
};

const ControlledTexInput: FC<ControledTextInputProps> = ({
  name,
  label,
  defaultValue,
}: ControledTextInputProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController<Record<string, string>, string>({
    name: name,
    control,
    defaultValue,
  });

  return (
    <Box>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
          inputRef={ref}
          error={!!errors[name]}
          helperText={`${errors[name]?.message || ""}`}
        />
      </FormControl>
    </Box>
  );
};
export default ControlledTexInput;
