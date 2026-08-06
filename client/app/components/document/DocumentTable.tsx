"use client";

import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    IconButton,
    Typography
} from "@mui/material";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function DocumentTable({

    documents,

    onDelete

}: any) {

    return (

        <Paper sx={{ borderRadius: 4 }}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>Name</TableCell>

                        <TableCell>Type</TableCell>

                        <TableCell>Size</TableCell>

                        <TableCell>Status</TableCell>

                        <TableCell>Uploaded</TableCell>

                        <TableCell align="right">

                            Actions

                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        documents.map((doc: any) => (

                            <TableRow key={doc.id} hover>

                                <TableCell>

                                    <Typography sx={{ fontWeight: 600, }}>

                                        {doc.original_name}

                                    </Typography>

                                </TableCell>

                                <TableCell>

                                    {doc.mime_type}

                                </TableCell>

                                <TableCell>

                                    {(doc.file_size / 1024 / 1024).toFixed(2)} MB

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={doc.status}

                                        color={

                                            doc.status === "READY"

                                                ? "success"

                                                : "warning"

                                        }

                                        size="small"

                                    />

                                </TableCell>

                                <TableCell>

                                    {

                                        new Date(

                                            doc.created_at

                                        ).toLocaleDateString()

                                    }

                                </TableCell>

                                <TableCell align="right">

                                    <IconButton

                                        color="error"

                                        onClick={() =>

                                            onDelete(doc.id)

                                        }

                                    >

                                        <DeleteOutlineRoundedIcon />

                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))

                    }

                </TableBody>

            </Table>

        </Paper>

    );

}