
/*
import {
  Button,
  type ButtonProps,
} from '@mui/material';

export default function GirasButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      disableElevation
    />
  );
}
*/

import {
  Button,
  type ButtonProps,
} from '@mui/material';

import type { LinkProps } from 'react-router-dom';

type GirasButtonProps = ButtonProps & {
  to?: LinkProps['to'];
};

export default function GirasButton(
  props: GirasButtonProps
) {
  return (
    <Button
      {...props}
      disableElevation
    />
  );
}