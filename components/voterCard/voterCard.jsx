import React from "react";

import { Avatar, Text, Button, Paper } from "@mantine/core";

export function VoterCard({ name, age, remark, voted, votedTo, url }) {
  const display = voted ? "Voted" : "Not Voted";
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar src={url} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {age}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {remark}
      </Text>

      <Button variant="default" fullWidth mt="md" disabled={voted}>
        {display}
      </Button>
    </Paper>
  );
}

export default VoterCard;
