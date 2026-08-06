"use client";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import {

    TableRow,

    TableCell,

    IconButton,

    Stack,

    Typography

} from "@mui/material";

import StatusChip from "./StatusChip";

export default function DocumentRow({

    document,

    onDelete

}: any) {

    return (

        <TableRow hover>

            <TableCell>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ aliignItems: 'center' }}
                >

                    <DescriptionRoundedIcon

                        color="primary"

                    />

                    <Typography>

                        {document.original_name}

                    </Typography>

                </Stack>

            </TableCell>

            <TableCell>

                <StatusChip

                    status={document.status}

                />

            </TableCell>

            <TableCell>

                {document.file_size || "-"}

            </TableCell>

            <TableCell>

                {

                    new Date(

                        document.created_at

                    ).toLocaleDateString()

                }

            </TableCell>

            <TableCell align="right">

                <IconButton

                    color="error"

                    onClick={() =>

                        onDelete(document)

                    }

                >

                    <DeleteRoundedIcon />

                </IconButton>

            </TableCell>

        </TableRow>

    );

}