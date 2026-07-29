"use client";

import ReactMarkdown from "react-markdown";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function AnswerCard({
  title,
  description,
  image,
  answer,
  source,
  processingTime,
}) {

  const copyAnswer = () => {
    navigator.clipboard.writeText(answer);
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 260,
            objectFit: "cover",
          }}
        />
      )}

      <CardContent>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          {description}
        </Typography>

        <ReactMarkdown>
          {answer}
        </ReactMarkdown>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          spacing={1}
          flexwrap="wrap"
        >
          <Chip
            label={source || "Wikipedia"}
            color="primary"
          />

          <Chip
            icon={<AccessTimeIcon />}
            label={processingTime}
            variant="outlined"
          />
        </Stack>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>

            <Tooltip title="Copy Answer">

              <IconButton onClick={copyAnswer}>
                <ContentCopyIcon />
              </IconButton>

            </Tooltip>

            <Tooltip title="Read More">

              <IconButton>
                <OpenInNewIcon />
              </IconButton>

            </Tooltip>

          </Box>

          <Box>

            <Tooltip title="Helpful">

              <IconButton>
                <ThumbUpAltOutlinedIcon />
              </IconButton>

            </Tooltip>

            <Tooltip title="Not Helpful">

              <IconButton>
                <ThumbDownAltOutlinedIcon />
              </IconButton>

            </Tooltip>

          </Box>

        </Box>

      </CardContent>
    </Card>
  );
}