import { ComponentProps, ComponentType } from "react";
import { Button } from "./button";

type Props = ComponentProps<typeof Button>;

export default function ButtonSubmit(props: Props) {
    return <Button {...props}></Button>
}
